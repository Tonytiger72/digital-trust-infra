import { useState } from 'react'
import { AppProvider, useApp } from '@/context/AppContext'
import { Shell } from '@/components/layout/Shell'
import { DemoGuide } from '@/components/layout/DemoGuide'
import { ExecutorDashboard } from '@/components/executor/ExecutorDashboard'
import { ProjectDetail } from '@/components/executor/ProjectDetail'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { ValidationReview } from '@/components/admin/ValidationReview'
import { MunicipalityDashboard } from '@/components/municipality/MunicipalityDashboard'
import { CitizenDashboard } from '@/components/citizen/CitizenDashboard'
import { ToastContainer, useToast } from '@/components/shared/Toast'

function AppInner() {
  const { role, selectedProjectId, setSelectedProjectId, selectedMilestoneId, setSelectedMilestoneId } = useApp()
  const { toasts, addToast, dismiss } = useToast()
  const [demoOpen, setDemoOpen] = useState(true)

  function toast(type: 'success' | 'error', msg: string) {
    addToast(type, msg)
  }

  function renderContent() {
    if (role === 'executor') {
      if (selectedProjectId) {
        return <ProjectDetail onBack={() => setSelectedProjectId(null)} onToast={toast} />
      }
      return <ExecutorDashboard />
    }
    if (role === 'admin') {
      if (selectedMilestoneId) {
        return <ValidationReview onBack={() => setSelectedMilestoneId(null)} onToast={toast} />
      }
      return <AdminDashboard />
    }
    if (role === 'municipality') {
      return <MunicipalityDashboard onToast={toast} />
    }
    if (role === 'citizen') {
      return <CitizenDashboard />
    }
    return null
  }

  return (
    <Shell onOpenDemo={() => setDemoOpen(true)}>
      {renderContent()}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      {demoOpen && <DemoGuide onClose={() => setDemoOpen(false)} />}
    </Shell>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
