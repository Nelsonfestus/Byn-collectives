import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import useCartStore from '../../store/cartStore'
import { checkoutViaWhatsApp } from '../../lib/whatsapp'

export default function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, removeFromCart, updateQty } = useCartStore()
  const total = cart.reduce((sum, i) => sum + i.priceNumeric * i.qty, 0)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="cart-overlay"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              zIndex: 998,
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 38 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(440px, 100vw)',
              height: '100vh',
              background: '#0c0c0c',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
              color: '#fff',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 28px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: '#0a0a0a',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShoppingBag size={18} style={{ color: '#8dc63f' }} />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  Shopping Bag
                </span>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
              {cart.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'rgba(255, 255, 255, 0.3)',
                    gap: 18,
                  }}
                >
                  <ShoppingBag size={44} strokeWidth={1} />
                  <p style={{ fontSize: 13, letterSpacing: '0.04em' }}>Your bag is currently empty.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 18,
                        padding: '20px 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 72,
                          height: 72,
                          objectFit: 'cover',
                          borderRadius: 2,
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          flexShrink: 0,
                          background: '#121212',
                        }}
                      />

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 4,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontFamily: 'Outfit, sans-serif',
                            color: '#fff',
                          }}
                        >
                          {item.name}
                        </p>
                        <p style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.4)', marginBottom: 10 }}>
                          Size: {item.size} · {item.price}
                        </p>
                        
                        {/* Qty edit buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <button
                            onClick={() => updateQty(item.key, item.qty - 1)}
                            style={{
                              width: 24,
                              height: 24,
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              background: 'transparent',
                              color: '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fff')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={10} />
                          </button>
                          <span style={{ fontSize: 12.5, fontWeight: 700, minWidth: 22, textAlign: 'center' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.key, item.qty + 1)}
                            style={{
                              width: 24,
                              height: 24,
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              background: 'transparent',
                              color: '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fff')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                            aria-label="Increase quantity"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${item.name}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255, 255, 255, 0.3)',
                          cursor: 'pointer',
                          padding: 6,
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 0.25s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff5555')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)')}
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            <div
              style={{
                padding: '24px 28px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: '#0a0a0a',
              }}
            >
              {cart.length > 0 ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 14,
                      fontWeight: 800,
                      marginBottom: 20,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    <span>Subtotal</span>
                    <span style={{ color: '#8dc63f' }}>₦{total.toLocaleString('en-NG')}</span>
                  </div>
                  
                  <motion.button
                    onClick={() => checkoutViaWhatsApp(cart)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: '#8dc63f',
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
                      gap: 12,
                      fontFamily: 'Outfit, sans-serif',
                      boxShadow: '0 4px 20px rgba(141,198,63,0.35)',
                    }}
                  >
                    {/* WhatsApp Icon SVG */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.118 1.528 5.845L0 24l6.335-1.509A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.724.887.934-3.618-.235-.372A9.818 9.818 0 1112 21.818z"/>
                    </svg>
                    Send Order on Chat
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={closeDrawer}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 2,
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontFamily: 'Outfit, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#fff'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  }}
                >
                  Continue Browsing <ArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
