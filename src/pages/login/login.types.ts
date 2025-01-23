export interface LoginProps {
  login: (email: string, password: string) => Promise<void>
  loading: boolean
  errorMessage?: string
}
