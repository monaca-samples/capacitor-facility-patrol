import { useContext } from 'react'

import { AuthenticationContext } from '@/provider/authentication/authentication-provider.context'

/**
 * Hook to use the Authentication context in components.
 */
export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)
  if (context === undefined) {
    throw new Error(
      'useAuthentication must be used within a AuthenticationProvider'
    )
  }
  return context
}
