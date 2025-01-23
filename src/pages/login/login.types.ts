export interface LoginProps {
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>
  loading: boolean
  errorMessage?: string
}
