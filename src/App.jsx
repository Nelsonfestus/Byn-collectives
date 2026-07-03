import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'
import Toast from './components/common/Toast'
import ScrollToTop from './components/common/ScrollToTop'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  const [toast, setToast] = useState({ message: '', visible: false })

  function handleToast(message) {
    setToast({ message, visible: true })
  }

  function handleHideToast() {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
        {/* Layout Shell Header */}
        <Header />

        {/* Global Cart Drawer */}
        <CartDrawer />

        {/* Main Content Area */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home onToast={handleToast} />} />
            <Route path="/shop" element={<Shop onToast={handleToast} />} />
            <Route path="/product/:id" element={<ProductDetail onToast={handleToast} />} />
          </Routes>
        </main>

        {/* Layout Shell Footer */}
        <Footer />

        {/* Global Toast Notification */}
        <Toast
          message={toast.message}
          visible={toast.visible}
          onHide={handleHideToast}
        />
      </div>
    </Router>
  )
}
