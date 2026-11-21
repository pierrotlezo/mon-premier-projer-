// Les 4 étapes de suivi d'une commande, dans l'ordre.
// Chaque étape a un nom, une icône (lucide-react) et un jeu de couleurs Tailwind.
// Les classes sont écrites en entier pour que Tailwind les détecte.
import { ShoppingCart, Factory, Truck, PackageCheck } from 'lucide-react'

export const STEPS = [
  {
    id: 0,
    label: 'Achat',
    description: 'Commande passée ou payée',
    icon: ShoppingCart,
    colors: {
      solid: 'bg-sky-500 text-white',       // pastille de l'étape en cours
      soft: 'bg-sky-50 text-sky-700',       // badges / fonds doux
      ring: 'ring-sky-200',
      border: 'border-sky-200',
      line: 'bg-sky-400',                   // trait du stepper
      dot: 'bg-sky-500',
    },
  },
  {
    id: 1,
    label: 'Fabrication',
    description: 'Produit en cours de production',
    icon: Factory,
    colors: {
      solid: 'bg-amber-500 text-white',
      soft: 'bg-amber-50 text-amber-700',
      ring: 'ring-amber-200',
      border: 'border-amber-200',
      line: 'bg-amber-400',
      dot: 'bg-amber-500',
    },
  },
  {
    id: 2,
    label: 'Envoi',
    description: 'Produit expédié',
    icon: Truck,
    colors: {
      solid: 'bg-violet-500 text-white',
      soft: 'bg-violet-50 text-violet-700',
      ring: 'ring-violet-200',
      border: 'border-violet-200',
      line: 'bg-violet-400',
      dot: 'bg-violet-500',
    },
  },
  {
    id: 3,
    label: 'Réception',
    description: 'Client livré',
    icon: PackageCheck,
    colors: {
      solid: 'bg-emerald-500 text-white',
      soft: 'bg-emerald-50 text-emerald-700',
      ring: 'ring-emerald-200',
      border: 'border-emerald-200',
      line: 'bg-emerald-400',
      dot: 'bg-emerald-500',
    },
  },
]

export const FIRST_STEP = 0
export const LAST_STEP = STEPS.length - 1
