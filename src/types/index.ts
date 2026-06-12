export type Role = 'executor' | 'admin' | 'municipality' | 'citizen'

export type MilestoneStatus =
  | 'propuesto'
  | 'evidencia_enviada'
  | 'en_revision'
  | 'validado'
  | 'aceptado'
  | 'disputado'

export type ProjectStatus = 'en_progreso' | 'planificacion' | 'completado'

export interface Evidence {
  id: string
  type: 'foto' | 'documento'
  label: string
  lat: number
  lng: number
  timestamp: string
  thumbnailUrl?: string
}

export interface Milestone {
  id: string
  projectId: string
  order: number
  title: string
  description: string
  sector: string
  status: MilestoneStatus
  evidenceCount: number
  evidence: Evidence[]
  submittedAt?: string
  validatedAt?: string
  acceptedAt?: string
  notes?: string
}

export interface Project {
  id: string
  name: string
  sector: string
  status: ProjectStatus
  completionPercent: number
  contractRef: string
  startDate: string
  expectedEndDate: string
  totalMilestones: number
  description: string
}

export interface Installment {
  number: number
  dueDate: string
  amount: number
  paid: boolean
  paidDate?: string
}

export interface CitizenProfile {
  name: string
  address: string
  projectId: string
  totalCommitment: number
  totalPaid: number
  nextPaymentDate: string
  nextPaymentAmount: number
  installments: Installment[]
}

export interface ActivityItem {
  id: string
  date: string
  type: 'validacion' | 'disputa' | 'aceptacion' | 'evidencia' | 'estado'
  projectName: string
  milestoneName: string
  actor: string
  description: string
}
