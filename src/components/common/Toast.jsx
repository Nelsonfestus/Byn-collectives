import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 2800)
      return () => clearTimeout(timer)
    }
  }, [visible, onHide])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#111',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: 4,
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '1px',
            borderLeft: '4px solid #8dc63f',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            whiteSpace: 'nowrap',
            zIndex: 9999,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
