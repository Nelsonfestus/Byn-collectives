import { useSearchParams } from 'react-router-dom'
import products from '../data/products.json'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'

export default function Shop({ onToast }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'

  // Filter products based on search param
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory)

  function handleFilterChange(category) {
    if (category === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ cat: category })
    }
  }

  return (
    <div style={{ background: '#0c0c0c', minHeight: 'calc(100vh - 80px)', padding: '80px 100px' }} className="shop-page">
      <title>Shop — BYN Collectives</title>
      <meta name="description" content="Browse the full catalog of BYN Collectives. High-end athletic and street fitness apparel." />

      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#8dc63f', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>
          BYN CATALOG
        </p>
        <h1
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          All Apparel
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.5)', margin: 0, maxWidth: 520, fontWeight: 300, lineHeight: 1.6 }}>
          Premium heavyweight cuts designed for gym training, running performance, and off-duty streetwear.
        </p>
      </div>

      {/* Filter Tabs */}
      <ProductFilters activeFilter={activeCategory} onFilter={handleFilterChange} />

      {/* Results Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)', margin: 0 }}>
          FILTERED RESULTS:
        </p>
        <span style={{ height: 1, flex: 1, background: 'rgba(255, 255, 255, 0.08)' }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#8dc63f', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.05em' }}>
          {filteredProducts.length} ITEMS AVAILABLE
        </span>
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} onAddToCart={onToast} />

      <style>{`
        @media (max-width: 960px) {
          .shop-page { padding: 50px 32px !important; }
        }
        @media (max-width: 540px) {
          .shop-page { padding: 40px 20px !important; }
          .shop-page h1 { font-size: 32px !important; }
        }
      `}</style>
    </div>
  )
}
