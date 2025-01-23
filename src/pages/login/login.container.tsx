import React, { FC } from 'react'
import { useHistory } from 'react-router'

import { useAuthentication } from '@/hooks/use-authentication'

import { Login } from './login.markup'

export const LoginContainer: FC = () => {
  const { login, errorMessage, loading } = useAuthentication()

  const history = useHistory()

  const loginAndRoute = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const user = await login(email, password, rememberMe)

    if (user !== null) {
      history.push('/')
    }
  }

  return (
    <Login
      login={loginAndRoute}
      loading={loading}
      errorMessage={errorMessage}
    />
  )
}
