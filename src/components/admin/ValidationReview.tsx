import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ArrowLeft, MapPin, Clock, CheckSquare, Square, CheckCircle2, XCircle, AlertTriangle, Image, FileText } from 'lucide-react'
import type { Evidence } from '@/types'

const checklist = [
  { id: 'doc', label: 'Documentación completa y firmada' },
  { id: 'photo', label: 'Fotografías con geo-etiqueta verificadas' },
  { id: 'geo', label: 'Geolocalización consistente con el sector' },
  { id: 'timeline', label: 'Fechas y cronograma coherentes' },
  { id: 'invoice', label: 'Factura o certificado de avance adjunto' },
]

interface Props {
  onBack: () => void
  onToast: (type: 'success' | 'error', msg: string) => void
}

export function ValidationReview({ onBack, onToast }: Props) {
  const { selectedMilestoneId, milestones, updateMilestoneStatus } = useApp()
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const milestone = milestones.find(m => m.id === selectedMilestoneId)
  if (!milestone) return null

  const project = projects.find(p => p.id === milestone.projectId)

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleApprove() {
    updateMilestoneStatus(milestone.id, 'validado')
    onBack()
    onToast('success', `Hito "${milestone.title}" validado correctamente.`)
  }

  function handleRevision() {
    updateMilestoneStatus(milestone.id, 'propuesto')
    onBack()
    onToast('error', `Se solicitó revisión para "${milestone.title}". El ejecutor fue notificado.`)
  }

  function handleDispute() {
    updateMilestoneStatus(milestone.id, 'disputado')
    onBack()
    onToast('error', `Hito "${milestone.title}" marcado como disputado.`)
  }

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1B3A5C] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a validaciones
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h1 className="text-lg font-bold text-[#1B3A5C]">{milestone.title}</h1>
            <p className="text-sm text-slate-500 mt-0.5">{project?.name}</p>
          </div>
          <StatusBadge status={milestone.status} />
        </div>
        <p className="text-sm text-slate-600 mb-3">{milestone.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{milestone.sector}</span>
          {milestone.submittedAt && (
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Enviado: {milestone.submittedAt}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Evidence */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
            Evidencias adjuntas ({milestone.evidence.length})
          </h2>
          <div className="space-y-2">
            {milestone.evidence.map(ev => (
              <EvidenceItem key={ev.id} ev={ev} />
            ))}
          </div>
        </div>

        {/* Checklist + actions */}
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
              Lista de verificación
            </h2>
            <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
              {checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                >
                  {checked.has(item.id) ? (
                    <CheckSquare className="w-4 h-4 text-[#2E75B6] shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span className={`text-sm ${checked.has(item.id) ? 'text-slate-700' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {checked.size}/{checklist.length} ítems verificados
            </p>
          </div>

          {/* Payment record */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Registro de pago vinculado</p>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Monto correspondiente</span>
              <span className="font-medium">ARS 85.000</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>Estado</span>
              <span className="text-amber-600 font-medium">Pendiente de validación</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleApprove}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              Aprobar hito
            </button>
            <button
              onClick={handleRevision}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Solicitar revisión
            </button>
            <button
              onClick={handleDispute}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Marcar disputa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EvidenceItem({ ev }: { ev: Evidence }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 flex items-start gap-3">
      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center shrink-0">
        {ev.type === 'foto' ? (
          <Image className="w-5 h-5 text-slate-400" />
        ) : (
          <FileText className="w-5 h-5 text-slate-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-700 truncate">{ev.label}</p>
        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-0.5">
            <MapPin className="w-3 h-3" />
            {ev.lat.toFixed(4)}, {ev.lng.toFixed(4)}
          </span>
          <span>·</span>
          <span>
            {new Date(ev.timestamp).toLocaleString('es-AR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </p>
      </div>
    </div>
  )
}
