import { useEffect, useRef, useState } from 'react'
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'

import { getMap, setupOnClickListeners } from '@/helpers/mapbox'
import { getLocationSource } from '@/helpers/map-sources'
import { FacilityLocation } from '@/types/facility-location'
import {
  getLocationsFromFirebase,
  saveLocationToFirebase
} from '@/helpers/firebase-storage'
import { useHistory } from 'react-router'

const LOCATION_SOURCE = 'facility-locations'

export const useMapbox = (containerId: string) => {
  const mapRef = useRef<mapboxgl.Map | null>(null)

  const [locations, setLocations] = useState<FacilityLocation[]>([])

  const [clickedLocation, setClickedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  // Setup map object, layers and click listeners
  useEffect(() => {
    setupMap().then(() => {
      console.log('[use-mapbox]: Setup complete')
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  const setupMap = async () => {
    try {
      setIsLoading(true)

      const firebaseLocations = await getLocationsFromFirebase()
      setLocations(firebaseLocations)

      mapRef.current = await getMap(
        containerId,
        firebaseLocations,
        setClickedLocation,
        routeToDetails
      )
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const routeToDetails = (id: string) => {
    history.push(`/facility-details/${id}`)
  }

  const saveLocation = async (location: FacilityLocation) => {
    await saveLocationToFirebase(location)

    const newLocations = [...locations, location]
    setLocations(newLocations)

    // Update the map's data source
    const source = mapRef.current.getSource(LOCATION_SOURCE) as GeoJSONSource
    if (source) {
      source.setData(getLocationSource(newLocations).data)
    }

    // Add new layer with the new location to the map
    const layerId = location.id
    if (!mapRef.current.getLayer(layerId)) {
      mapRef.current.addLayer({
        id: layerId,
        type: 'symbol',
        source: LOCATION_SOURCE,
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true
        }
      })
    }

    setupOnClickListeners(
      mapRef.current,
      newLocations,
      setClickedLocation,
      routeToDetails
    )
  }

  return {
    mapRef,
    isLoading,
    clickedLocation,
    setClickedLocation,
    locations,
    saveLocation
  }
}
