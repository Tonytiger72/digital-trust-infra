import { useState } from 'react'
import { Flame, Eye, EyeOff, Lock } from 'lucide-react'

interface Props {
  onUnlock: () => void
}

export function GatePage({ onUnlock }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === 'Trustgas01' && password === 'Talleres') {
      onUnlock()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f2744] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-[#2E75B6] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <p className="text-white font-bold text-xl tracking-wide">TrustGas</p>
          <p className="text-blue-300 text-xs mt-1">Infraestructura Digital de Confianza</p>
        </div>

        {/* Card */}
        <div
          className={`bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl transition-transform ${shaking ? 'animate-shake' : ''}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-blue-300" />
            <p className="text-blue-200 text-sm font-medium">Acceso restringido</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-blue-200 text-xs font-semibold block mb-1.5 uppercase tracking-wide">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false) }}
                placeholder="Usuario"
                autoComplete="username"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-blue-400/50 focus:outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/30 transition-all"
              />
            </div>
            <div>
              <label className="text-blue-200 text-xs font-semibold block mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-blue-400/50 focus:outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/30 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                Usuario o contraseña incorrectos.
              </p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#2E75B6] rounded-xl text-white text-sm font-bold hover:bg-[#1B3A5C] transition-all shadow-lg shadow-blue-900/40 mt-1"
            >
              Ingresar
            </button>
          </form>
        </div>

        <p className="text-center text-blue-400/30 text-xs mt-6">
          Monte Cristo, Córdoba · Demo restringida
        </p>
      </div>
    </div>
  )
}
