// Fiche d'un client dans la liste : infos, stepper, boutons d'action.
import { Phone, Calendar, Pencil, Trash2, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react'
import Stepper from './Stepper'
import { STEPS, FIRST_STEP, LAST_STEP } from '../constants/steps'
import { formatAmount, formatDate, formatPhone, phoneHref } from '../utils/format'

export default function ClientCard({ client, onEdit, onDelete, onMove }) {
  const step = STEPS[client.step]
  const canGoBack = client.step > FIRST_STEP
  const canGoForward = client.step < LAST_STEP
  const nextStep = STEPS[client.step + 1]

  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* En-tête : nom, badge d'étape, montant */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-800">{client.name}</h3>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${step.colors.soft}`}>
              <step.icon size={12} />
              {step.label}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <a
              href={phoneHref(client.phone)}
              className="inline-flex items-center gap-1.5 hover:text-indigo-600"
              title="Appeler"
            >
              <Phone size={14} />
              {formatPhone(client.phone)}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              Achat le {formatDate(client.purchaseDate)}
            </span>
          </div>
        </div>
        <div className="text-right text-lg font-bold text-slate-800">{formatAmount(client.amount)}</div>
      </div>

      {/* Notes */}
      {client.notes && (
        <p className="mt-3 flex gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <StickyNote size={15} className="mt-0.5 shrink-0 text-slate-400" />
          <span className="whitespace-pre-line">{client.notes}</span>
        </p>
      )}

      {/* Stepper */}
      <div className="mt-5">
        <Stepper currentStep={client.step} stepDates={client.stepDates} />
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(client)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Pencil size={15} />
            <span className="hidden sm:inline">Modifier</span>
          </button>
          <button
            onClick={() => onDelete(client)}
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={15} />
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onMove(client.id, -1)}
            disabled={!canGoBack}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            title="Revenir à l'étape précédente"
          >
            <ChevronLeft size={16} />
            Reculer
          </button>
          {canGoForward ? (
            <button
              onClick={() => onMove(client.id, +1)}
              className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium shadow-sm transition hover:brightness-95 ${nextStep.colors.solid}`}
              title={`Passer à l'étape « ${nextStep.label} »`}
            >
              {nextStep.label}
              <ChevronRight size={16} />
            </button>
          ) : (
            <span className="inline-flex items-center rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              Livré ✓
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
