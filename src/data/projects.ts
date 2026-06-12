import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Red de Gas Natural — Barrio Centro',
    sector: 'Barrio Centro, Monte Cristo',
    status: 'en_progreso',
    completionPercent: 65,
    contractRef: 'CONTRATO-MCO-2025-047',
    startDate: '2025-03-01',
    expectedEndDate: '2026-09-30',
    totalMilestones: 6,
    description:
      'Extensión y habilitación de la red de gas natural en el sector residencial del Barrio Centro de Monte Cristo, beneficiando a aproximadamente 340 familias.',
  },
  {
    id: 'p2',
    name: 'Extensión Red de Gas — Barrio Norte',
    sector: 'Barrio Norte, Monte Cristo',
    status: 'en_progreso',
    completionPercent: 30,
    contractRef: 'CONTRATO-MCO-2025-051',
    startDate: '2025-07-01',
    expectedEndDate: '2026-12-31',
    totalMilestones: 5,
    description:
      'Instalación de nueva red troncal y ramales domiciliarios en Barrio Norte, con habilitación estimada para fines de 2026.',
  },
  {
    id: 'p3',
    name: 'Red de Gas — Zona Industrial',
    sector: 'Zona Industrial, Monte Cristo',
    status: 'planificacion',
    completionPercent: 0,
    contractRef: 'CONTRATO-MCO-2026-003',
    startDate: '2026-08-01',
    expectedEndDate: '2027-06-30',
    totalMilestones: 4,
    description:
      'Proyecto de gasoducto industrial para el parque productivo de Monte Cristo. En etapa de diseño y aprobación.',
  },
]
