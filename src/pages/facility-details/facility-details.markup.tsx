import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, Pagination, Zoom } from 'swiper/modules'
import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonToolbar
} from '@ionic/react'
import {
  cameraOutline,
  checkmarkOutline,
  chevronBackOutline,
  createOutline,
  ellipse,
  trashOutline
} from 'ionicons/icons'

import { FacilityDetailsProps } from '@/pages/facility-details/facility-details.types'
import { LoadingOverlay } from '@/components/loading-overlay'
import { Field, Form, Formik } from 'formik'

export const FacilityDetails = ({
  location,
  isLoading,
  selectImage,
  takePhoto,
  enableTitleEdit,
  setEnableTitleEdit,
  submitForm
}: FacilityDetailsProps) => {
  console.log(location)
  return (
    <IonPage>
      <LoadingOverlay isLoading={isLoading} />
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonRouterLink routerLink="/">
              <IonIcon icon={chevronBackOutline} />
            </IonRouterLink>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Formik
          initialValues={{
            title: location?.title ?? '',
            comment: location?.comment ?? '',
            photos: location?.photos ?? [],
            checkupBolts: location?.checkupBolts,
            checkupMeasurement: location?.checkupMeasurement,
            checkupCleaning: location?.checkupCleaning
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await submitForm(values)
            setSubmitting(false)
          }}
          enableReinitialize
        >
          {({ values, isSubmitting, dirty, setFieldValue }) => (
            <Form>
              <LoadingOverlay isLoading={isSubmitting} />
              <div className="flex flex-col gap-3 p-10">
                <div className="flex items-center w-full justify-between">
                  {!enableTitleEdit ? (
                    <h1 className="font-semibold font-poppins text-3xl">
                      {values.title}
                    </h1>
                  ) : (
                    <Field
                      id="title-input"
                      name="title"
                      className="w-full font-semibold font-poppins text-3xl bg-transparent focus:outline-none border-b border-gray-400 focus:border-greenLight"
                    />
                  )}
                  <IonButton
                    onClick={() => {
                      setEnableTitleEdit(!enableTitleEdit)
                    }}
                    fill="clear"
                  >
                    <IonIcon
                      icon={!enableTitleEdit ? createOutline : checkmarkOutline}
                    />
                  </IonButton>
                </div>
                {values.photos.length > 0 && (
                  <Swiper
                    className="w-full"
                    loop={false}
                    zoom
                    pagination={{ clickable: true, dynamicBullets: true }}
                    modules={[Controller, Zoom, Pagination]}
                  >
                    {values.photos.map((photo, index) => (
                      <SwiperSlide key={index}>
                        <div className="swiper-zoom-container relative ">
                          <img
                            src={photo}
                            alt="photo"
                            className="rounded-xl w-full "
                          />
                          <button
                            onClick={async () => {
                              const updatedPhotos = [...values.photos].filter(
                                formikPhoto => formikPhoto !== photo
                              )
                              await setFieldValue('photos', updatedPhotos)
                            }}
                          >
                            <IonIcon
                              icon={trashOutline}
                              className="absolute p-2 rounded-full bg-greenLight shadow text-black right-2.5 top-2.5"
                            />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <button
                  className="rounded-xl bg-blackLight p-2 flex items-center justify-center font-poppins gap-3"
                  id="open-action-sheet"
                >
                  <IonIcon
                    icon={cameraOutline}
                    color="dark"
                    className="p-2 rounded-full bg-greenLight shadow"
                  />
                  Add photos
                </button>

                <div className="rounded-xl bg-blackLight p-2 flex flex-col font-poppins gap-2">
                  <span className="flex items-center gap-1">
                    <label className="label">Check up</label>
                    <IonIcon icon={ellipse} className="w-1" />
                    <span className="text-gray-400 text-sm">Not Finished</span>
                  </span>
                  <div>
                    <IonCheckbox
                      checked={values.checkupBolts}
                      labelPlacement="end"
                      onIonChange={e =>
                        setFieldValue('checkupBolts', e.target.checked)
                      }
                    >
                      Check for loose bolts completed
                    </IonCheckbox>
                    <IonCheckbox
                      labelPlacement="end"
                      checked={values.checkupMeasurement}
                      onIonChange={e =>
                        setFieldValue('checkupMeasurement', e.target.checked)
                      }
                    >
                      Voltage measurement completed
                    </IonCheckbox>
                    <IonCheckbox
                      labelPlacement="end"
                      checked={values.checkupCleaning}
                      onIonChange={e =>
                        setFieldValue('checkupCleaning', e.target.checked)
                      }
                    >
                      Cleaning completed
                    </IonCheckbox>
                  </div>
                </div>
                <div className="rounded-xl bg-blackLight p-2 flex flex-col gap-2">
                  <label className="label">Comments</label>
                  <Field
                    className="textarea"
                    component="textarea"
                    rows="3"
                    name="comment"
                    placeholder="Add any comment about this facility..."
                  />
                </div>
                <button
                  className="button-primary"
                  type="submit"
                  disabled={!dirty || isSubmitting}
                >
                  Save
                </button>
              </div>

              <IonActionSheet
                trigger="open-action-sheet"
                header="Add photos"
                translucent
                mode="ios"
                buttons={[
                  {
                    text: 'Take photo',
                    handler: async () => {
                      const base64 = await takePhoto()
                      await setFieldValue('photos', [base64, ...values.photos])
                    }
                  },
                  {
                    text: 'Upload',
                    handler: async () => {
                      const base64 = await selectImage()
                      await setFieldValue('photos', [base64, ...values.photos])
                    }
                  },
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    data: {
                      action: 'cancel'
                    }
                  }
                ]}
              ></IonActionSheet>
            </Form>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  )
}
