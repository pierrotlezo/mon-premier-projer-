// Stepper horizontal à 4 étapes :
//  - étapes terminées : pastille colorée avec une coche
//  - étape en cours   : pastille colorée + halo, avec l'icône de l'étape
//  - étapes à venir   : pastille grise
// Sous chaque étape atteinte, on affiche la date de passage.
import { Check } from 'lucide-react'
import { STEPS } from '../constants/steps'
import { formatDateTime } from '../utils/format'

export default function Stepper({ currentStep, stepDates = {} }) {
  return (
    <ol className="flex w-full items-start">
      {STEPS.map((step, index) => {
        const isDone = index < currentStep
        const isCurrent = index === currentStep
        const Icon = step.icon
        const date = stepDates[index]

        return (
          <li key={step.id} className="relative flex flex-1 flex-col items-center text-center">
            {/* Trait qui relie cette étape à la précédente */}
            {index > 0 && (
              <div
                className={`absolute top-4 right-1/2 h-1 w-full -translate-y-1/2 rounded-full sm:top-5 ${
                  index <= currentStep ? step.colors.line : 'bg-slate-200'
                }`}
                aria-hidden="true"
              />
            )}

            {/* Pastille */}
            <div
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition sm:h-10 sm:w-10 ${
                isDone
                  ? step.colors.solid
                  : isCurrent
                    ? `${step.colors.solid} ring-4 ${step.colors.ring} scale-110`
                    : 'bg-slate-100 text-slate-400'
              }`}
              title={date ? `${step.label} — ${formatDateTime(date)}` : step.label}
            >
              {isDone ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
            </div>

            {/* Libellé + date */}
            <span
              className={`mt-2 text-[11px] leading-tight sm:text-xs ${
                isCurrent ? 'font-semibold text-slate-800' : isDone ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {step.label}
            </span>
            {date && (
              <span className="mt-0.5 text-[10px] text-slate-400">
                {new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
