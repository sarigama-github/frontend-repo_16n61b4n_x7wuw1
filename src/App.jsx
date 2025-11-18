import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Shield, Lock, ArrowRight, Menu, Moon, Sun, CheckCircle2, MessageCircle, Bell, ArrowUpRight } from 'lucide-react'

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
    <header className="fixed top-0 inset-x-0 z-[80]">
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
            <a className="text-slate-300 hover:text-white transition" href="#partners">Partners</a>
            <a className="text-slate-300 hover:text-white transition" href="#bot">CyberNews Bot</a>
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

function EarthHero() {
  const [scroll, setScroll] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      setScroll(y)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fade Earth as user scrolls past 40vh
  const fadeStart = 0
  const fadeEnd = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600
  const opacity = 1 - Math.min(1, Math.max(0, (scroll - fadeStart) / (fadeEnd - fadeStart)))

  // Parallax translate for depth
  const translateY = Math.min(0, -scroll * 0.1)
  const rotate = scroll * 0.02

  return (
    <section className="relative h-[90vh] min-h-[640px] overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 starfield" />

      {/* Huge Earth */}
      <div
        ref={containerRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity, transform: `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotate}deg)` }}
      >
        <div className="relative">
          <div className="earth-mask">
            <div
              className="h-[120vmin] w-[120vmin] rounded-full earth-rotate"
              style={{
                backgroundImage: `radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0) 65%, rgba(2,6,23,1) 100%), url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                boxShadow: '0 0 120px rgba(16,185,129,0.25), inset -40px -40px 120px rgba(2,6,23,0.8)'
              }}
            />
          </div>
          {/* Atmospheric glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full blur-3xl" style={{
            background: 'radial-gradient(60% 60% at 50% 50%, rgba(16,185,129,0.25), rgba(16,185,129,0) 70%)'
          }} />
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 text-brand px-3 py-1 text-xs mb-6">
            <span className="inline-flex items-center gap-1"><Lock className="w-3.5 h-3.5"/> Zero-Trust Ready</span>
            <span className="text-slate-400">•</span>
            <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> SOC2 Compliant</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            Modern cybersecurity for a connected world
          </h1>
          <p className="mt-5 text-lg text-slate-300 leading-relaxed max-w-xl">
            A planetary‑scale defense layer: detect, isolate, and neutralize threats in seconds.
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
        </div>
      </div>

      {/* Bottom gradient fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-slate-950" />
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

function Partners() {
  const logos = useMemo(() => [
    { name: 'Sentra', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" className="font-semibold" fontSize="18">Sentra</text></svg>
    )},
    { name: 'OctaNet', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" fontSize="18">OctaNet</text></svg>
    )},
    { name: 'Nimbus', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" fontSize="18">Nimbus</text></svg>
    )},
    { name: 'VectorX', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" fontSize="18">VectorX</text></svg>
    )},
    { name: 'Cloudly', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" fontSize="18">Cloudly</text></svg>
    )},
    { name: 'Cortec', svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto fill-current"><text x="0" y="18" fontSize="18">Cortec</text></svg>
    )},
  ], [])

  // Duplicate to create seamless loop
  const row = [...logos, ...logos]

  return (
    <section id="partners" className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Trusted by modern teams</h2>
          <div className="h-px flex-1 mx-6 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-xs text-slate-400">Partners</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

          <div className="flex gap-12 whitespace-nowrap px-6 py-6 marquee-left">
            {row.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand grid place-items-center font-semibold">{logo.name[0]}</div>
                <div className="text-slate-300/80">
                  <div className="h-6 w-auto opacity-80">
                    {logo.svg}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CyberNewsBot() {
  return (
    <section id="bot" className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand/30 via-emerald-400/10 to-transparent blur-2xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-brand" /> WhatsApp Bot
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">Get real‑time CyberNews alerts on WhatsApp</h3>
              <p className="mt-3 text-slate-300">Daily threat briefs, breaking CVEs, and mitigation tips sent straight to your phone. Opt‑in, zero spam, unsubscribe anytime.</p>

              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                <li className="inline-flex items-center gap-2"><Bell className="w-4 h-4 text-brand" /> Priority alerts for critical vulnerabilities</li>
                <li className="inline-flex items-center gap-2"><Lock className="w-4 h-4 text-brand" /> Privacy‑first, end‑to‑end encrypted delivery</li>
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/15551234567?text=Subscribe%20me%20to%20AegisGuard%20CyberNews" target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-brand text-slate-900 font-semibold hover:brightness-110 transition"
                >
                  Open WhatsApp
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
                <a href="#" className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-white/10 text-slate-200 hover:text-white hover:border-white/20 transition">
                  Learn how it works
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-slate-900/50 p-6 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-2xl bg-brand/15 text-brand grid place-items-center">
                    <MessageCircle className="w-10 h-10" />
                  </div>
                  <p className="mt-4 text-slate-300">Scan to subscribe</p>
                  <div className="mt-3 inline-flex rounded-lg bg-white p-2">
                    {/* Simple placeholder QR composed of squares */}
                    <div className="h-28 w-28 bg-[linear-gradient(90deg,#000_10px,transparent_10px),linear-gradient(#000_10px,transparent_10px)] [background-size:14px_14px]" />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand/10 to-transparent blur-xl" />
            </div>
          </div>
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
        <EarthHero />
        <Features />
        <Partners />
        <CyberNewsBot />
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
