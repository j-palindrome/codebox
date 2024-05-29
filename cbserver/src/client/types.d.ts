import max from 'max-api'

declare global {
  interface Window {
    max: max
  }
}
