import React, { FC } from 'react'
import { RouteProps } from 'react-router'

import { useAuthentication } from '@/hooks/use-authentication'

import { AuthState } from '@/types/auth-state'
import { IonContent, IonPage } from '@ionic/react'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Redirect } from 'react-router-dom'

export const PrivateRouteContainer: FC<RouteProps> = ({ component }) => {
  const { authState, loading } = useAuthentication()
  if (!component) {
    return <></>
  }

  if (authState === AuthState.PENDING || loading) {
    // While waiting for login resolution, render a loading indicator
    return (
      <IonPage>
        <IonContent fullscreen>
          <LoadingOverlay isLoading={true} />
        </IonContent>
      </IonPage>
    )
  }

  return authState === AuthState.AUTHENTICATED ? (
    React.createElement(component)
  ) : (
    <Redirect to="/login" />
  )
}
