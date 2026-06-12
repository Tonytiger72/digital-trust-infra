import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Flame, Shield, CheckCircle2, Users, Building2, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import cidiLogo from '@/assets/cidi-logo.jpeg'

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
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* ── LEFT — deep navy blue ── */}
      <div
        className={cn(
          'lg:w-3/5 bg-[#0f2744] flex flex-col justify-between px-8 py-10 lg:px-16 lg:py-14 transition-all duration-700',
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

          <div className="flex gap-8 mt-8">
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

        <p className="text-blue-400/40 text-xs mt-8 lg:mt-0">
          Municipalidad de Monte Cristo · CECSA · Fideicomiso MCO · Córdoba, Argentina
        </p>
      </div>

      {/* ── RIGHT — warm off-white / light slate ── */}
      <div
        className={cn(
          'lg:w-2/5 bg-slate-50 flex flex-col items-center justify-center px-8 py-12 lg:py-0 transition-all duration-700',
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
        style={{ transitionDelay: '150ms' }}
      >
        {/* Top label on mobile */}
        <div className="lg:hidden mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B3A5C]/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[#1B3A5C] text-xs font-medium">Monte Cristo, Córdoba</span>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-[#1B3A5C] font-bold text-2xl mb-1">Ingresar a TrustGas</h2>
          <p className="text-slate-500 text-sm mb-8">Accedé con tus credenciales o tu identidad digital.</p>

          {/* CIDI button */}
          <button
            onClick={handleCidi}
            disabled={cidiLoading || loading}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 text-sm font-semibold hover:border-[#2E75B6] hover:shadow-md transition-all mb-2 disabled:opacity-60 group shadow-sm"
          >
            {cidiLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#2E75B6] shrink-0" />
            ) : (
              <CidiLogoImg />
            )}
            <span className="flex-1 text-left">
              {cidiLoading ? 'Conectando con CIDI…' : 'Ingresar con CIDI Córdoba'}
            </span>
            {!cidiLoading && (
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2E75B6] transition-colors" />
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400 mb-6">
            Integración propuesta — identidad digital provincial de Córdoba
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs">o ingresá con usuario</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5 uppercase tracking-wide">
                Correo electrónico
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/20 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#2E75B6] focus:ring-2 focus:ring-[#2E75B6]/20 transition-all shadow-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || cidiLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1B3A5C] rounded-xl text-white text-sm font-bold hover:bg-[#2E75B6] transition-all disabled:opacity-60 shadow-lg shadow-[#1B3A5C]/20 mt-1"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Ingresando…</>
              ) : (
                <>Ingresar <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-[11px] mt-6">
            Demo PoC · Cualquier credencial es válida
          </p>
        </div>

        {/* Bottom branding on right panel */}
        <div className="hidden lg:flex items-center gap-2 mt-12 text-slate-400 text-xs">
          <div className="w-5 h-5 bg-[#1B3A5C] rounded flex items-center justify-center">
            <Flame className="w-3 h-3 text-white" />
          </div>
          TrustGas · Monte Cristo, Córdoba
        </div>
      </div>
    </div>
  )
}

function CidiLogoImg() {
  return (
    <img
      src={cidiLogo}
      alt="CIDI Córdoba"
      className="w-6 h-6 object-contain shrink-0"
    />
  )
}

