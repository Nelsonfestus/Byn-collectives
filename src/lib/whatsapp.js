export const WHATSAPP_NUMBER = '2347079959818'

/**
 * Formats cart items into the BYN Collectives order message string.
 * @param {Array} cart - Array of cart items
 * @returns {string} Formatted order message
 */
export function formatOrderMessage(cart) {
  const lines = cart
    .map((item) => `• ${item.name} (Size: ${item.size} × ${item.qty}) — ${item.price}`)
    .join('\n')

  const total = cart.reduce((sum, i) => sum + i.priceNumeric * i.qty, 0)
  const formattedTotal = `₦${total.toLocaleString('en-NG')}`

  return `Hello BYN Collectives! 👋\n\nI'd like to order the following:\n\n${lines}\n\nTotal: ${formattedTotal}\n\nPlease confirm availability and payment details. Thank you!`
}

/**
 * Opens a WhatsApp conversation with the pre-filled order message.
 * @param {Array} cart - Array of cart items
 */
export function checkoutViaWhatsApp(cart) {
  if (!cart || cart.length === 0) return
  const message = formatOrderMessage(cart)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
