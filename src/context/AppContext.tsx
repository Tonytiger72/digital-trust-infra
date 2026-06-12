import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Role, Milestone, MilestoneStatus } from '@/types'
import { milestones as initialMilestones } from '@/data/milestones'

interface AppContextType {
  role: Role
  setRole: (role: Role) => void
  milestones: Milestone[]
  updateMilestoneStatus: (milestoneId: string, status: MilestoneStatus) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  selectedMilestoneId: string | null
  setSelectedMilestoneId: (id: string | null) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('executor')
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null)

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
