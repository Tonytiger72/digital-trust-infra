import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import insaightsLogo from '@/assets/Insaights logo black.png'

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
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#F7F9FA', fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Logo */}
      <div className="mb-10">
        <img
          src={insaightsLogo}
          alt="Insaights"
          className="h-8 object-contain"
        />
      </div>

      {/* Card */}
      <div
        className={`w-full max-w-sm bg-white border rounded-2xl shadow-sm p-8 transition-transform ${shaking ? 'animate-shake' : ''}`}
        style={{ borderColor: '#DDE2E8' }}
      >
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "'DM Serif Display', serif", color: '#141820' }}
        >
          TrustGas
        </h1>
        <p className="text-sm mb-7" style={{ color: '#717B8C' }}>
          Ingresá tus credenciales para continuar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
              style={{ color: '#141820' }}
            >
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(false) }}
              placeholder="Usuario"
              autoComplete="username"
              className="w-full rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              style={{
                backgroundColor: '#F7F9FA',
                border: '1.5px solid #DDE2E8',
                color: '#141820',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#F5A612')}
              onBlur={e => (e.currentTarget.style.borderColor = '#DDE2E8')}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
              style={{ color: '#141820' }}
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false) }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl px-4 py-2.5 text-sm transition-all outline-none pr-10"
                style={{
                  backgroundColor: '#F7F9FA',
                  border: '1.5px solid #DDE2E8',
                  color: '#141820',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#F5A612')}
                onBlur={e => (e.currentTarget.style.borderColor = '#DDE2E8')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#717B8C' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              className="text-xs rounded-lg px-3 py-2 border"
              style={{ color: '#D42020', backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}
            >
              Usuario o contraseña incorrectos.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 text-sm font-bold transition-all mt-1"
            style={{ backgroundColor: '#F5A612', color: '#141820' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e09600')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F5A612')}
          >
            Ingresar
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs" style={{ color: '#717B8C' }}>
        Monte Cristo, Córdoba · Demo restringida
      </p>
    </div>
  )
}
