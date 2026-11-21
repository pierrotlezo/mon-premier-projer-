// Fonctions de mise en forme pour l'affichage (format français).

const euroFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

/** 1250 -> "1 250,00 €" */
export function formatAmount(amount) {
  return euroFormatter.format(Number(amount) || 0)
}

/** "2026-11-02" -> "02/11/2026" (sans décalage de fuseau horaire) */
export function formatDate(isoDate) {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.slice(0, 10).split('-')
  return `${day}/${month}/${year}`
}

/** Date + heure complète -> "05/11/2026 à 14:30" */
export function formatDateTime(isoDateTime) {
  if (!isoDateTime) return ''
  const d = new Date(isoDateTime)
  const date = d.toLocaleDateString('fr-FR')
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  return `${date} à ${time}`
}

/**
 * Normalise un numéro : garde seulement les chiffres, et convertit +33 en 0.
 * "+33 6 12 34 56 78" -> "0612345678"
 */
export function normalizePhone(phone) {
  let digits = String(phone).replace(/[^\d+]/g, '')
  if (digits.startsWith('+33')) digits = '0' + digits.slice(3)
  else if (digits.startsWith('0033')) digits = '0' + digits.slice(4)
  return digits.replace(/\D/g, '')
}

/** "0612345678" -> "06 12 34 56 78" */
export function formatPhone(phone) {
  const digits = normalizePhone(phone)
  return digits.replace(/(\d{2})(?=\d)/g, '$1 ')
}

/** Lien cliquable pour appeler : "tel:+33612345678" */
export function phoneHref(phone) {
  const digits = normalizePhone(phone)
  return `tel:+33${digits.slice(1)}`
}

/** Date du jour au format "AAAA-MM-JJ" (pour les champs date) */
export function todayIso() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
