import { useApp } from '@/context/AppContext'
import { projects } from '@/data/projects'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { useCountUp } from '@/hooks/useCountUp'
import { ChevronRight, FileCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

export function ExecutorDashboard() {
  const { milestones, setSelectedProjectId } = useApp()

  const totalMilestones = milestones.filter(m => ['p1', 'p2', 'p3'].includes(m.projectId)).length
  const pending = milestones.filter(m => m.status === 'en_revision').length
  const validated = milestones.filter(m => ['validado', 'aceptado'].includes(m.status)).length

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-[#1B3A5C]">Panel del Ejecutor</h1>
        <p className="text-sm text-slate-500 mt-0.5">CECSA — Empresa constructora</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={<FileCheck className="w-5 h-5 text-blue-600" />} label="Proyectos activos" value={2} delay={0} />
        <StatCard icon={<Clock className="w-5 h-5 text-amber-600" />} label="Pendiente validación" value={pending} delay={80} />
        <StatCard icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} label="Hitos validados" value={validated} delay={160} />
        <StatCard icon={<AlertCircle className="w-5 h-5 text-slate-500" />} label="Total hitos" value={totalMilestones} delay={240} />
      </div>

      {/* Projects list */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Proyectos</h2>
        <div className="space-y-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              milestoneStats={getMilestoneStats(p.id, milestones)}
              onClick={() => setSelectedProjectId(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function getMilestoneStats(projectId: string, milestones: ReturnType<typeof useApp>['milestones']) {
  const pm = milestones.filter(m => m.projectId === projectId)
  return {
    total: pm.length,
    completed: pm.filter(m => ['validado', 'aceptado'].includes(m.status)).length,
    inReview: pm.filter(m => m.status === 'en_revision').length,
  }
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: number; delay: number }) {
  const animated = useCountUp(value, 800, delay + 200)
  return (
    <div
      className={cn('bg-white rounded-lg border border-slate-200 p-4 flex items-start gap-3 animate-slide-up')}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-2 rounded-md bg-slate-50">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-800 tabular-nums">{animated}</p>
        <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  milestoneStats,
  index,
  onClick,
}: {
  project: Project
  milestoneStats: { total: number; completed: number; inReview: number }
  index: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg border border-slate-200 p-4 text-left hover:border-[#2E75B6] hover:shadow-sm transition-all group animate-slide-up"
      style={{ animationDelay: `${300 + index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-slate-800 truncate">{project.name}</h3>
            <StatusBadge status={project.status} type="project" />
          </div>
          <p className="text-xs text-slate-500 mb-3">{project.sector}</p>

          <ProgressBar value={project.completionPercent} showLabel size="sm" animationDelay={400 + index * 100} />

          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span>{milestoneStats.completed}/{milestoneStats.total} hitos completos</span>
            {milestoneStats.inReview > 0 && (
              <span className="text-amber-600 font-medium">{milestoneStats.inReview} en revisión</span>
            )}
            <span className="text-slate-400 hidden sm:inline">Ref: {project.contractRef}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2E75B6] shrink-0 mt-1 transition-colors" />
      </div>
    </button>
  )
}
