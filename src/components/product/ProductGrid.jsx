import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, onAddToCart }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32,
      }}
      className="product-grid"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1200px) { .product-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; } }
        @media (max-width: 768px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; } }
        @media (max-width: 440px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; } }
      `}</style>
    </div>
  )
}
