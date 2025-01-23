import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import 'swiper/css/bundle' // Import Swiper styles
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'

/* Tailwind styles */
import '../tailwind.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { LoginContainer } from '@/pages/login'
import { SignUpContainer } from '@/pages/sign-up'
import { PrivateRouteContainer } from '@/components/private-route'
import { AuthenticationProvider } from '@/provider/authentication/authentication-provider'
import { MapContainer } from '@/pages/map'
import { FacilityDetailsContainer } from '@/pages/facility-details'

setupIonicReact()

const App: React.FC = () => (
  <IonApp>
    <AuthenticationProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <PrivateRouteContainer component={MapContainer} />
          </Route>
          <Route exact path="/facility-details/:id">
            <PrivateRouteContainer component={FacilityDetailsContainer} />
          </Route>
          <Route exact path="/sign-up" component={SignUpContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthenticationProvider>
  </IonApp>
)

export default App
