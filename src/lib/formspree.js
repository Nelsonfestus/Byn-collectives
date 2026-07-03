const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdkgnwpv'

/**
 * Submits newsletter email to Formspree via AJAX.
 * @param {string} email - User's email address
 * @returns {Promise<{ok: boolean, message: string}>}
 */
export async function subscribeNewsletter(email) {
  try {
    const formData = new FormData()
    formData.append('email', email)

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })

    if (response.ok) {
      return { ok: true, message: 'Thanks for joining! 🎉' }
    } else {
      return { ok: false, message: 'Something went wrong. Please try again.' }
    }
  } catch {
    return { ok: false, message: 'Network error. Please try again.' }
  }
}
