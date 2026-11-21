// ============================================================
//  COUCHE D'ACCÈS AUX DONNÉES
// ------------------------------------------------------------
//  C'est le SEUL fichier qui sait où sont stockés les clients.
//  Aujourd'hui : dans le navigateur (localStorage).
//  Demain : pour passer à une vraie base de données, il suffira
//  de réécrire ces fonctions (par ex. avec fetch() vers une API).
//  Elles sont déjà "async" pour que ce changement soit transparent
//  pour le reste de l'application.
// ============================================================
import { buildSampleClients } from './sampleData'
import { FIRST_STEP, LAST_STEP } from '../constants/steps'

const STORAGE_KEY = 'suivi-clients:clients'
const INITIALIZED_KEY = 'suivi-clients:initialized'

// --- Fonctions internes (lecture / écriture brute) ---

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    // Données illisibles : on repart d'une liste vide plutôt que de planter
    return []
  }
}

function writeAll(clients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// --- API publique utilisée par l'application ---

/** Retourne tous les clients. Ajoute les exemples au tout premier lancement. */
export async function getClients() {
  if (!localStorage.getItem(INITIALIZED_KEY)) {
    writeAll(buildSampleClients())
    localStorage.setItem(INITIALIZED_KEY, 'true')
  }
  return readAll()
}

/** Crée un client (il démarre à l'étape « Achat »). */
export async function createClient(data) {
  const now = new Date().toISOString()
  const client = {
    id: generateId(),
    name: data.name.trim(),
    phone: data.phone,
    amount: data.amount,
    purchaseDate: data.purchaseDate,
    notes: data.notes?.trim() || '',
    step: FIRST_STEP,
    stepDates: { [FIRST_STEP]: now },
    createdAt: now,
    updatedAt: now,
  }
  writeAll([...readAll(), client])
  return client
}

/** Modifie les informations d'un client (nom, téléphone, montant, date, notes). */
export async function updateClient(id, data) {
  let updated = null
  const clients = readAll().map((c) => {
    if (c.id !== id) return c
    updated = {
      ...c,
      name: data.name.trim(),
      phone: data.phone,
      amount: data.amount,
      purchaseDate: data.purchaseDate,
      notes: data.notes?.trim() || '',
      updatedAt: new Date().toISOString(),
    }
    return updated
  })
  writeAll(clients)
  return updated
}

/** Supprime un client. */
export async function deleteClient(id) {
  writeAll(readAll().filter((c) => c.id !== id))
}

/**
 * Fait avancer (+1) ou reculer (-1) un client d'une étape.
 * - en avançant, on enregistre la date de passage à la nouvelle étape ;
 * - en reculant, on efface la date de l'étape quittée (historique cohérent).
 */
export async function moveClientStep(id, direction) {
  let updated = null
  const clients = readAll().map((c) => {
    if (c.id !== id) return c
    const newStep = Math.min(LAST_STEP, Math.max(FIRST_STEP, c.step + direction))
    if (newStep === c.step) return c

    const now = new Date().toISOString()
    const stepDates = { ...c.stepDates }
    if (direction > 0) stepDates[newStep] = now
    else delete stepDates[c.step]

    updated = { ...c, step: newStep, stepDates, updatedAt: now }
    return updated
  })
  writeAll(clients)
  return updated
}
