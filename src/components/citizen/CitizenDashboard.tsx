import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { citizen } from '@/data/citizens'
import { activityFeed } from '@/data/activity'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { CheckCircle2, Clock, CreditCard, MapPin, Calendar } from 'lucide-react'

const formatARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

export function CitizenDashboard() {
  const { milestones } = useApp()

  const project = projects.find(p => p.id === citizen.projectId)!
  const projectMilestones = milestones
    .filter(m => m.projectId === citizen.projectId)
    .sort((a, b) => a.order - b.order)

  const paidPct = Math.round((citizen.totalPaid / citizen.totalCommitment) * 100)
  const recentUpdates = activityFeed.filter(
    a => a.projectName === project.name && ['validacion', 'aceptacion'].includes(a.type)
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#1B3A5C]">Mi obra de gas</h1>
        <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {citizen.address}
        </p>
      </div>

      {/* Project status */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800">{project.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{project.sector}</p>
          </div>
          <StatusBadge status={project.status} type="project" />
        </div>
        <ProgressBar value={project.completionPercent} showLabel className="mb-4" />
        <p className="text-xs text-slate-500 mb-4">
          Tu barrio tiene el {project.completionPercent}% de la obra completada.
          Se estima la puesta en servicio para <strong>{project.expectedEndDate}</strong>.
        </p>

        {/* Simplified milestone timeline */}
        <div className="space-y-1.5">
          {projectMilestones.map(m => (
            <div key={m.id} className="flex items-center gap-2.5">
              {m.status === 'aceptado' ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : m.status === 'en_revision' || m.status === 'validado' || m.status === 'evidencia_enviada' ? (
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
              )}
              <span className="text-xs text-slate-700">{m.title}</span>
              {m.acceptedAt && (
                <span className="text-[10px] text-slate-400 ml-auto shrink-0">✓ {m.acceptedAt}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment dashboard */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-[#2E75B6]" />
          <h2 className="text-base font-bold text-slate-800">Mi plan de pago</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <PaymentStat label="Compromiso total" value={formatARS(citizen.totalCommitment)} />
          <PaymentStat label="Pagado a la fecha" value={formatARS(citizen.totalPaid)} accent />
          <PaymentStat label="Saldo restante" value={formatARS(citizen.totalCommitment - citizen.totalPaid)} />
          <PaymentStat label="Próximo vencimiento" value={formatDate(citizen.nextPaymentDate)} small />
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Avance de pago</span>
            <span>{paidPct}% pagado</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E75B6] rounded-full"
              style={{ width: `${paidPct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {citizen.installments.filter(i => i.paid).length} de {citizen.installments.length} cuotas abonadas
          </p>
        </div>

        {/* Installment table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 text-slate-500 font-medium">Cuota</th>
                <th className="text-left py-2 text-slate-500 font-medium">Vencimiento</th>
                <th className="text-right py-2 text-slate-500 font-medium">Importe</th>
                <th className="text-right py-2 text-slate-500 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {citizen.installments.map(inst => (
                <tr key={inst.number} className="border-b border-slate-50">
                  <td className="py-1.5 text-slate-600">#{inst.number}</td>
                  <td className="py-1.5 text-slate-600">{formatDate(inst.dueDate)}</td>
                  <td className="py-1.5 text-right text-slate-700 font-medium">{formatARS(inst.amount)}</td>
                  <td className="py-1.5 text-right">
                    {inst.paid ? (
                      <span className="text-green-600 font-medium">Pagado</span>
                    ) : inst.dueDate === citizen.nextPaymentDate ? (
                      <span className="text-amber-600 font-medium">Próximo</span>
                    ) : (
                      <span className="text-slate-400">Pendiente</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent updates */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-bold text-slate-800 mb-3">Novedades del barrio</h2>
        {recentUpdates.length === 0 ? (
          <p className="text-sm text-slate-400">No hay novedades recientes.</p>
        ) : (
          <div className="space-y-3">
            {recentUpdates.map(item => (
              <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm text-slate-700">{item.description}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.date).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentStat({ label, value, accent, small }: { label: string; value: string; accent?: boolean; small?: boolean }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 text-center">
      <p className={`font-bold ${small ? 'text-sm' : 'text-lg'} ${accent ? 'text-[#2E75B6]' : 'text-slate-800'}`}>
        {value}
      </p>
      <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
