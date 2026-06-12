import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Flame, Shield, CheckCircle2, Users, Building2, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <Shield className="w-5 h-5 text-blue-300" />,
    title: 'Trazabilidad total',
    desc: 'Cada hito, evidencia y validación queda registrado con fecha, responsable y geolocalización.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-300" />,
    title: 'Validación independiente',
    desc: 'El fideicomiso verifica antes de que el municipio acepte. Nadie puede aprobar su propio trabajo.',
  },
  {
    icon: <Users className="w-5 h-5 text-amber-300" />,
    title: 'Transparencia ciudadana',
    desc: 'Los vecinos ven el avance real de su obra y el estado de su plan de pago, en tiempo real.',
  },
  {
    icon: <Building2 className="w-5 h-5 text-violet-300" />,
    title: 'Control municipal',
    desc: 'La municipalidad tiene la última palabra en cada hito antes de liberar fondos.',
  },
]

const stats = [
  { value: '340', label: 'Familias beneficiadas' },
  { value: '3', label: 'Proyectos activos' },
  { value: '100%', label: 'Auditable' },
]

export function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cidiLoading, setCidiLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Ingresá tu usuario y contraseña.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => login(), 1200)
  }

  function handleCidi() {
    setCidiLoading(true)
    setTimeout(() => login(), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0f2744] flex flex-col lg:flex-row overflow-hidden">

      {/* ── Left panel — branding + pitch ── */}
      <div
        className={cn(
          'lg:w-3/5 flex flex-col justify-between px-8 py-10 lg:px-16 lg:py-14 transition-all duration-700',
          mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2E75B6] rounded-xl flex items-center justify-center shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg tracking-wide leading-none">TrustGas</p>
            <p className="text-blue-300 text-xs mt-0.5">Infraestructura Digital de Confianza</p>
          </div>
        </div>

        {/* Headline */}
        <div className="my-10 lg:my-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-blue-200 text-xs font-medium">Prueba de Concepto — Monte Cristo, Córdoba</span>
          </div>

          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            La infraestructura de gas<br />
            <span className="text-[#2E75B6]">ahora es transparente.</span>
          </h1>
          <p className="text-blue-200 text-base lg:text-lg leading-relaxed max-w-lg">
            Una plataforma que conecta a la empresa constructora, el fideicomiso, la municipalidad y los vecinos en un único registro de confianza.
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-blue-300 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 lg:mt-0">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={cn(
                'flex gap-3 transition-all duration-500',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 shrink-0 h-fit">
                {f.icon}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{f.title}</p>
                <p className="text-blue-300 text-xs leading-relaxed mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-blue-400/50 text-xs mt-8 lg:mt-0">
          Municipalidad de Monte Cristo · CECSA · Fideicomiso MCO · Córdoba, Argentina
        </p>
      </div>

      {/* ── Right panel — login form ── */}
      <div className="lg:w-2/5 flex items-center justify-center px-6 py-10 lg:py-0">
        <div
          className={cn(
            'w-full max-w-sm transition-all duration-700',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">

            <h2 className="text-white font-bold text-xl mb-1">Ingresar a TrustGas</h2>
            <p className="text-blue-300 text-sm mb-7">Accedé con tus credenciales o tu identidad digital.</p>

            {/* CIDI button */}
            <button
              onClick={handleCidi}
              disabled={cidiLoading || loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-medium hover:bg-white/15 transition-all mb-2 disabled:opacity-60 group"
            >
              {cidiLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CidiLogo />
              )}
              <span>{cidiLoading ? 'Conectando con CIDI…' : 'Ingresar con CIDI Córdoba'}</span>
              {!cidiLoading && <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
            </button>
            <p className="text-center text-[10px] text-blue-400/60 mb-5">
              Integración propuesta — identidad digital provincial
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-blue-400 text-xs">o ingresá con usuario</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-blue-200 text-xs font-medium block mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-blue-400/50 focus:outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/30 transition-all"
                />
              </div>
              <div>
                <label className="text-blue-200 text-xs font-medium block mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || cidiLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2E75B6] rounded-xl text-white text-sm font-semibold hover:bg-[#1B3A5C] transition-all disabled:opacity-60 shadow-lg shadow-blue-900/40 mt-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Ingresando…</>
                ) : (
                  <>Ingresar <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-blue-400/50 text-[10px] mt-6">
              Demo PoC · Cualquier credencial es válida
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CidiLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1565C0" />
      <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 14C21.657 14 23 15.343 23 17C23 18.657 21.657 20 20 20C18.343 20 17 18.657 17 17C17 15.343 18.343 14 20 14ZM20 29C17 29 14.33 27.54 12.67 25.28C12.71 22.56 18 21.07 20 21.07C21.99 21.07 27.29 22.56 27.33 25.28C25.67 27.54 23 29 20 29Z" fill="white" />
    </svg>
  )
}
