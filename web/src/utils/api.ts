export const api =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3333'
    : process.env.BACKEND_URL
