import { User } from '@capacitor-firebase/authentication'

export interface AuthenticationContextType {
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<User | null>
  signUp: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  user?: User | null
  loading: boolean
  errorMessage?: string
}
