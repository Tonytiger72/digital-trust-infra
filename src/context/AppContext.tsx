import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Role, Milestone, MilestoneStatus } from '@/types'
import { milestones as initialMilestones } from '@/data/milestones'

const LS_MILESTONES = 'trustgas_milestones'
const LS_ROLE = 'trustgas_role'

function loadMilestones(): Milestone[] {
  try {
    const raw = localStorage.getItem(LS_MILESTONES)
    if (raw) return JSON.parse(raw) as Milestone[]
  } catch {}
  return initialMilestones
}

function loadRole(): Role {
  try {
    const raw = localStorage.getItem(LS_ROLE)
    if (raw) return raw as Role
  } catch {}
  return 'executor'
}

interface AppContextType {
  role: Role
  setRole: (role: Role) => void
  milestones: Milestone[]
  updateMilestoneStatus: (milestoneId: string, status: MilestoneStatus) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  selectedMilestoneId: string | null
  setSelectedMilestoneId: (id: string | null) => void
  resetDemo: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(loadRole)
  const [milestones, setMilestones] = useState<Milestone[]>(loadMilestones)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(LS_MILESTONES, JSON.stringify(milestones))
  }, [milestones])

  function setRole(r: Role) {
    setRoleState(r)
    localStorage.setItem(LS_ROLE, r)
  }

  function updateMilestoneStatus(milestoneId: string, status: MilestoneStatus) {
    setMilestones(prev =>
      prev.map(m => {
        if (m.id !== milestoneId) return m
        const now = new Date().toISOString().split('T')[0]
        return {
          ...m,
          status,
          submittedAt: status === 'evidencia_enviada' ? now : m.submittedAt,
          validatedAt: status === 'validado' ? now : m.validatedAt,
          acceptedAt: status === 'aceptado' ? now : m.acceptedAt,
        }
      })
    )
  }

  function resetDemo() {
    localStorage.removeItem(LS_MILESTONES)
    localStorage.removeItem(LS_ROLE)
    setMilestones(initialMilestones)
    setRoleState('executor')
    setSelectedProjectId(null)
    setSelectedMilestoneId(null)
  }

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        milestones,
        updateMilestoneStatus,
        selectedProjectId,
        setSelectedProjectId,
        selectedMilestoneId,
        setSelectedMilestoneId,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
