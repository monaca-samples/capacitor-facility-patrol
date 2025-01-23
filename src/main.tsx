import React from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from 'firebase/app'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

import App from './App'
import { firebaseConfig } from './config/firebase-config'

const container = document.getElementById('root')
const root = createRoot(container!)

export const app = initializeApp(firebaseConfig)

defineCustomElements(window).then()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
