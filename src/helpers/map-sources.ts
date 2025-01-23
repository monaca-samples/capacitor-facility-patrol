import { FacilityLocation } from '@/types/facility-location'

export const getLocationSource = (locations: FacilityLocation[]): any => {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: locations.map(location => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        },
        properties: {
          icon: 'rocket',
          description: `
                       <div class="flex flex-col items-center">
                          <p class="font-poppins font-semibold">${location.title}</p>
                          <p class="w-full border-t border-gray-400 flex flex-col items-center mt-1">
                            <a href="/facility-details/${location.id}" class="font-poppins text-greenDefault mt-1">
                              Edit
                            </a>
                          </p>
                        </div>`
        }
      }))
    }
  }
}
