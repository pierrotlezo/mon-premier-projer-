// Demande de confirmation avant une action irréversible (suppression).
import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

export default function ConfirmDialog({ title, message, confirmLabel = 'Supprimer', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <AlertTriangle size={22} />
        </div>
        <p className="pt-2 text-sm text-slate-600">{message}</p>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          onClick={onCancel}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          autoFocus
          className="rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-600"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
