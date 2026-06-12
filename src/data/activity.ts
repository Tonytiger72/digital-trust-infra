import type { ActivityItem } from '@/types'

export const activityFeed: ActivityItem[] = [
  {
    id: 'a1',
    date: '2026-06-05T09:00:00',
    type: 'evidencia',
    projectName: 'Red de Gas Natural — Barrio Centro',
    milestoneName: 'Excavación y tendido — Tramo 2',
    actor: 'CECSA',
    description: 'Se enviaron 3 evidencias para validación del Tramo 2.',
  },
  {
    id: 'a2',
    date: '2026-06-03T14:30:00',
    type: 'estado',
    projectName: 'Extensión Red de Gas — Barrio Norte',
    milestoneName: 'Excavación red troncal',
    actor: 'CECSA',
    description: 'Hito pasó a estado "Evidencia enviada" para revisión.',
  },
  {
    id: 'a3',
    date: '2025-06-18T10:00:00',
    type: 'aceptacion',
    projectName: 'Red de Gas Natural — Barrio Centro',
    milestoneName: 'Excavación y tendido — Tramo 1',
    actor: 'Municipalidad de Monte Cristo',
    description: 'Hito aceptado formalmente por la municipalidad.',
  },
  {
    id: 'a4',
    date: '2025-06-15T11:00:00',
    type: 'validacion',
    projectName: 'Red de Gas Natural — Barrio Centro',
    milestoneName: 'Excavación y tendido — Tramo 1',
    actor: 'Fideicomiso MCO',
    description: 'Documentación y fotos verificadas. Tramo 1 validado.',
  },
  {
    id: 'a5',
    date: '2025-04-10T09:00:00',
    type: 'aceptacion',
    projectName: 'Red de Gas Natural — Barrio Centro',
    milestoneName: 'Relevamiento y diseño de red',
    actor: 'Municipalidad de Monte Cristo',
    description: 'Diseño aprobado y aceptado por la municipalidad.',
  },
]
