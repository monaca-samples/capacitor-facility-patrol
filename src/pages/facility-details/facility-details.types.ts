import { RouteComponentProps } from 'react-router'
import { FacilityLocation } from '@/types/facility-location'

export type FacilityDetailsContainerProps = RouteComponentProps<{
  id: string
}>

export interface FacilityDetailsProps {
  location: FacilityLocation
  isLoading: boolean
  selectImage: () => Promise<string>
  takePhoto: () => Promise<string>
  enableTitleEdit: boolean
  setEnableTitleEdit: (edit: boolean) => void
  submitForm: (props: FacilityUpdateFormProps) => Promise<void>
}

export interface FacilityUpdateFormProps {
  title: string
  comment: string
  photos: string[]
  checkupBolts: boolean
  checkupMeasurement: boolean
  checkupCleaning: boolean
}
