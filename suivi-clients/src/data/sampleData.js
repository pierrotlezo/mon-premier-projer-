// Clients d'exemple ajoutés au tout premier lancement de l'application.
// Les dates sont calculées par rapport à aujourd'hui pour rester réalistes.

function daysAgo(days, hour = 10) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

function dateOnly(isoDateTime) {
  const d = new Date(isoDateTime)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function buildSampleClients() {
  const samples = [
    {
      name: 'Marie Dupont',
      phone: '0612345678',
      amount: 1250,
      notes: 'Préfère être appelée le matin.',
      stepDates: { 0: daysAgo(2) },
    },
    {
      name: 'Atelier Lefèvre',
      phone: '0478123456',
      amount: 3480.5,
      notes: 'Commande de 12 pièces sur mesure.',
      stepDates: { 0: daysAgo(10), 1: daysAgo(7, 14) },
    },
    {
      name: 'Karim Benali',
      phone: '0756781234',
      amount: 189.9,
      notes: '',
      stepDates: { 0: daysAgo(15), 1: daysAgo(12), 2: daysAgo(3, 16) },
    },
    {
      name: 'Sophie Martin',
      phone: '0145678912',
      amount: 640,
      notes: 'Livraison au bureau, 3e étage.',
      stepDates: { 0: daysAgo(30), 1: daysAgo(25), 2: daysAgo(20), 3: daysAgo(18, 11) },
    },
  ]

  return samples.map((s, index) => {
    const steps = Object.keys(s.stepDates).map(Number)
    return {
      id: `exemple-${index + 1}`,
      name: s.name,
      phone: s.phone,
      amount: s.amount,
      purchaseDate: dateOnly(s.stepDates[0]),
      notes: s.notes,
      step: Math.max(...steps),
      stepDates: s.stepDates,
      createdAt: s.stepDates[0],
      updatedAt: s.stepDates[Math.max(...steps)],
    }
  })
}
