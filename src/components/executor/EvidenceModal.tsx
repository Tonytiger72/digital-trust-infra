import { useState } from 'react'
import { X, Upload, MapPin, FileText, Camera } from 'lucide-react'

interface Props {
  milestoneName: string
  onClose: () => void
  onSubmit: () => void
}

export function EvidenceModal({ milestoneName, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<'form' | 'confirming'>('form')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('confirming')
    setTimeout(() => {
      onSubmit()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Enviar Evidencia</h2>
            <p className="text-xs text-slate-500 truncate mt-0.5">{milestoneName}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'confirming' ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-green-600 animate-bounce" />
            </div>
            <p className="text-sm font-medium text-slate-700">Enviando evidencias…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Geo-tag */}
            <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 border border-slate-200">
              <MapPin className="w-4 h-4 text-[#2E75B6] shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-700">Geo-etiqueta automática</p>
                <p className="text-xs text-slate-500">-31.3459, -63.9478 · Monte Cristo, Córdoba</p>
              </div>
            </div>

            {/* Timestamp */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Fecha y hora</label>
              <input
                type="datetime-local"
                defaultValue={new Date().toISOString().slice(0, 16)}
                className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E75B6]/30"
              />
            </div>

            {/* Photo upload mock */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Fotografías</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-[#2E75B6]/50 transition-colors cursor-pointer">
                <Camera className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Arrastrá fotos o hacé clic para seleccionar</p>
                <p className="text-[10px] text-slate-400 mt-1">JPG, PNG · máx. 10 archivos</p>
              </div>
            </div>

            {/* Document upload mock */}
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Documentos adjuntos</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-[#2E75B6]/50 transition-colors cursor-pointer">
                <FileText className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <p className="text-xs text-slate-500">Actas, facturas, certificados (PDF)</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Observaciones (opcional)</label>
              <textarea
                rows={2}
                placeholder="Describí cualquier novedad o desvío…"
                className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E75B6]/30 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#1B3A5C] rounded-lg hover:bg-[#2E75B6] transition-colors"
              >
                Enviar evidencia
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
