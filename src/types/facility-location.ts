export interface FacilityLocation {
  id: string
  title: string
  latitude: number
  longitude: number
  photos?: string[]
  comment?: string
  checkupBolts?: boolean
  checkupMeasurement?: boolean
  checkupCleaning?: boolean
}
