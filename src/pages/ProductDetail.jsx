import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check, ArrowLeft, ShieldCheck, Truck, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import products from '../data/products.json'
import useCartStore from '../store/cartStore'
import ProductCard from '../components/product/ProductCard'
import { formatOrderMessage, WHATSAPP_NUMBER } from '../lib/whatsapp'

function AccordionTab({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: 12.5,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 24, fontSize: 13.5, color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetail({ onToast }) {
  const { id } = useParams()
  const { addToCart } = useCartStore()

  const product = products.find((p) => p.id.toString() === id)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [added, setAdded] = useState(false)
  const [activeColorIdx, setActiveColorIdx] = useState(0)

  const hasColors = product?.colors && product.colors.length > 0
  const activeColor = hasColors ? product.colors[activeColorIdx] : null

  const currentDefault = activeColor ? activeColor.default : product?.images.default
  const currentHover = activeColor ? activeColor.hover : product?.images.hover

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[1] || product.sizes?.[0] || 'M')
      const defaultImg = product.colors && product.colors.length > 0
        ? product.colors[0].default
        : product.images.default
      setSelectedImage(defaultImg)
      setActiveColorIdx(0)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [product])

  if (!product) {
    return (
      <div style={{ padding: '100px 24px', textAlign: 'center', minHeight: '60vh', background: '#0c0c0c', color: '#fff' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, marginBottom: 16 }}>Product Not Found</h2>
        <Link to="/shop" style={{ background: '#8dc63f', color: '#000', padding: '12px 24px', textDecoration: 'none', fontWeight: 700 }}>
          Back to Catalog
        </Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => {
      if (p.id === product.id) return false
      const pCats = Array.isArray(p.category) ? p.category : [p.category]
      const prodCats = Array.isArray(product.category) ? product.category : [product.category]
      return pCats.some((c) => prodCats.includes(c))
    })
    .slice(0, 4)

  function handleAddToCart() {
    const itemToAdd = activeColor
      ? {
          ...product,
          id: `${product.id}-${activeColor.name.toLowerCase()}`,
          name: `${product.name} — ${activeColor.name}`,
          images: { default: activeColor.default }
        }
      : product
    addToCart(itemToAdd, selectedSize)
    setAdded(true)
    onToast(`🛒 Added ${itemToAdd.name} (${selectedSize}) to cart`)
    setTimeout(() => setAdded(false), 2000)
  }

  // Quick single product checkout directly via WhatsApp
  function handleWhatsAppQuickCheckout() {
    const itemName = activeColor ? `${product.name} — ${activeColor.name}` : product.name
    const singleItemCart = [{
      name: itemName,
      size: selectedSize,
      qty: 1,
      price: product.price,
      priceNumeric: product.priceNumeric
    }]
    const message = formatOrderMessage(singleItemCart)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ background: '#0c0c0c', minHeight: 'calc(100vh - 80px)', padding: '60px 100px', color: '#fff' }} className="detail-page">
      <title>{`${product.name} — BYH Collectives`}</title>
      <meta name="description" content={product.description} />

      <Link
        to="/shop"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          textDecoration: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 12,
          fontWeight: 700,
          marginBottom: 40,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#fff')}
        onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.5)')}
      >
        <ArrowLeft size={14} /> Back to Catalog
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 72,
          alignItems: 'start',
          marginBottom: 100,
        }}
        className="detail-grid"
      >
        {/* Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              background: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              aspectRatio: '1 / 1.1',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={selectedImage}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnails */}
          {currentHover && (
            <div style={{ display: 'flex', gap: 14 }}>
              <button
                onClick={() => setSelectedImage(currentDefault)}
                style={{
                  width: 72,
                  height: 72,
                  padding: 0,
                  border: selectedImage === currentDefault ? '2px solid #8dc63f' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  background: '#121212',
                }}
              >
                <img src={currentDefault} alt="default view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
              <button
                onClick={() => setSelectedImage(currentHover)}
                style={{
                  width: 72,
                  height: 72,
                  padding: 0,
                  border: selectedImage === currentHover ? '2px solid #8dc63f' : '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  background: '#121212',
                }}
              >
                <img src={currentHover} alt="alternate view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#8dc63f', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 14 }}>
            BYH COLLECTION / {Array.isArray(product.category) ? product.category.map((c) => c.replace('-', ' ')).join(' & ') : product.category.replace('-', ' ')}
          </span>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {product.name}
          </h1>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 32 }}>{product.price}</p>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 32 }} />

          {/* Color Selector */}
          {hasColors && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: 14 }}>
                Select {product.colors?.some(c => c.name === 'Joggers' || c.name === 'Jorts') ? 'Style' : 'Color'}: <span style={{ color: '#8dc63f' }}>{product.colors[activeColorIdx].name}</span>
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {product.colors.map((color, idx) => {
                  const isSelected = activeColorIdx === idx
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setActiveColorIdx(idx)
                        setSelectedImage(color.default)
                      }}
                      title={color.name}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: color.swatch,
                        border: isSelected ? '2.5px solid #8dc63f' : '2.5px solid rgba(255, 255, 255, 0.15)',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        padding: 0,
                        outline: 'none',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          )}

          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: 14 }}>
              Select Size: <span style={{ color: '#8dc63f' }}>{selectedSize}</span>
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      background: isSelected ? '#8dc63f' : 'transparent',
                      color: isSelected ? '#000' : '#fff',
                      border: isSelected ? '1px solid #8dc63f' : '1px solid rgba(255, 255, 255, 0.15)',
                      cursor: 'pointer',
                      borderRadius: 2,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#8dc63f'
                        e.currentTarget.style.color = '#8dc63f'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                        e.currentTarget.style.color = '#fff'
                      }
                    }}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Buttons Area */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 48 }} className="detail-action-buttons">
            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1.2,
                padding: '18px 24px',
                background: added ? '#8dc63f' : '#fff',
                color: '#000',
                border: 'none',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontFamily: 'Outfit, sans-serif',
                transition: 'background 0.3s ease',
              }}
            >
              {added ? <Check size={16} /> : <ShoppingCart size={16} />}
              {added ? 'Added to Cart' : 'Add to Cart'}
            </motion.button>

            {/* WhatsApp Quick buy */}
            <motion.button
              onClick={handleWhatsAppQuickCheckout}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: '18px 24px',
                background: 'transparent',
                color: '#8dc63f',
                border: '1px solid #8dc63f',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#8dc63f'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#8dc63f'
              }}
            >
              Quick Buy Direct
            </motion.button>
          </div>

          {/* Accordion specs list */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: 20 }}>
            <AccordionTab title="Fit &amp; Weight specs">
              This garment is cut from a bespoke custom-knit, double-brushed premium heavy weight athletic fabric (approx 280–310GSM) to ensure structural hold. Fits true to size for a neat look, or size up for a classic oversized streetwear drape.
            </AccordionTab>
            <AccordionTab title="Checkout details &amp; Delivery options">
              We process checkout directly through WhatsApp. Upon hitting checkout, an auto-filled purchase ticket is sent to our sales representative, who will confirm stock levels and share instant bank account information for prompt transfer dispatch.
            </AccordionTab>
            <AccordionTab title="Return &amp; Exchange Guarantee">
              We accept exchanges on unworn, clean garments containing original tag attachments within 14 working days of pickup. Courier or delivery rates for standard return drop-offs are handled by the purchaser.
            </AccordionTab>
          </div>
        </div>
      </div>

      {/* Related Products carousel */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 72 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 36,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Related Items
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
            }}
            className="related-grid"
          >
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onToast} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 960px) {
          .detail-page { padding: 48px 28px !important; }
          .detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .detail-action-buttons { flex-direction: column !important; gap: 12px !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 540px) {
          .detail-page { padding: 32px 20px !important; }
          .detail-page h1 { font-size: 28px !important; }
          .related-grid { gap: 12px !important; }
        }
      `}</style>
    </div>
  )
}
