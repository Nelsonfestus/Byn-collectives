import { motion } from 'framer-motion'

const CATEGORIES = [
  { key: 'all', label: 'All Items' },
  { key: 't-shirts', label: 'T-Shirts & Hoodies' },
  { key: 'gym-wear', label: 'Gym Wear' },
  { key: 'shorts', label: 'Shorts & Bottoms' },
]

export default function ProductFilters({ activeFilter, onFilter }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
      {CATEGORIES.map((cat) => {
        const isActive = activeFilter === cat.key
        return (
          <motion.button
            key={cat.key}
            onClick={() => onFilter(cat.key)}
            whileHover={{ y: -1, borderColor: isActive ? '#8dc63f' : 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: isActive ? '#8dc63f' : '#121212',
              color: isActive ? '#000' : 'rgba(255,255,255,0.7)',
              border: isActive ? '1px solid #8dc63f' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 28px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 2,
              transition: 'background 0.3s, color 0.3s, border-color 0.3s',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            {cat.label}
          </motion.button>
        )
      })}
    </div>
  )
}
