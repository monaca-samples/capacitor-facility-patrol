import React, { FC } from 'react'

import { SignUp } from './sign-up.markup'
import { useAuthentication } from '@/hooks/use-authentication'
import { useHistory } from 'react-router'

export const SignUpContainer: FC = () => {
  const { signUp, errorMessage, loading } = useAuthentication()

  const history = useHistory()

  const signUpAndRoute = async (
    email: string,
    password: string,
    name: string
  ) => {
    await signUp(email, password, name)

    history.push('/')
  }

  return (
    <SignUp
      signUp={signUpAndRoute}
      errorMessage={errorMessage}
      loading={loading}
    />
  )
}
