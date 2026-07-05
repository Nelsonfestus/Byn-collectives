import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isDrawerOpen: false,

      // Open / close the cart drawer
      openDrawer: () => {
        set({ isDrawerOpen: true })
        document.body.classList.add('drawer-open')
      },
      closeDrawer: () => {
        set({ isDrawerOpen: false })
        document.body.classList.remove('drawer-open')
      },

      // Add item to cart — increments qty if same id+size combo exists
      addToCart: (product, size = 'M') => {
        const { cart } = get()
        const key = `${product.id}-${size}`
        const existing = cart.find((i) => i.key === key)

        if (existing) {
          set({
            cart: cart.map((i) =>
              i.key === key ? { ...i, qty: i.qty + 1 } : i
            ),
          })
        } else {
          set({
            cart: [
              ...cart,
              {
                key,
                id: product.id,
                name: product.name,
                price: product.price,
                priceNumeric: product.priceNumeric,
                image: product.images.default,
                size,
                qty: 1,
              },
            ],
          })
        }
      },

      // Remove one item (decrement or remove entirely)
      removeFromCart: (key) => {
        const { cart } = get()
        set({ cart: cart.filter((i) => i.key !== key) })
      },

      // Update quantity for a specific item
      updateQty: (key, qty) => {
        const { cart } = get()
        if (qty <= 0) {
          set({ cart: cart.filter((i) => i.key !== key) })
        } else {
          set({
            cart: cart.map((i) => (i.key === key ? { ...i, qty } : i)),
          })
        }
      },

      // Clear all items
      clearCart: () => set({ cart: [] }),

      // Computed total item count
      get cartCount() {
        return get().cart.reduce((sum, i) => sum + i.qty, 0)
      },

      // Computed total price
      get cartTotal() {
        return get().cart.reduce(
          (sum, i) => sum + i.priceNumeric * i.qty,
          0
        )
      },
    }),
    {
      name: 'byh-cart', // localStorage key
      partialize: (state) => ({ cart: state.cart }), // only persist cart array
    }
  )
)

export default useCartStore
