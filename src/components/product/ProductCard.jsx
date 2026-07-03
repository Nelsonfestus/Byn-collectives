import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import useCartStore from '../../store/cartStore'

export default function ProductCard({ product, onAddToCart }) {
  const { addToCart } = useCartStore()
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  function handleQuickAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    // Default size is the second size (e.g. M)
    addToCart(product, product.sizes?.[1] || 'M')
    setAdded(true)
    onAddToCart?.(`🛒 Added ${product.name} to cart`)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: '#0c0c0c',
        }}
      >
        {/* Link Wrap */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          
          {/* Image Container with Zoom effect */}
          <div
            className="image-zoom-container"
            style={{
              position: 'relative',
              background: '#121212',
              aspectRatio: '1 / 1.1',
              overflow: 'hidden',
              border: hovered ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Main default image */}
            <motion.img
              src={product.images.default}
              alt={product.name}
              loading="lazy"
              className="image-zoom-img"
              animate={{ opacity: hovered && product.images.hover ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Alternative hover image */}
            {product.images.hover && (
              <motion.img
                src={product.images.hover}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="image-zoom-img"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            )}

            {/* Size availability overlay on hover (Desktop only) */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="desktop-hover-overlay"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(12, 12, 12, 0.9)',
                    backdropFilter: 'blur(8px)',
                    padding: '12px 14px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 9, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px', fontFamily: 'Outfit, sans-serif' }}>
                      AVAILABLE SIZES
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '0.05em' }}>
                      {product.sizes.join(' · ')}
                    </p>
                  </div>

                  {/* Desktop Quick Add Action */}
                  <button
                    onClick={handleQuickAdd}
                    disabled={added}
                    style={{
                      width: 32,
                      height: 32,
                      background: added ? '#8dc63f' : '#fff',
                      color: '#000',
                      border: 'none',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      if (!added) e.currentTarget.style.background = '#8dc63f'
                    }}
                    onMouseLeave={(e) => {
                      if (!added) e.currentTarget.style.background = '#fff'
                    }}
                    aria-label="Quick Add to Cart"
                  >
                    {added ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Area (Title & price + mobile quick action triggers) */}
          <div style={{ padding: '14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: hovered ? '#8dc63f' : '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 6px',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'color 0.3s ease',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.name}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 10px' }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                  {product.price}
                </span>
                <span 
                  className="mobile-sizes-tag" 
                  style={{ 
                    fontSize: 10, 
                    color: '#8dc63f', 
                    letterSpacing: '0.05em', 
                    fontWeight: 600,
                    display: 'none'
                  }}
                >
                  [{product.sizes.join('/')}]
                </span>
              </div>
            </div>

            {/* Mobile Touch Quick Add Button */}
            <button
              className="mobile-quick-add-btn"
              onClick={handleQuickAdd}
              disabled={added}
              style={{
                display: 'none',
                width: 32,
                height: 32,
                background: added ? '#8dc63f' : 'rgba(255, 255, 255, 0.05)',
                color: added ? '#000' : '#fff',
                border: added ? '1px solid #8dc63f' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              aria-label="Quick Add"
            >
              {added ? <Check size={12} /> : <Plus size={12} />}
            </button>
          </div>
        </Link>
      </motion.div>

      {/* Mobile styling overrides */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-hover-overlay {
            display: none !important;
          }
          .mobile-sizes-tag {
            display: inline-block !important;
          }
          .mobile-quick-add-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
