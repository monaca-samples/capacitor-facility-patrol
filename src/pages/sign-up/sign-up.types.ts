export interface SignUpProps {
  signUp: (email: string, password: string, name: string) => Promise<void>
  errorMessage?: string
  loading: boolean
}
