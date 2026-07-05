import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useCartStore from '../../store/cartStore'

export default function Header() {
  const { cart, openDrawer } = useCartStore()
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/shop', label: 'Shop All' },
    { to: '/shop?cat=t-shirts', label: 'T-Shirts' },
    { to: '/shop?cat=gym-wear', label: 'Gym Wear' },
    { to: '/shop?cat=shorts', label: 'Shorts' },
  ]

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(12, 12, 12, 0.85)' : 'rgba(12, 12, 12, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(141, 198, 99, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 60px',
            height: scrolled ? 68 : 80,
            maxWidth: 1600,
            margin: '0 auto',
            transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="header-container"
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/images/logo.jpg"
                alt="BYH Collectives Logo"
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 2,
                  objectFit: 'cover',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              />
              <span style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, background: '#8dc63f', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                BYH
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.24em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                Collectives
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 40,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  padding: '8px 0',
                  transition: 'color 0.3s ease',
                  fontFamily: 'Outfit, sans-serif',
                })}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeHeaderNav"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: '#8dc63f',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* Cart Icon Button */}
            <button
              onClick={openDrawer}
              aria-label="Open cart"
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#8dc63f')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
            >
              <ShoppingBag size={22} strokeWidth={1.8} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: 1,
                      right: 1,
                      background: '#8dc63f',
                      color: '#000',
                      fontSize: 9,
                      fontWeight: 900,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger for Mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                padding: 4,
              }}
              className="hamburger-btn"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                overflow: 'hidden',
                background: '#0c0c0c',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(141, 198, 99, 0.2)',
              }}
            >
              <div style={{ padding: '16px 32px 32px' }}>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.exact}
                      onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({
                        display: 'block',
                        padding: '16px 0',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        color: isActive ? '#8dc63f' : 'rgba(255, 255, 255, 0.7)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        fontFamily: 'Outfit, sans-serif',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Media queries */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .header-container { padding: 0 28px !important; }
        }
      `}</style>
    </>
  )
}
