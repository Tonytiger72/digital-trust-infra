import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { ChevronRight, ChevronLeft, RotateCcw, X, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Role } from '@/types'

interface Step {
  role: Role
  title: string
  instruction: string
  action?: string
}

const steps: Step[] = [
  {
    role: 'executor',
    title: 'Vista del Ejecutor (CECSA)',
    instruction: 'Estás viendo el panel de CECSA, la empresa constructora. Ves los 3 proyectos activos, su avance y el estado de hitos.',
    action: 'Hacé clic en "Red de Gas Natural — Barrio Centro" para ver el detalle.',
  },
  {
    role: 'executor',
    title: 'Detalle del proyecto',
    instruction: 'Este es el cronograma de hitos del proyecto. Los primeros dos están aceptados. El Tramo 2 está en revisión.',
    action: 'Expandí el hito "Conexiones domiciliarias — Sector A" y hacé clic en "Enviar evidencia".',
  },
  {
    role: 'executor',
    title: 'Envío de evidencia',
    instruction: 'Este formulario simula la carga de fotos con geo-etiqueta automática y documentos adjuntos. La ubicación GPS se captura automáticamente.',
    action: 'Hacé clic en "Enviar evidencia" para registrar el avance.',
  },
  {
    role: 'admin',
    title: 'Vista del Administrador (Fideicomiso)',
    instruction: 'Ahora sos el administrador del fideicomiso. Ves la cola de validaciones pendientes — el hito que acaba de enviar CECSA ya aparece acá.',
    action: 'Hacé clic en el hito para revisarlo.',
  },
  {
    role: 'admin',
    title: 'Revisión de evidencia',
    instruction: 'Revisás las fotos con coordenadas GPS, los documentos, y completás la lista de verificación. Todo queda registrado.',
    action: 'Tildá todos los ítems de la lista y hacé clic en "Aprobar hito".',
  },
  {
    role: 'municipality',
    title: 'Vista del Municipio',
    instruction: 'La municipalidad ve el hito validado esperando su aceptación formal. El municipio tiene la última palabra antes de que se libere el pago.',
    action: 'Hacé clic en "Aceptar" y confirmá en el diálogo.',
  },
  {
    role: 'citizen',
    title: 'Vista del Vecino (María González)',
    instruction: 'María ve el avance de su obra y su plan de pago completo — cuánto pagó, cuánto debe, cuándo vence la próxima cuota. Todo en tiempo real.',
    action: 'Scrolleá para ver la tabla de cuotas y las novedades del barrio.',
  },
]

interface Props {
  onClose: () => void
}

export function DemoGuide({ onClose }: Props) {
  const { setRole, setSelectedProjectId, setSelectedMilestoneId } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [minimized, setMinimized] = useState(false)

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  function goTo(index: number) {
    const s = steps[index]
    setCurrentStep(index)
    setRole(s.role)
    setSelectedProjectId(null)
    setSelectedMilestoneId(null)
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-[#1B3A5C] text-white text-xs font-medium rounded-lg shadow-lg hover:bg-[#2E75B6] transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" />
        Guía de demo
        <span className="bg-white/20 rounded px-1.5 py-0.5">{currentStep + 1}/{steps.length}</span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-[#1B3A5C] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-300" />
          <span className="text-xs font-semibold text-white">Guía de demo</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(true)}
            className="p-1 text-blue-300 hover:text-white transition-colors"
            title="Minimizar"
          >
            <ChevronLeft className="w-3.5 h-3.5 rotate-90" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-blue-300 hover:text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 px-4 pt-3">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === currentStep ? 'bg-[#2E75B6] w-5' : 'bg-slate-200 w-1.5 hover:bg-slate-300'
            )}
          />
        ))}
        <span className="ml-auto text-[10px] text-slate-400 font-medium">{currentStep + 1} / {steps.length}</span>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm font-bold text-slate-800 mb-1.5">{step.title}</p>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">{step.instruction}</p>
        {step.action && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            <p className="text-xs text-blue-700 font-medium">
              👉 {step.action}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-4 pb-3 flex items-center justify-between gap-2">
        <button
          onClick={() => goTo(currentStep - 1)}
          disabled={isFirst}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Anterior
        </button>

        <ResetButton />

        {isLast ? (
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={() => goTo(currentStep + 1)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#1B3A5C] rounded-lg hover:bg-[#2E75B6] transition-colors"
          >
            Siguiente
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

function ResetButton() {
  const { resetDemo } = useApp()
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <button
        onClick={() => { resetDemo(); setConfirming(false) }}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
      >
        ¿Confirmar?
      </button>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      onBlur={() => setTimeout(() => setConfirming(false), 200)}
      className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
      title="Reiniciar demo"
    >
      <RotateCcw className="w-3.5 h-3.5" />
    </button>
  )
}
