// Liste des fiches clients + états vides.
import { Users, SearchX, Plus } from 'lucide-react'
import ClientCard from './ClientCard'

export default function ClientList({ clients, totalCount, onAdd, onResetFilters, ...cardActions }) {
  // Aucun client du tout
  if (totalCount === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Aucun client pour l'instant"
        text="Ajoutez votre premier client pour commencer le suivi de ses commandes !"
        action={
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600"
          >
            <Plus size={18} />
            Ajouter un client
          </button>
        }
      />
    )
  }

  // Des clients existent mais aucun ne correspond aux filtres
  if (clients.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Aucun résultat"
        text="Aucun client ne correspond à votre recherche ou à vos filtres."
        action={
          <button onClick={onResetFilters} className="text-sm font-medium text-indigo-600 hover:underline">
            Réinitialiser les filtres
          </button>
        }
      />
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} {...cardActions} />
      ))}
    </div>
  )
}

function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
        <Icon size={30} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-700">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
      <div className="mt-5">{action}</div>
    </div>
  )
}
