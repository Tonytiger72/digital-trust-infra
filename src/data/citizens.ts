import type { CitizenProfile } from '@/types'

const generateInstallments = (): CitizenProfile['installments'] => {
  const installments = []
  const start = new Date('2025-10-01')
  for (let i = 1; i <= 24; i++) {
    const date = new Date(start)
    date.setMonth(start.getMonth() + (i - 1))
    installments.push({
      number: i,
      dueDate: date.toISOString().split('T')[0],
      amount: 50000,
      paid: i <= 9,
      paidDate: i <= 9 ? date.toISOString().split('T')[0] : undefined,
    })
  }
  return installments
}

export const citizen: CitizenProfile = {
  name: 'María González',
  address: 'Calle San Martín 847, Barrio Centro, Monte Cristo',
  projectId: 'p1',
  totalCommitment: 1200000,
  totalPaid: 450000,
  nextPaymentDate: '2026-07-01',
  nextPaymentAmount: 50000,
  installments: generateInstallments(),
}
