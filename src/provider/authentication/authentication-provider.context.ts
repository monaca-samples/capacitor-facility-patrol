import { createContext } from 'react'

import { AuthenticationContextType } from './authentication-provider.types'

export const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined)
