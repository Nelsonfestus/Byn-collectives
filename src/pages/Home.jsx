import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/product/ProductCard'

// ─── Refined Hero ────────────────────────────────────────────────────────────
function Hero({ onToast }) {
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#121212',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '80px 100px',
        minHeight: 520,
        gap: 60,
      }}
      className="hero-section"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ flex: 1, maxWidth: 500 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.2)', padding: '6px 12px', borderRadius: 2, marginBottom: 24 }}>
          <Sparkles size={12} style={{ color: '#8dc63f' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
            NEW REFINEMENT DROP
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 62px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            margin: '0 0 24px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          Repeat.<br />
          Refine.<br />
          <span style={{ color: '#8dc63f' }}>Result.</span>
        </h1>
        
        <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.7, marginBottom: 40, maxWidth: 380, fontWeight: 300 }}>
          High-end training essentials and street comfort. Cut clean, built heavy, and engineered for standard athletic movement.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link
            to="/shop"
            style={{
              background: '#8dc63f',
              color: '#000',
              padding: '16px 32px',
              fontSize: 12.5,
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: '1px solid #8dc63f',
              borderRadius: 2,
              display: 'inline-block',
              fontFamily: 'Outfit, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#8dc63f'
              e.target.style.color = '#000'
            }}
          >
            Explore Shop
          </Link>
          <Link
            to="/shop?cat=gym-wear"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
              paddingBottom: 4,
            }}
            onMouseEnter={(e) => (e.target.style.borderBottomColor = '#8dc63f')}
            onMouseLeave={(e) => (e.target.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)')}
          >
            Gym Collection
          </Link>
        </div>
      </motion.div>

      {/* Right Column: Hero Banner Banner Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ flex: 1.1, display: 'flex', justifyContent: 'center', position: 'relative' }}
      >
        <div
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 24,
            maxWidth: 480,
            width: '100%',
          }}
        >
          <img
            src="/images/hero_banner.jpg"
            alt="BYH Collectives Lookbook"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', filter: 'brightness(0.9)' }}
          />
          {/* Decorative tag overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              background: '#8dc63f',
              color: '#000',
              fontSize: 11,
              fontWeight: 800,
              padding: '6px 12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            SEASON ONE
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 960px) {
          .hero-section { flex-direction: column !important; padding: 50px 32px !important; gap: 40px !important; }
        }
        @media (max-width: 540px) {
          .hero-section { padding: 40px 20px !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Refined Category Card ───────────────────────────────────────────────────
function CategoryCard({ to, label, image }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        background: '#121212',
        border: hovered ? '1px solid #8dc63f' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: hovered ? '0 10px 30px rgba(141,198,63,0.1)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ padding: '40px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, overflow: 'hidden' }}>
        <img
          src={image}
          alt={label}
          loading="lazy"
          style={{
            width: '100%',
            maxWidth: 200,
            height: 'auto',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'brightness(0.95)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#0e0e0e',
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: hovered ? '#8dc63f' : '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            transition: 'color 0.3s ease',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 18,
            color: hovered ? '#8dc63f' : 'rgba(255,255,255,0.3)',
            transform: hovered ? 'translateX(4px)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          →
        </span>
      </div>
    </Link>
  )
}

// ─── Refined Featured Carousel ───────────────────────────────────────────────
function FeaturedCarousel({ onToast }) {
  const trackRef = useRef(null)
  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  return (
    <section style={{ padding: '80px 100px', background: '#0c0c0c' }} className="featured-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>
            HIGHLIGHTED PIECES
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Featured Apparel
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            style={{
              width: 48,
              height: 48,
              background: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8dc63f'; e.currentTarget.style.color = '#8dc63f' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            style={{
              width: 48,
              height: 48,
              background: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8dc63f'; e.currentTarget.style.color = '#8dc63f' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 32,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            paddingBottom: 16,
          }}
          className="scrollbar-hide"
        >
          {products.map((p) => (
            <div key={p.id} style={{ flex: '0 0 280px' }}>
              <ProductCard product={p} onAddToCart={onToast} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .featured-section { padding: 50px 32px !important; }
        }
        @media (max-width: 540px) {
          .featured-section { padding: 40px 20px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Home Component ──────────────────────────────────────────────────────────
export default function Home({ onToast }) {
  const categoryImages = {
    't-shirts': products.find((p) => p.category === 't-shirts')?.images.default,
    'gym-wear': products.find((p) => p.category === 'gym-wear')?.images.default,
    'shorts': products.find((p) => p.category === 'shorts')?.images.default,
  }

  return (
    <div style={{ background: '#0c0c0c' }}>
      <title>BYH Collectives — Repeat. Refine. Result.</title>
      <meta name="description" content="BYH Collectives — premium athletic streetwear engineered for movement. Shop T-Shirts, Gym Wear, and Shorts." />

      <Hero onToast={onToast} />

      {/* Categories Grid Section */}
      <section style={{ padding: '80px 100px', background: '#0a0a0a' }} className="categories-section">
        <div style={{ marginBottom: 44 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>
            PRODUCT SECTIONS
          </p>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              margin: 0,
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Explore Collections
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="cat-grid">
          <CategoryCard to="/shop?cat=t-shirts" label="T-Shirts & Hoodies" image={categoryImages['t-shirts']} />
          <CategoryCard to="/shop?cat=gym-wear" label="Gym Apparel" image={categoryImages['gym-wear']} />
          <CategoryCard to="/shop?cat=shorts" label="Shorts & Jorts" image={categoryImages['shorts']} />
        </div>
      </section>

      <FeaturedCarousel onToast={onToast} />

      <style>{`
        @media (max-width: 960px) {
          .categories-section { padding: 50px 32px !important; }
          .cat-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 540px) {
          .categories-section { padding: 40px 20px !important; }
        }
      `}</style>
    </div>
  )
}
