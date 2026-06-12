import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { EvidenceModal } from './EvidenceModal'
import { ArrowLeft, Upload, CheckCircle2, Clock, AlertTriangle, Circle, MapPin, Calendar, FileText, Image } from 'lucide-react'
import type { Milestone, MilestoneStatus } from '@/types'
import { cn } from '@/lib/utils'

const statusOrder: MilestoneStatus[] = [
  'propuesto', 'evidencia_enviada', 'en_revision', 'validado', 'aceptado', 'disputado',
]

function statusDot(status: MilestoneStatus) {
  if (status === 'aceptado' || status === 'validado') return <CheckCircle2 className="w-5 h-5 text-green-500" />
  if (status === 'en_revision' || status === 'evidencia_enviada') return <Clock className="w-5 h-5 text-amber-500" />
  if (status === 'disputado') return <AlertTriangle className="w-5 h-5 text-red-500" />
  return <Circle className="w-5 h-5 text-slate-300" />
}

interface Props {
  onBack: () => void
  onToast: (type: 'success' | 'error', msg: string) => void
}

export function ProjectDetail({ onBack, onToast }: Props) {
  const { selectedProjectId, milestones, updateMilestoneStatus } = useApp()
  const [evidenceMilestone, setEvidenceMilestone] = useState<Milestone | null>(null)

  const project = projects.find(p => p.id === selectedProjectId)
  if (!project) return null

  const projectMilestones = milestones
    .filter(m => m.projectId === project.id)
    .sort((a, b) => a.order - b.order)

  function handleSubmitEvidence(milestone: Milestone) {
    updateMilestoneStatus(milestone.id, 'evidencia_enviada')
    setEvidenceMilestone(null)
    onToast('success', `Evidencia enviada para "${milestone.title}". El administrador recibirá la notificación.`)
  }

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1B3A5C] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a proyectos
      </button>

      {/* Project header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-bold text-[#1B3A5C]">{project.name}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              {project.sector}
            </p>
          </div>
          <StatusBadge status={project.status} type="project" />
        </div>
        <p className="text-sm text-slate-600 mb-4">{project.description}</p>
        <ProgressBar value={project.completionPercent} showLabel className="mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            {project.contractRef}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Inicio: {project.startDate}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Fin estimado: {project.expectedEndDate}
          </div>
        </div>
      </div>

      {/* Milestone timeline */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
          Cronograma de hitos
        </h2>
        <div className="space-y-2">
          {projectMilestones.map((m, i) => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              index={i}
              isLast={i === projectMilestones.length - 1}
              onSubmitEvidence={() => setEvidenceMilestone(m)}
            />
          ))}
        </div>
      </div>

      {evidenceMilestone && (
        <EvidenceModal
          milestoneName={evidenceMilestone.title}
          onClose={() => setEvidenceMilestone(null)}
          onSubmit={() => handleSubmitEvidence(evidenceMilestone)}
        />
      )}
    </div>
  )
}

function MilestoneCard({
  milestone,
  index,
  isLast,
  onSubmitEvidence,
}: {
  milestone: Milestone
  index: number
  isLast: boolean
  onSubmitEvidence: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const canSubmit = milestone.status === 'propuesto'

  return (
    <div className="flex gap-3">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="mt-3.5">{statusDot(milestone.status)}</div>
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 mt-1 mb-0" />}
      </div>

      {/* Card */}
      <div
        className={cn(
          'flex-1 bg-white rounded-lg border p-4 mb-2 cursor-pointer hover:shadow-sm transition-all',
          milestone.status === 'en_revision' || milestone.status === 'evidencia_enviada'
            ? 'border-amber-200'
            : milestone.status === 'disputado'
            ? 'border-red-200'
            : 'border-slate-200'
        )}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-mono">#{index + 1}</span>
              <span className="text-sm font-semibold text-slate-800">{milestone.title}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{milestone.sector}</p>
          </div>
          <StatusBadge status={milestone.status} />
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
            <p className="text-xs text-slate-600">{milestone.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              {milestone.evidenceCount > 0 && (
                <span className="flex items-center gap-1">
                  <Image className="w-3.5 h-3.5" />
                  {milestone.evidenceCount} evidencias
                </span>
              )}
              {milestone.submittedAt && <span>Enviado: {milestone.submittedAt}</span>}
              {milestone.validatedAt && <span>Validado: {milestone.validatedAt}</span>}
              {milestone.acceptedAt && <span>Aceptado: {milestone.acceptedAt}</span>}
            </div>
            {canSubmit && (
              <button
                onClick={e => { e.stopPropagation(); onSubmitEvidence() }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#1B3A5C] rounded-md hover:bg-[#2E75B6] transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                Enviar evidencia
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
