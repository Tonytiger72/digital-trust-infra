import type { ReactNode } from 'react'
import { useApp } from '@/context/AppContext'
import type { Role } from '@/types'
import { Flame, ChevronDown, Shield, Landmark, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const roles: { value: Role; label: string; sublabel: string; icon: React.ReactNode; color: string }[] = [
  {
    value: 'executor',
    label: 'Ejecutor',
    sublabel: 'CECSA',
    icon: <Flame className="w-4 h-4" />,
    color: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  {
    value: 'admin',
    label: 'Administrador',
    sublabel: 'Fideicomiso MCO',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-violet-700 bg-violet-50 border-violet-200',
  },
  {
    value: 'municipality',
    label: 'Municipio',
    sublabel: 'Municipalidad de Monte Cristo',
    icon: <Landmark className="w-4 h-4" />,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    value: 'citizen',
    label: 'Vecino',
    sublabel: 'María González',
    icon: <User className="w-4 h-4" />,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
]

interface Props {
  children: ReactNode
}

export function Shell({ children }: Props) {
  const { role, setRole, setSelectedProjectId, setSelectedMilestoneId } = useApp()
  const [open, setOpen] = useState(false)

  const current = roles.find(r => r.value === role)!

  function switchRole(r: Role) {
    setRole(r)
    setSelectedProjectId(null)
    setSelectedMilestoneId(null)
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-[#1B3A5C] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#2E75B6] rounded flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-wide">TrustGas</span>
              <span className="text-[10px] text-blue-300 hidden sm:block">Infraestructura Digital — Monte Cristo</span>
            </div>
          </div>

          {/* Role switcher */}
          <div className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors',
                current.color
              )}
            >
              {current.icon}
              <span className="hidden sm:inline">{current.label} · </span>
              <span>{current.sublabel}</span>
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg border border-slate-200 shadow-xl z-20 overflow-hidden">
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      Ver plataforma como
                    </p>
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.value}
                      onClick={() => switchRole(r.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors',
                        role === r.value && 'bg-slate-50'
                      )}
                    >
                      <span className={cn('p-1.5 rounded border', r.color)}>{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{r.label}</p>
                        <p className="text-xs text-slate-500 truncate">{r.sublabel}</p>
                      </div>
                      {role === r.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E75B6] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">{children}</main>

      <footer className="border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-400">
        TrustGas · Infraestructura Digital de Confianza · Monte Cristo, Córdoba
      </footer>
    </div>
  )
}
