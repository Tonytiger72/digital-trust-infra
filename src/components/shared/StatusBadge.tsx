import { cn } from '@/lib/utils'
import type { MilestoneStatus, ProjectStatus } from '@/types'

const milestoneLabels: Record<MilestoneStatus, string> = {
  propuesto: 'Propuesto',
  evidencia_enviada: 'Evidencia Enviada',
  en_revision: 'En Revisión',
  validado: 'Validado',
  aceptado: 'Aceptado',
  disputado: 'Disputado',
}

const milestoneColors: Record<MilestoneStatus, string> = {
  propuesto: 'bg-slate-100 text-slate-600 border-slate-200',
  evidencia_enviada: 'bg-blue-50 text-blue-700 border-blue-200',
  en_revision: 'bg-amber-50 text-amber-700 border-amber-200',
  validado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  aceptado: 'bg-green-50 text-green-700 border-green-200',
  disputado: 'bg-red-50 text-red-700 border-red-200',
}

const projectLabels: Record<ProjectStatus, string> = {
  en_progreso: 'En Progreso',
  planificacion: 'Planificación',
  completado: 'Completado',
}

const projectColors: Record<ProjectStatus, string> = {
  en_progreso: 'bg-blue-50 text-blue-700 border-blue-200',
  planificacion: 'bg-slate-100 text-slate-600 border-slate-200',
  completado: 'bg-green-50 text-green-700 border-green-200',
}

interface Props {
  status: MilestoneStatus | ProjectStatus
  type?: 'milestone' | 'project'
  className?: string
}

export function StatusBadge({ status, type = 'milestone', className }: Props) {
  const label =
    type === 'project'
      ? projectLabels[status as ProjectStatus]
      : milestoneLabels[status as MilestoneStatus]
  const color =
    type === 'project'
      ? projectColors[status as ProjectStatus]
      : milestoneColors[status as MilestoneStatus]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        color,
        className
      )}
    >
      {label}
    </span>
  )
}
