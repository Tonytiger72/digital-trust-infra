import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { activityFeed } from '@/data/activity'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Clock, ChevronRight, CheckCircle2, AlertTriangle, Activity } from 'lucide-react'

export function AdminDashboard() {
  const { milestones, setSelectedMilestoneId } = useApp()

  const pending = milestones
    .filter(m => m.status === 'en_revision' || m.status === 'evidencia_enviada')
    .sort((a, b) => (b.submittedAt ?? '').localeCompare(a.submittedAt ?? ''))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#1B3A5C]">Panel del Administrador</h1>
        <p className="text-sm text-slate-500 mt-0.5">Fideicomiso MCO — Revisión y validación</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{pending.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Pendientes de revisión</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {milestones.filter(m => m.status === 'validado' || m.status === 'aceptado').length}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Validados</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-500">
            {milestones.filter(m => m.status === 'disputado').length}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Disputados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending queue */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            Cola de validación pendiente
          </h2>
          {pending.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No hay validaciones pendientes</p>
            </div>
          ) : (
            <div className="space-y-2">
              {pending.map(m => {
                const project = projects.find(p => p.id === m.projectId)
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMilestoneId(m.id)}
                    className="w-full bg-white rounded-lg border border-amber-200 p-4 text-left hover:shadow-sm hover:border-[#2E75B6] transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{m.title}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{project?.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <StatusBadge status={m.status} />
                          {m.submittedAt && (
                            <span className="text-xs text-slate-400">Enviado: {m.submittedAt}</span>
                          )}
                          <span className="text-xs text-slate-400">{m.evidenceCount} evidencias</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2E75B6] shrink-0 mt-1 transition-colors" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Activity feed */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            Actividad reciente
          </h2>
          <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
            {activityFeed.map(item => (
              <div key={item.id} className="p-3">
                <div className="flex items-start gap-2.5">
                  <ActivityIcon type={item.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 font-medium">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{item.projectName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(item.date).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {' · '}
                      {item.actor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityIcon({ type }: { type: string }) {
  if (type === 'validacion' || type === 'aceptacion')
    return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
  if (type === 'disputa')
    return <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
  return <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
}
