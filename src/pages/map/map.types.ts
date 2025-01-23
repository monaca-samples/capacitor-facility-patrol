import { FacilityLocation } from '@/types/facility-location'

export interface MapProps {
  userName: string
  logout: () => Promise<void>
  loading: boolean
  setClickedLocation: (location: { lng: number; lat: number } | null) => void
  clickedLocation: { lng: number; lat: number } | null
  saveLocation: (location: FacilityLocation) => Promise<void>
}
