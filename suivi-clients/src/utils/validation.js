// Règles de validation du formulaire client.
import { normalizePhone } from './format'

/**
 * Vérifie les champs du formulaire.
 * Retourne un objet { champ: "message d'erreur" }. Vide = tout est bon.
 */
export function validateClient(values) {
  const errors = {}

  if (!values.name || !values.name.trim()) {
    errors.name = 'Le nom du client est obligatoire.'
  }

  // Numéro français : 10 chiffres commençant par 0 puis 1 à 9 (fixe ou mobile)
  const phone = normalizePhone(values.phone || '')
  if (!values.phone || !values.phone.trim()) {
    errors.phone = 'Le numéro de téléphone est obligatoire.'
  } else if (!/^0[1-9]\d{8}$/.test(phone)) {
    errors.phone = 'Numéro invalide. Exemple : 06 12 34 56 78'
  }

  // Le montant accepte la virgule française : "1250,50"
  const amount = parseAmount(values.amount)
  if (values.amount === '' || values.amount === undefined || values.amount === null) {
    errors.amount = 'Le montant est obligatoire.'
  } else if (Number.isNaN(amount)) {
    errors.amount = 'Le montant doit être un nombre.'
  } else if (amount <= 0) {
    errors.amount = 'Le montant doit être supérieur à 0.'
  }

  if (!values.purchaseDate) {
    errors.purchaseDate = "La date d'achat est obligatoire."
  }

  return errors
}

/** "1 250,50" -> 1250.5  (NaN si invalide) */
export function parseAmount(value) {
  if (typeof value === 'number') return value
  const cleaned = String(value ?? '').replace(/\s/g, '').replace(',', '.')
  if (cleaned === '' || !/^-?\d+(\.\d+)?$/.test(cleaned)) return NaN
  return Number(cleaned)
}
