import mapboxgl, { NavigationControl } from 'mapbox-gl'

import { FacilityLocation } from '@/types/facility-location'
import { getLocationSource } from '@/helpers/map-sources'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY

const LOCATION_SOURCE = 'facility-locations'

// Get the map instance
export const getMap = async (
  containerId: string,
  locations: FacilityLocation[] | null,
  onClickCallback: (params: { lng: number; lat: number }) => void,
  routeToLocation: (id: string) => void
) => {
  const map = new mapboxgl.Map({
    container: containerId,
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: 17.15,
    pitch: 15,
    center: [90, 10]
  })

  map.addControl(new NavigationControl())
  map.addControl(
    new mapboxgl.GeolocateControl({
      showUserLocation: true
    })
  )

  map.on('load', function () {
    map.resize() // Needed since the map will not size correctly on first render

    setupOnLoad(map, locations, onClickCallback, routeToLocation)
  })
  return map
}

export const setupOnClickListeners = (
  map: mapboxgl.Map,
  locations: FacilityLocation[],
  onClickCallback: (params: { lng: number; lat: number }) => void,
  routeToLocation: (id: string) => void
) => {
  if (map) {
    map.on('click', async (event: any) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: locations.map(location => location.id) // Only query specific layers
      })

      if (features.length > 0) {
        // Click on an icon
        let coordinates
        if ('coordinates' in features[0].geometry) {
          coordinates = features[0].geometry.coordinates.slice()
        }

        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(features[0].properties.description)
          .on('open', e => {
            console.log('popup open', e)
            const button = document.getElementById('popup-button')
            if (button) {
              button.addEventListener('click', () => {
                routeToLocation(features[0].properties.id) // Call the passed method with the location ID
              })
            }
          })
          .addTo(map)
      } else {
        // Click on rest of the map
        const { lng, lat } = event.lngLat
        onClickCallback({ lng, lat })
      }
    })
  }
}

const setupOnLoad = (
  map: mapboxgl.Map,
  firebaseLocations: FacilityLocation[],
  onClickCallback: (params: { lng: number; lat: number }) => void,
  routeToLocation: (id: string) => void
) => {
  if (!map.getSource(LOCATION_SOURCE)) {
    map.addSource(LOCATION_SOURCE, getLocationSource(firebaseLocations))

    firebaseLocations.forEach(location => {
      map.addLayer({
        id: location.id,
        type: 'symbol',
        source: LOCATION_SOURCE,
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true
        }
      })
    })
    setupOnClickListeners(
      map,
      firebaseLocations,
      onClickCallback,
      routeToLocation
    )
  }
}
