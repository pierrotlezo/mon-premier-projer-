// Barre d'outils : recherche, filtre par étape, tri.
import { Search, X } from 'lucide-react'
import { STEPS } from '../constants/steps'

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Date d’achat (récent → ancien)' },
  { value: 'date-asc', label: 'Date d’achat (ancien → récent)' },
  { value: 'amount-desc', label: 'Montant (élevé → faible)' },
  { value: 'amount-asc', label: 'Montant (faible → élevé)' },
]

export default function Toolbar({ search, onSearchChange, stepFilter, onStepFilterChange, sort, onSortChange }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Recherche */}
        <label className="relative flex-1">
          <span className="sr-only">Rechercher</span>
          <Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par nom ou téléphone…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-10 text-sm shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-600"
              aria-label="Effacer la recherche"
            >
              <X size={16} />
            </button>
          )}
        </label>

        {/* Tri */}
        <label className="sm:w-72">
          <span className="sr-only">Trier par</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Trier : {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Filtre par étape (pastilles) */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={stepFilter === 'all'} onClick={() => onStepFilterChange('all')}>
          Toutes les étapes
        </FilterChip>
        {STEPS.map((step) => (
          <FilterChip
            key={step.id}
            active={stepFilter === step.id}
            activeClass={step.colors.solid}
            onClick={() => onStepFilterChange(step.id)}
          >
            <step.icon size={14} />
            {step.label}
          </FilterChip>
        ))}
      </div>
    </div>
  )
}

function FilterChip({ active, activeClass = 'bg-slate-700 text-white', onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
        active ? `${activeClass} shadow-sm` : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}
