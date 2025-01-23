import { RouteProps } from 'react-router'

import { User } from '@capacitor-firebase/authentication'
import { AuthState } from '@/types/auth-state'

export interface PrivateRouteContainerProps {
  routeProps: RouteProps
}

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
  isLoading: boolean
  authState: AuthState
}
