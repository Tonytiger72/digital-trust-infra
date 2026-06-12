import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  onToast: (type: 'success' | 'error', msg: string) => void
}

export function MunicipalityDashboard({ onToast }: Props) {
  const { milestones, updateMilestoneStatus } = useApp()
  const [confirmDialog, setConfirmDialog] = useState<{ milestoneId: string; action: 'accept' | 'dispute' } | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const awaitingAcceptance = milestones.filter(m => m.status === 'validado')

  function handleConfirm() {
    if (!confirmDialog) return
    const m = milestones.find(mi => mi.id === confirmDialog.milestoneId)
    if (confirmDialog.action === 'accept') {
      updateMilestoneStatus(confirmDialog.milestoneId, 'aceptado')
      onToast('success', `Hito "${m?.title}" aceptado oficialmente por la municipalidad.`)
    } else {
      updateMilestoneStatus(confirmDialog.milestoneId, 'disputado')
      onToast('error', `Hito "${m?.title}" marcado como disputado.`)
    }
    setConfirmDialog(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1B3A5C]">Panel Municipal</h1>
        <p className="text-sm text-slate-500 mt-0.5">Municipalidad de Monte Cristo</p>
      </div>

      {/* Project overview */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
          Resumen de proyectos
        </h2>
        <div className="space-y-3">
          {projects.map(p => {
            const pm = milestones.filter(m => m.projectId === p.id)
            const accepted = pm.filter(m => m.status === 'aceptado').length
            const isOpen = expanded === p.id
            return (
              <div key={p.id} className="bg-white rounded-lg border border-slate-200">
                <button
                  className="w-full flex items-start justify-between gap-3 p-4 text-left"
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-semibold text-slate-800">{p.name}</h3>
                      <StatusBadge status={p.status} type="project" />
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{p.sector}</p>
                    <ProgressBar value={p.completionPercent} showLabel size="sm" />
                    <p className="text-xs text-slate-400 mt-1.5">
                      {accepted}/{pm.length} hitos aceptados
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  )}
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-4 pb-3">
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-center">
                      {['aceptado', 'validado', 'en_revision'].map(s => {
                        const count = pm.filter(m => m.status === s).length
                        return (
                          <div key={s} className="bg-slate-50 rounded p-2">
                            <p className="font-bold text-slate-700">{count}</p>
                            <StatusBadge status={s as never} className="mt-1 text-[10px]" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Awaiting acceptance */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
          Hitos pendientes de aceptación municipal ({awaitingAcceptance.length})
        </h2>
        {awaitingAcceptance.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No hay hitos pendientes de aceptación</p>
          </div>
        ) : (
          <div className="space-y-2">
            {awaitingAcceptance.map(m => {
              const project = projects.find(p => p.id === m.projectId)
              return (
                <div key={m.id} className="bg-white rounded-lg border border-emerald-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{m.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{project?.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{m.sector}</p>
                      {m.validatedAt && (
                        <p className="text-xs text-slate-400 mt-0.5">Validado: {m.validatedAt}</p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setConfirmDialog({ milestoneId: m.id, action: 'dispute' })}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Disputar
                      </button>
                      <button
                        onClick={() => setConfirmDialog({ milestoneId: m.id, action: 'accept' })}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#1B3A5C] rounded-md hover:bg-[#2E75B6] transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aceptar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Confirm dialog */}
      {confirmDialog && (
        <ConfirmDialog
          action={confirmDialog.action}
          milestoneName={milestones.find(m => m.id === confirmDialog.milestoneId)?.title ?? ''}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  )
}

function ConfirmDialog({
  action,
  milestoneName,
  onConfirm,
  onCancel,
}: {
  action: 'accept' | 'dispute'
  milestoneName: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
        <h3 className="text-base font-bold text-slate-800 mb-2">
          {action === 'accept' ? 'Confirmar aceptación' : 'Confirmar disputa'}
        </h3>
        <p className="text-sm text-slate-600 mb-5">
          {action === 'accept'
            ? `¿Confirmás la aceptación oficial del hito "${milestoneName}"?`
            : `¿Marcás como disputado el hito "${milestoneName}"? Esta acción notificará al administrador.`}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              action === 'accept'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {action === 'accept' ? 'Aceptar' : 'Disputar'}
          </button>
        </div>
      </div>
    </div>
  )
}
