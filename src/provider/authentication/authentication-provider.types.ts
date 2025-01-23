import { User } from '@capacitor-firebase/authentication'
import { AuthState } from '@/types/auth-state'

export interface AuthenticationContextType {
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<User | null>
  signUp: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  user: User
  loading: boolean
  authState: AuthState
  errorMessage?: string
}
