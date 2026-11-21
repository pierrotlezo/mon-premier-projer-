// Tableau de bord : nombre de clients et montant total par étape + total global.
// Cliquer sur une étape applique le filtre correspondant dans la liste.
import { Wallet } from 'lucide-react'
import { STEPS } from '../constants/steps'
import { formatAmount } from '../utils/format'

export default function Dashboard({ clients, activeStep, onSelectStep }) {
  // Calcul des statistiques par étape
  const stats = STEPS.map((step) => {
    const inStep = clients.filter((c) => c.step === step.id)
    return {
      step,
      count: inStep.length,
      total: inStep.reduce((sum, c) => sum + Number(c.amount), 0),
    }
  })
  const grandTotal = clients.reduce((sum, c) => sum + Number(c.amount), 0)

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map(({ step, count, total }) => {
        const isActive = activeStep === step.id
        return (
          <button
            key={step.id}
            onClick={() => onSelectStep(isActive ? 'all' : step.id)}
            className={`rounded-3xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
              isActive ? `${step.colors.border} ring-2 ${step.colors.ring}` : 'border-slate-100'
            }`}
            title={`Filtrer sur l'étape « ${step.label} »`}
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${step.colors.soft}`}>
                <step.icon size={18} />
              </span>
              <span className="text-2xl font-bold text-slate-800">{count}</span>
            </div>
            <div className="mt-3 text-sm font-medium text-slate-600">{step.label}</div>
            <div className="text-sm text-slate-400">{formatAmount(total)}</div>
          </button>
        )
      })}

      {/* Total global */}
      <div className="col-span-2 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 p-4 text-white shadow-sm md:col-span-1">
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20">
            <Wallet size={18} />
          </span>
          <span className="text-2xl font-bold">{clients.length}</span>
        </div>
        <div className="mt-3 text-sm font-medium text-white/90">Total global</div>
        <div className="text-base font-semibold">{formatAmount(grandTotal)}</div>
      </div>
    </section>
  )
}
