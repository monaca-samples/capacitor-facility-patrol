import React, { FC, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'
import mapboxgl, { Marker, Popup } from 'mapbox-gl'

import { useAuthentication } from '@/hooks/use-authentication'
import { useMapbox } from '@/hooks/use-mapbox'
import { FacilityLocation } from '@/types/facility-location'

import { Map } from './map.markup'

export const MapContainer: FC = () => {
  const { user, logout, loading } = useAuthentication()

  const { mapRef, clickedLocation, setClickedLocation, saveLocation } =
    useMapbox('map')

  const history = useHistory()

  // Memoize the marker instance, so it's only created when location or mapRef changes
  const marker = useMemo(() => new mapboxgl.Marker(), [])

  useEffect(() => {
    if (mapRef && mapRef.current) {
      if (clickedLocation) {
        marker
          .setLngLat({
            lon: clickedLocation.lng,
            lat: clickedLocation.lat
          })
          .addTo(mapRef.current)
      } else {
        marker.remove()
      }
    }

    // Cleanup: remove the marker when the component unmounts or location changes
    return () => {
      marker.remove()
    }
  }, [clickedLocation, mapRef, marker])

  const logoutAndRoute = async () => {
    await logout()

    history.push('/login')
  }

  const saveNewLocation = async (location: FacilityLocation) => {
    await saveLocation(location)

    setClickedLocation(null) // close the modal
  }

  return (
    <Map
      userName={user.displayName}
      logout={logoutAndRoute}
      loading={loading}
      setClickedLocation={setClickedLocation}
      clickedLocation={clickedLocation}
      saveLocation={saveNewLocation}
    />
  )
}
