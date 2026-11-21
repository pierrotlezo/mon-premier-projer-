// Formulaire de création / modification d'une fiche client (dans une modale).
import { useState } from 'react'
import Modal from './Modal'
import { validateClient, parseAmount } from '../utils/validation'
import { normalizePhone, todayIso } from '../utils/format'

export default function ClientForm({ client, onSave, onCancel }) {
  const isEdit = Boolean(client)

  // Valeurs du formulaire (pré-remplies si on modifie un client existant)
  const [values, setValues] = useState({
    name: client?.name ?? '',
    phone: client?.phone ?? '',
    amount: client ? String(client.amount).replace('.', ',') : '',
    purchaseDate: client?.purchaseDate ?? todayIso(),
    notes: client?.notes ?? '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field, value) {
    const next = { ...values, [field]: value }
    setValues(next)
    // Après une première tentative d'envoi, on revalide en direct
    if (submitted) setErrors(validateClient(next))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    const validationErrors = validateClient(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onSave({
      ...values,
      phone: normalizePhone(values.phone),
      amount: Math.round(parseAmount(values.amount) * 100) / 100,
    })
  }

  return (
    <Modal title={isEdit ? 'Modifier le client' : 'Nouveau client'} onClose={onCancel}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Nom du client" required error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ex. : Marie Dupont"
            autoFocus
            className={inputClass(errors.name)}
          />
        </Field>

        <Field label="Téléphone" required error={errors.phone}>
          <input
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="06 12 34 56 78"
            className={inputClass(errors.phone)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Montant (€)" required error={errors.amount}>
            <input
              type="text"
              inputMode="decimal"
              value={values.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              placeholder="1250,00"
              className={inputClass(errors.amount)}
            />
          </Field>

          <Field label="Date d'achat" required error={errors.purchaseDate}>
            <input
              type="date"
              value={values.purchaseDate}
              onChange={(e) => handleChange('purchaseDate', e.target.value)}
              className={inputClass(errors.purchaseDate)}
            />
          </Field>
        </div>

        <Field label="Notes" hint="facultatif">
          <textarea
            rows={3}
            value={values.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Informations utiles, préférences de livraison…"
            className={inputClass()}
          />
        </Field>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600"
          >
            {isEdit ? 'Enregistrer' : 'Ajouter le client'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// Un champ de formulaire avec son libellé et son message d'erreur
function Field({ label, required, hint, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500"> *</span>}
        {hint && <span className="font-normal text-slate-400"> ({hint})</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  )
}

function inputClass(hasError) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-4 ${
    hasError
      ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
      : 'border-slate-200 focus:border-indigo-300 focus:ring-indigo-100'
  }`
}
