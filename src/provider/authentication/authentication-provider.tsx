import React, { ReactNode, useEffect, useState } from 'react'
import {
  FirebaseAuthentication,
  User
} from '@capacitor-firebase/authentication'
import { getApp } from 'firebase/app'
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  signOut
} from 'firebase/auth'
import { Capacitor } from '@capacitor/core'

import { AuthenticationContext } from './authentication-provider.context'
import { AuthState } from '@/types/auth-state'

export const AuthenticationProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [authState, setAuthState] = useState(AuthState.PENDING)

  useEffect(() => {
    setInitialUser()
    getFirebaseAuth().then(async () => {})
  }, [])

  const getFirebaseAuth = async () => {
    if (Capacitor.isNativePlatform()) {
      return initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence
      })
    } else {
      return getAuth()
    }
  }

  const setInitialUser = async () => {
    setLoading(true)
    await FirebaseAuthentication.addListener(
      'authStateChange',
      async result => {
        if (result.user) {
          setUser(result.user)
          setAuthState(AuthState.AUTHENTICATED)
        }
      }
    )
    setLoading(false)
  }

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<User | null> => {
    try {
      setLoading(true)

      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password
      })

      if (result.user) {
        console.log(result.user)
        // if (rememberMe) {
        //   await getFirebaseAuth()
        // }
        setUser(result.user)
        setAuthState(AuthState.AUTHENTICATED)
        return result.user
      }
      setAuthState(AuthState.UNAUTHORIZED)
      return null
    } catch (error) {
      setErrorMessage(error.message)
      setAuthState(AuthState.UNAUTHORIZED)
      return null
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const result =
        await FirebaseAuthentication.createUserWithEmailAndPassword({
          email,
          password
        })

      if (result.user) {
        await FirebaseAuthentication.updateProfile({ displayName: name })
        setUser(result.user)
        setAuthState(AuthState.AUTHENTICATED)
      }
    } catch (error) {
      setErrorMessage(error.message)
      setAuthState(AuthState.UNAUTHORIZED)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    // 1. Sign out on the native layer
    await FirebaseAuthentication.signOut()
    // 1. Sign out on the web layer
    const auth = getAuth()
    await signOut(auth)
    setAuthState(AuthState.UNAUTHORIZED)

    setUser(null)
    setLoading(false)
  }

  return (
    <AuthenticationContext.Provider
      value={{ authState, login, signUp, user, loading, errorMessage, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
