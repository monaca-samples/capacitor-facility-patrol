import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

import { FacilityLocation } from '@/types/facility-location'
import {
  getLocationDocument,
  setLocationDocument
} from '@/helpers/firebase-storage'
import {
  FacilityDetailsContainerProps,
  FacilityUpdateFormProps
} from '@/pages/facility-details/facility-details.types'
import {
  convertBlobToBase64,
  getImageAsBlob
} from '@/pages/facility-details/facility-details.helper'

import { FacilityDetails } from './facility-details.markup'

export const FacilityDetailsContainer: FC = ({
  match
}: FacilityDetailsContainerProps) => {
  const [location, setLocation] = useState<FacilityLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [enableTitleEdit, setEnableTitleEdit] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const setupLocation = async () => {
      const location = await getLocationDocument(match.params.id)

      if (location) {
        setLocation(location)
        setIsLoading(false)
      } else {
        history.push('/') // redirect to map page if location does not exist
      }
    }

    setupLocation()
  }, [])

  const selectImage = async (): Promise<string> => {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri, // URI to access the file
        source: CameraSource.Photos // Open the photo gallery
      })

      if (image.webPath) {
        const blob = await getImageAsBlob(image.webPath)
        return await convertBlobToBase64(blob)
      }
    } catch (error) {
      console.error('Error selecting image:', error)
    }
  }

  const takePhoto = async (): Promise<string> => {
    const capturedPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    })

    if (capturedPhoto.webPath) {
      const blob = await getImageAsBlob(capturedPhoto.webPath)
      return await convertBlobToBase64(blob)
    }
  }

  const submitForm = async (props: FacilityUpdateFormProps) => {
    await setLocationDocument(match.params.id, props)
  }

  return (
    <FacilityDetails
      location={location}
      isLoading={isLoading}
      selectImage={selectImage}
      takePhoto={takePhoto}
      enableTitleEdit={enableTitleEdit}
      setEnableTitleEdit={setEnableTitleEdit}
      submitForm={submitForm}
    />
  )
}
