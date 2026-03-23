// Minimal JWT decoder (no verification) to read name/picture from payload
export function decodeJWT(token) {
  try {
    const [, payload] = token.split('.')
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return json
  } catch {
    return null
  }
}
