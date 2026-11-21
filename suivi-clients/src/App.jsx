// Composant principal : charge les clients, gère les filtres et les fenêtres,
// et assemble le tableau de bord, la barre d'outils et la liste.
import { useEffect, useMemo, useState } from 'react'
import { Plus, PackageSearch } from 'lucide-react'

import Dashboard from './components/Dashboard'
import Toolbar from './components/Toolbar'
import ClientList from './components/ClientList'
import ClientForm from './components/ClientForm'
import ConfirmDialog from './components/ConfirmDialog'
import * as store from './data/clientStore'

// Met en minuscules et retire les accents : "Lefèvre" -> "lefevre"
const normalizeText = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export default function App() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtres de la liste
  const [search, setSearch] = useState('')
  const [stepFilter, setStepFilter] = useState('all') // 'all' ou numéro d'étape
  const [sort, setSort] = useState('date-desc')

  // Fenêtres ouvertes
  const [formClient, setFormClient] = useState(null) // null = fermé, {} = nouveau, client = modification
  const [clientToDelete, setClientToDelete] = useState(null)

  // Chargement initial des clients
  useEffect(() => {
    store.getClients().then((data) => {
      setClients(data)
      setLoading(false)
    })
  }, [])

  // --- Actions ---

  async function handleSave(values) {
    if (formClient?.id) {
      const updated = await store.updateClient(formClient.id, values)
      setClients((list) => list.map((c) => (c.id === updated.id ? updated : c)))
    } else {
      const created = await store.createClient(values)
      setClients((list) => [...list, created])
    }
    setFormClient(null)
  }

  async function handleConfirmDelete() {
    await store.deleteClient(clientToDelete.id)
    setClients((list) => list.filter((c) => c.id !== clientToDelete.id))
    setClientToDelete(null)
  }

  async function handleMove(id, direction) {
    const updated = await store.moveClientStep(id, direction)
    if (updated) setClients((list) => list.map((c) => (c.id === id ? updated : c)))
  }

  function resetFilters() {
    setSearch('')
    setStepFilter('all')
  }

  // --- Liste filtrée et triée (recalculée seulement si nécessaire) ---
  const visibleClients = useMemo(() => {
    const query = normalizeText(search.trim())
    const queryDigits = search.replace(/\D/g, '')

    const filtered = clients.filter((c) => {
      if (stepFilter !== 'all' && c.step !== stepFilter) return false
      if (!query) return true
      const matchesName = normalizeText(c.name).includes(query)
      const matchesPhone = queryDigits.length > 0 && c.phone.includes(queryDigits)
      return matchesName || matchesPhone
    })

    const sorters = {
      'date-desc': (a, b) => b.purchaseDate.localeCompare(a.purchaseDate),
      'date-asc': (a, b) => a.purchaseDate.localeCompare(b.purchaseDate),
      'amount-desc': (a, b) => b.amount - a.amount,
      'amount-asc': (a, b) => a.amount - b.amount,
    }
    return [...filtered].sort(sorters[sort])
  }, [clients, search, stepFilter, sort])

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-sm">
              <PackageSearch size={22} />
            </span>
            <div>
              <h1 className="text-lg leading-tight font-bold text-slate-800">Suivi clients</h1>
              <p className="hidden text-xs text-slate-500 sm:block">De l'achat à la livraison</p>
            </div>
          </div>
          <button
            onClick={() => setFormClient({})}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nouveau client</span>
            <span className="sm:hidden">Ajouter</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {loading ? (
          <p className="py-20 text-center text-slate-400">Chargement…</p>
        ) : (
          <>
            <Dashboard clients={clients} activeStep={stepFilter} onSelectStep={setStepFilter} />

            <Toolbar
              search={search}
              onSearchChange={setSearch}
              stepFilter={stepFilter}
              onStepFilterChange={setStepFilter}
              sort={sort}
              onSortChange={setSort}
            />

            {clients.length > 0 && (
              <p className="text-sm text-slate-500">
                {visibleClients.length} client{visibleClients.length > 1 ? 's' : ''} affiché
                {visibleClients.length > 1 ? 's' : ''}
                {visibleClients.length !== clients.length && ` sur ${clients.length}`}
              </p>
            )}

            <ClientList
              clients={visibleClients}
              totalCount={clients.length}
              onAdd={() => setFormClient({})}
              onResetFilters={resetFilters}
              onEdit={setFormClient}
              onDelete={setClientToDelete}
              onMove={handleMove}
            />
          </>
        )}
      </main>

      {/* Fenêtres */}
      {formClient && (
        <ClientForm
          client={formClient.id ? formClient : null}
          onSave={handleSave}
          onCancel={() => setFormClient(null)}
        />
      )}
      {clientToDelete && (
        <ConfirmDialog
          title="Supprimer ce client ?"
          message={`La fiche de « ${clientToDelete.name} » et tout son historique seront définitivement supprimés.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setClientToDelete(null)}
        />
      )}
    </div>
  )
}
