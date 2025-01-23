import React from 'react'
import { IonContent, IonPage, IonRouterLink } from '@ionic/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

import { signupSchema } from '@/helpers/form-validation'
import { SignUpProps } from '@/pages/sign-up/sign-up.types'
import { LoadingOverlay } from '@/components/loading-overlay'

export const SignUp = ({ signUp, errorMessage, loading }: SignUpProps) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full w-full flex items-center justify-center">
          <LoadingOverlay isLoading={loading} />

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordRepeat: ''
            }}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
              signUp(values.email, values.password, values.name).then(() =>
                setSubmitting(false)
              )
            }}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col items-center justify-center p-8 h-full gap-10 max-w-3xl w-full">
                <h1 className="font-poppins text-2xl font-semibold">
                  Create Account
                </h1>
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label">Name</label>
                    <Field
                      className="input"
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="name"
                      component="div"
                    />
                  </div>
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
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label">Repeat Password</label>
                    <Field
                      className="input"
                      type="password"
                      name="passwordRepeat"
                      placeholder="Repeat Your Password"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="passwordRepeat"
                      component="div"
                    />
                  </div>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <button
                    type="submit"
                    className="button-primary"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                  <span className="flex items-center gap-3 font-poppins font-light text-xs">
                    Already have an account?
                    <IonRouterLink
                      className="button-secondary"
                      routerLink="/login"
                    >
                      Login
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
