import React, { ReactNode, useEffect, useState } from 'react'
import {
  FirebaseAuthentication,
  Persistence,
  User
} from '@capacitor-firebase/authentication'

import { AuthenticationContext } from './authentication-provider.context'

export const AuthenticationProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [user, setUser] = useState<User | null>(undefined)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setInitialUser()
  }, [])

  const setPersistence = async () => {
    await FirebaseAuthentication.setPersistence({
      persistence: Persistence.IndexedDbLocal
    })
  }

  const setInitialUser = async () => {
    try {
      setLoading(true)
      await FirebaseAuthentication.addListener(
        'authStateChange',
        async result => {
          if (result.user) {
            setUser(result.user)
          } else {
            setUser(null)
          }
        }
      )
    } catch (error) {
      console.error('Error fetching initial user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<User | null> => {
    try {
      setLoading(true)

      if (rememberMe) {
        await setPersistence()
      }

      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password
      })

      if (result.user) {
        setUser(result.user)
        return result.user
      }
      return null
    } catch (error) {
      setErrorMessage(error.message)
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
      }
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await FirebaseAuthentication.signOut()

      setUser(undefined)
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{ login, signUp, user, loading, errorMessage, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
