import React, { FC } from 'react'
import { RouteProps } from 'react-router'
import { IonContent, IonPage } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'

import { useAuthentication } from '@/hooks/use-authentication'
import { LoadingOverlay } from '@/components/loading-overlay'

export const PrivateRouteContainer: FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, loading } = useAuthentication()

  // Show loading screen during authentication resolution
  if (loading || user === undefined) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <LoadingOverlay isLoading={true} />
        </IonContent>
      </IonPage>
    )
  }

  return user === null ? (
    <Redirect to="/login" />
  ) : (
    <Route {...rest} render={props => <Component {...props} />} />
  )
}
