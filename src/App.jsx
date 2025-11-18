import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Shield, Lock, ArrowRight, Menu, Moon, Sun, CheckCircle2 } from 'lucide-react'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

function Navbar({ theme, setTheme }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand/15 text-brand">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-semibold leading-tight">AegisGuard</p>
              <p className="text-xs text-slate-300/70">Cybersecurity</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-slate-300 hover:text-white transition" href="#solutions">Solutions</a>
            <a className="text-slate-300 hover:text-white transition" href="#platform">Platform</a>
            <a className="text-slate-300 hover:text-white transition" href="#pricing">Pricing</a>
            <a className="text-slate-300 hover:text-white transition" href="#contact">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-slate-200 hover:text-white hover:border-white/20 transition bg-slate-800/50"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-brand" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span className="hidden sm:inline text-xs">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
            </button>

            <button className="inline-flex md:hidden items-center justify-center w-9 h-9 rounded-xl border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative pt-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 text-brand px-3 py-1 text-xs mb-6">
              <span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5"/> Zero-Trust Ready</span>
              <span className="text-slate-400">•</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> SOC2 Compliant</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Modern cybersecurity for a connected world
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Protect identities, data, and infrastructure with an AI-augmented security platform. Real-time threat detection, automated response, and frictionless compliance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-brand text-slate-900 font-semibold shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="#platform" className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition">
                Explore the platform
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {["99.99% uptime", "24/7 monitoring", "1M+ identities"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                  <p className="text-sm text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden">
            <Spline scene="https://prod.spline.design/mwBbOy4jrazr59EO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />, title: 'Threat Intelligence', desc: 'Continuously learns from global signals to detect and block emerging attacks.'
    },
    {
      icon: <Lock className="w-5 h-5" />, title: 'Zero-Trust Access', desc: 'Verify every request with adaptive policies and identity-aware controls.'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />, title: 'Automated Compliance', desc: 'Built-in controls and reports for SOC2, ISO 27001, HIPAA, and more.'
    },
  ]

  return (
    <section id="platform" className="relative py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_50%_100%,rgba(16,185,129,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 hover:border-brand/40 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand/15 text-brand">{f.icon}</div>
                <h3 className="text-white font-semibold">{f.title}</h3>
              </div>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand/30 via-emerald-400/10 to-transparent blur-2xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white">Ready to raise your security posture?</h2>
              <p className="mt-3 text-slate-300">Talk to our experts and get a tailored risk assessment for your organization.</p>
            </div>
            <form className="grid sm:grid-cols-3 gap-3">
              <input className="col-span-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/50" placeholder="Work email" />
              <button className="rounded-xl bg-brand text-slate-900 font-semibold px-5 py-3 hover:brightness-110 transition">Request demo</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100">
      <Navbar theme={theme} setTheme={setTheme} />

      <main>
        <Hero />
        <Features />
        <CTA />

        <footer className="py-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} AegisGuard Security. All rights reserved.</p>
            <div className="flex items-center gap-3 text-sm">
              <a href="#privacy" className="text-slate-400 hover:text-white">Privacy</a>
              <span className="text-slate-600">•</span>
              <a href="#terms" className="text-slate-400 hover:text-white">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
