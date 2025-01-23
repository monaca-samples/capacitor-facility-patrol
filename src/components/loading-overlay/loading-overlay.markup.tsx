import React from 'react'
import { IonSpinner } from '@ionic/react'

import { LoadingOverlayProps } from './loading-overlay.types'

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <IonSpinner name="crescent" color="light" style={{ zIndex: 1001 }} />
    </div>
  )
}
