import {
  DocumentData,
  DocumentSnapshot,
  FirebaseFirestore
} from '@capacitor-firebase/firestore'

import { FacilityLocation } from '@/types/facility-location'
import { FacilityUpdateFormProps } from '@/pages/facility-details/facility-details.types'

export async function saveLocationToFirebase(data: FacilityLocation) {
  try {
    await FirebaseFirestore.addDocument({
      reference: 'facility',
      data
    })
  } catch (error) {
    console.error('Error saving document: ', error)
  }
}

export const getLocationsFromFirebase = async (): Promise<
  FacilityLocation[] | null
> => {
  try {
    const { snapshots } = await FirebaseFirestore.getCollection({
      reference: 'facility'
    })
    return snapshots.map(snapshot => {
      return transformSnapshot(snapshot)
    })
  } catch (error) {
    console.error('Error saving document: ', error)
    return null
  }
}

export const getLocationDocument = async (
  id: string
): Promise<FacilityLocation | null> => {
  try {
    const { snapshot } = await FirebaseFirestore.getDocument({
      reference: `facility/${id}`
    })
    return transformSnapshot(snapshot)
  } catch (e) {
    console.error(e)
    return null
  }
}

export const setLocationDocument = async (
  referenceId: string,
  data: FacilityUpdateFormProps
) => {
  try {
    await FirebaseFirestore.setDocument({
      reference: `facility/${referenceId}`,
      data,
      merge: true
    })
  } catch (e) {
    console.error(e)
  }
}

// Using Storage costs money
// const uploadFile = async (
//   id: string,
//   index: number,
//   imageUrl: string
// ): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     FirebaseStorage.uploadFile(
//       {
//         path: `images/${id + index}.jp`,
//         uri: imageUrl
//       },
//       (event, error) => {
//         if (error) {
//           reject(error)
//         } else if (event?.completed) {
//           resolve()
//         }
//       }
//     )
//   })
// }

const transformSnapshot = (
  snapshot: DocumentSnapshot<DocumentData>
): FacilityLocation => {
  return {
    id: snapshot.id,
    title: snapshot.data?.title,
    latitude: snapshot.data?.latitude,
    longitude: snapshot.data?.longitude,
    photos: snapshot.data?.photos,
    comment: snapshot.data?.comment,
    checkupBolts: snapshot.data?.checkupBolts,
    checkupMeasurement: snapshot.data?.checkupMeasurement,
    checkupCleaning: snapshot.data?.checkupCleaning
  }
}
