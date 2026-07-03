import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, RotateCcw, ShieldCheck, Sparkles, Send } from 'lucide-react'
import { subscribeNewsletter } from '../../lib/formspree'

function FooterCol({ heading, links }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'Outfit, sans-serif' }}>
        {heading}
      </p>
      {links.map((l) => (
        <Link
          key={l.label}
          to={l.to}
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 12, transition: 'color 0.25s' }}
          onMouseEnter={(e) => (e.target.style.color = '#fff')}
          onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.5)')}
        >
          {l.label}
        </Link>
      ))}
    </div>
  )
}

function TrustBadge({ icon: Icon, title, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, minWidth: 220 }}>
      <div
        style={{
          flexShrink: 0,
          width: 52,
          height: 52,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8dc63f',
        }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 4px', letterSpacing: '0.02em', fontFamily: 'Outfit, sans-serif' }}>{title}</p>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('')

  async function handleNewsletter(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const result = await subscribeNewsletter(email)
    setStatus(result.ok ? 'success' : 'error')
    setMsg(result.message)
    if (result.ok) setEmail('')
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <>
      {/* Premium Trust Badges */}
      <section
        style={{
          background: '#0c0c0c',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '48px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          maxWidth: 1600,
          margin: '0 auto',
          width: '100%',
        }}
        className="footer-trust"
      >
        <TrustBadge icon={Truck} title="Free Delivery" desc="On orders above ₦50,000" />
        <div style={{ width: 1, height: 48, background: 'rgba(255, 255, 255, 0.08)' }} className="trust-divider" />
        <TrustBadge icon={RotateCcw} title="Returns Window" desc="14-day exchange period" />
        <div style={{ width: 1, height: 48, background: 'rgba(255, 255, 255, 0.08)' }} className="trust-divider" />
        <TrustBadge icon={ShieldCheck} title="Secure Checkout" desc="Via verified channels" />
        <div style={{ width: 1, height: 48, background: 'rgba(255, 255, 255, 0.08)' }} className="trust-divider" />
        <TrustBadge icon={Sparkles} title="Built to Last" desc="Premium weight fabrics" />
      </section>

      {/* Main Footer */}
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.02)', padding: '80px 60px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1.2fr',
            gap: 60,
            paddingBottom: 64,
            maxWidth: 1600,
            margin: '0 auto',
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', marginBottom: 24 }}>
              <img
                src="/images/logo.jpg"
                alt="BYN Collectives"
                style={{
                  height: 38,
                  width: 38,
                  borderRadius: 2,
                  objectFit: 'cover',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: '#fff', letterSpacing: '0.12em', fontFamily: 'Outfit, sans-serif' }}>BYN</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.24em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>Collectives</span>
              </div>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 260 }}>
              High-end training essentials and street comfort. Cut clean, built heavy, designed for standard performance.
            </p>
          </div>

          {/* Catalog Col */}
          <FooterCol
            heading="Catalog"
            links={[
              { label: 'All Apparel', to: '/shop' },
              { label: 'T-Shirts & Hoodies', to: '/shop?cat=t-shirts' },
              { label: 'Gym Wear', to: '/shop?cat=gym-wear' },
              { label: 'Shorts & Bottoms', to: '/shop?cat=shorts' },
            ]}
          />

          {/* Support Col */}
          <FooterCol
            heading="Support"
            links={[
              { label: 'FAQs', to: '/shop' },
              { label: 'Size Chart', to: '/shop' },
              { label: 'Exchanges', to: '/shop' },
              { label: 'Contact', to: '/shop' },
            ]}
          />

          {/* Newsletter Col */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'Outfit, sans-serif' }}>
              Newsletter
            </p>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', marginBottom: 22, lineHeight: 1.5 }}>
              Receive exclusive drop notifications, product restocks, and limited edition items.
            </p>
            <form onSubmit={handleNewsletter}>
              <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 4 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#fff',
                    fontSize: 13.5,
                    padding: '8px 0',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: 'none',
                    color: '#8dc63f',
                    border: 'none',
                    padding: '0 8px',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                >
                  <Send size={16} />
                </button>
              </div>
              {status && status !== 'loading' && (
                <p style={{ fontSize: 12, color: status === 'success' ? '#8dc63f' : '#ff5555', marginTop: 12 }}>
                  {msg}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '28px 0',
            textAlign: 'center',
            maxWidth: 1600,
            margin: '0 auto',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} BYN Collectives. Engineered in Nigeria. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Footer responsive hacks */}
      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 48px 32px !important; }
          .footer-trust { padding: 40px 28px !important; gap: 24px !important; }
          .trust-divider { display: none !important; }
          footer { padding: 60px 28px 0 !important; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
