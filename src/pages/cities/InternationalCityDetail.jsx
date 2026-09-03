import { useParams } from 'react-router-dom'
import { getCityData } from '../../data/cityData'
import CityPage from '../../components/common/CityPage'

export default function InternationalCityDetail() {
  const { countrySlug, citySlug } = useParams()
  // Look up using composite key like "uae/dubai", "japan/tokyo"
  const city = getCityData(`${countrySlug}/${citySlug}`)

  if (!city) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">City Not Found</h1>
          <p className="text-navy-500">The city you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return <CityPage city={city} />
}
