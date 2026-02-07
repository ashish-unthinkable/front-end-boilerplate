export interface User {
  _id: string
  email: string
  provider: 'local' | 'google'
}
