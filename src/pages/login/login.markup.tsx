import React from 'react'
import { IonContent, IonPage, IonRouterLink } from '@ionic/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { loginSchema } from '@/helpers/form-validation'
import { LoginProps } from '@/pages/login/login.types'
import { LoadingOverlay } from '@/components/loading-overlay'

export const Login = ({ login, loading, errorMessage }: LoginProps) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoadingOverlay isLoading={loading} />
        <div className="h-full w-full flex items-center justify-center">
          <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={(
              values: { email: string; password: string; rememberMe: boolean },
              { setSubmitting }
            ) => {
              login(values.email, values.password, values.rememberMe).then(() =>
                setSubmitting(false)
              )
            }}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center p-8 h-full gap-10 max-w-3xl w-full">
                <h1 className="font-poppins text-2xl font-semibold">
                  Get started now
                </h1>
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label">Email</label>
                    <Field
                      className="input"
                      type="text"
                      name="email"
                      placeholder="Your Email"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="email"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label">Password</label>
                    <Field
                      className="input"
                      type="password"
                      name="password"
                      placeholder="Your Password"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="password"
                      component="div"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 label">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="checkbox"
                    />
                    Remember me
                  </label>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <button
                    type="submit"
                    className="button-primary"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                  <span className="flex items-center gap-3 font-poppins font-light text-xs">
                    Don&#39;t have an account?
                    <IonRouterLink
                      className="button-secondary"
                      routerLink="/sign-up"
                    >
                      Sign up
                    </IonRouterLink>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </IonContent>
    </IonPage>
  )
}
