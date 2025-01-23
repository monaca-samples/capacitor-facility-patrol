import React from 'react'
import uuid from 'react-uuid'
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Field, Form, Formik } from 'formik'

import { MapProps } from '@/pages/map/map.types'

export const Map = ({
  userName,
  logout,
  loading,
  clickedLocation,
  setClickedLocation,
  saveLocation
}: MapProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex items-center gap-3">
            <IonAvatar className="w-10 h-10">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <p className="font-poppins flex flex-col">
              <span className="font-sm opacity-80">Welcome back</span>
              <span>{userName}</span>
            </p>
          </div>
          <IonButtons slot="end">
            <IonButton
              className="rounded-full bg-greenLight shadow"
              onClick={logout}
            >
              <IonIcon
                icon={logOutOutline}
                color="dark"
                className="py-2 px-1.5"
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LoadingOverlay isLoading={loading} />

        <div id="map" className="w-full h-full relative" />

        <IonModal
          isOpen={clickedLocation !== null}
          canDismiss={true}
          mode="ios"
          initialBreakpoint={0.35}
          breakpoints={[0, 0.35]}
          onDidDismiss={() => setClickedLocation(null)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>New Facility</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setClickedLocation(null)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Formik
              initialValues={{
                facilityName: ''
              }}
              onSubmit={async values => {
                await saveLocation({
                  id: uuid(),
                  title: values.facilityName,
                  latitude: clickedLocation.lat,
                  longitude: clickedLocation.lng
                })
              }}
            >
              {({ isSubmitting }) => (
                <Form className="p-4 flex flex-col gap-4">
                  <>
                    <label className="label">Facility Name</label>
                    <Field
                      name="facilityName"
                      className="input"
                      placeholder="How is this place called?"
                    />
                  </>
                  <button
                    className="button-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}
