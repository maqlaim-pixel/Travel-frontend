// City coordinates for distance-based package sorting
// All Indian cities with lat/lng

const CITY_COORDS = {
  // Gujarat
  ahmedabad:    { lat: 23.0225, lng: 72.5714 },
  surat:        { lat: 21.1702, lng: 72.8311 },
  vadodara:     { lat: 22.3072, lng: 73.1812 },
  rajkot:       { lat: 22.3039, lng: 70.8022 },
  gandhinagar:  { lat: 23.2156, lng: 72.6369 },
  // Rajasthan
  jaipur:       { lat: 26.9124, lng: 75.7873 },
  udaipur:      { lat: 24.5854, lng: 73.7125 },
  jodhpur:      { lat: 26.2389, lng: 73.0243 },
  // Maharashtra
  mumbai:       { lat: 19.0760, lng: 72.8777 },
  pune:         { lat: 18.5204, lng: 73.8567 },
  // Goa
  goa:          { lat: 15.2993, lng: 74.1240 },
  // Karnataka
  bangalore:    { lat: 12.9716, lng: 77.5946 },
  // Tamil Nadu
  chennai:      { lat: 13.0827, lng: 80.2707 },
  // Himachal Pradesh
  shimla:       { lat: 31.1048, lng: 77.1734 },
  // Uttarakhand
  dehradun:     { lat: 30.3165, lng: 78.0322 },
  // Jammu & Kashmir
  srinagar:     { lat: 34.0837, lng: 74.7973 },
  // Madhya Pradesh
  bhopal:       { lat: 23.2599, lng: 77.4126 },
  // West Bengal
  kolkata:      { lat: 22.5726, lng: 88.3639 },
  // Uttar Pradesh
  agra:         { lat: 27.1767, lng: 78.0081 },
  varanasi:     { lat: 25.3176, lng: 82.9739 },
  lucknow:      { lat: 26.8467, lng: 80.9462 },
  // Delhi
  delhi:        { lat: 28.7041, lng: 77.1025 },
}

// State approximate center coordinates for package sorting
const STATE_COORDS = {
  'gujarat':        { lat: 22.2587, lng: 71.1924 },
  'rajasthan':      { lat: 27.0238, lng: 74.2179 },
  'maharashtra':    { lat: 19.7515, lng: 75.7139 },
  'goa':            { lat: 15.2993, lng: 74.1240 },
  'karnataka':      { lat: 15.3173, lng: 75.7139 },
  'tamil nadu':     { lat: 11.1271, lng: 78.6569 },
  'kerala':         { lat: 10.8505, lng: 76.2711 },
  'himachal pradesh':{ lat: 31.1048, lng: 77.1734 },
  'uttarakhand':    { lat: 30.0668, lng: 79.0193 },
  'jammu & kashmir':{ lat: 33.7782, lng: 76.5762 },
  'madhya pradesh': { lat: 22.9734, lng: 78.6569 },
  'west bengal':    { lat: 22.9868, lng: 87.8550 },
  'uttar pradesh':  { lat: 26.8467, lng: 80.9462 },
}

// Known destination coordinates for package sorting
const DEST_COORDS = {
  'ahmedabad':  { lat: 23.0225, lng: 72.5714 },
  'surat':      { lat: 21.1702, lng: 72.8311 },
  'vadodara':   { lat: 22.3072, lng: 73.1812 },
  'rajkot':     { lat: 22.3039, lng: 70.8022 },
  'gandhinagar':{ lat: 23.2156, lng: 72.6369 },
  'jaipur':     { lat: 26.9124, lng: 75.7873 },
  'udaipur':    { lat: 24.5854, lng: 73.7125 },
  'jodhpur':    { lat: 26.2389, lng: 73.0243 },
  'mumbai':     { lat: 19.0760, lng: 72.8777 },
  'pune':       { lat: 18.5204, lng: 73.8567 },
  'goa':        { lat: 15.2993, lng: 74.1240 },
  'bangalore':  { lat: 12.9716, lng: 77.5946 },
  'chennai':    { lat: 13.0827, lng: 80.2707 },
  'kolkata':    { lat: 22.5726, lng: 88.3639 },
  'delhi':      { lat: 28.7041, lng: 77.1025 },
  'agra':       { lat: 27.1767, lng: 78.0081 },
  'varanasi':   { lat: 25.3176, lng: 82.9739 },
  'lucknow':    { lat: 26.8467, lng: 80.9462 },
  'shimla':     { lat: 31.1048, lng: 77.1734 },
  'manali':     { lat: 32.2432, lng: 77.1892 },
  'darjeeling': { lat: 27.0410, lng: 88.2663 },
  'kullu':      { lat: 31.9581, lng: 77.1086 },
  'rishikesh':  { lat: 30.0869, lng: 78.2676 },
  'mussoorie':  { lat: 30.4598, lng: 78.0644 },
  'nainital':   { lat: 29.3916, lng: 79.4445 },
  'srinagar':   { lat: 34.0837, lng: 74.7973 },
  'gulmarg':    { lat: 34.0544, lng: 74.3767 },
  'pondicherry':{ lat: 11.9416, lng: 79.8083 },
  'ooty':       { lat: 11.4102, lng: 76.6950 },
  'munnar':     { lat: 10.0889, lng: 77.0595 },
  'alleppey':   { lat: 9.4981, lng: 76.3388 },
  'coorg':      { lat: 12.3375, lng: 75.8069 },
  'hampi':      { lat: 15.3350, lng: 76.4600 },
  'madurai':    { lat: 9.9252, lng: 78.1198 },
  'jaisalmer':  { lat: 26.9157, lng: 70.9083 },
  'bikaner':    { lat: 28.0229, lng: 73.3119 },
  'pushkar':    { lat: 26.4900, lng: 74.5511 },
  'ajmer':      { lat: 26.4499, lng: 74.6399 },
  'mount abu':  { lat: 24.5926, lng: 72.7156 },
  'diu':        { lat: 20.7145, lng: 70.9874 },
  'dwarka':     { lat: 22.2442, lng: 68.9682 },
  'somnath':    { lat: 20.8880, lng: 70.4013 },
  'palitana':   { lat: 21.5222, lng: 71.8226 },
  'bhuj':       { lat: 23.2517, lng: 69.6674 },
  'saputara':   { lat: 20.5593, lng: 73.5026 },
  'gir':        { lat: 21.0867, lng: 70.7990 },
}

// Haversine distance formula (in km)
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Get coordinates for a city by slug
export function getCityCoords(citySlug) {
  return CITY_COORDS[citySlug] || null
}

// Get coordinates for a state
export function getStateCoords(stateName) {
  return STATE_COORDS[stateName?.toLowerCase()] || null
}

// Get coordinates for a package destination
export function getDestCoords(destination) {
  if (!destination) return null
  const key = destination.toLowerCase().trim()
  return DEST_COORDS[key] || null
}

// Get coordinates for a package — tries destination first, then state
export function getPackageCoords(pkg) {
  // Try destination coordinates first
  const destCoords = getDestCoords(pkg.destination)
  if (destCoords) return destCoords

  // Fall back to state coordinates
  const stateCoords = getStateCoords(pkg.state)
  if (stateCoords) return stateCoords

  return null
}

// Distance tiers
export const DISTANCE_TIERS = {
  NEARBY: 200,      // 0-200 km
  MEDIUM: 500,      // 200-500 km
  // > 500 km is Long Distance
}

// Sort packages by distance from a city, return with distance info
export function sortByDistance(packages, citySlug) {
  const cityCoords = getCityCoords(citySlug)
  if (!cityCoords) return packages.map(p => ({ ...p, distance: Infinity, tier: 'long' }))

  return packages.map(pkg => {
    const pkgCoords = getPackageCoords(pkg)
    const distance = pkgCoords
      ? haversineDistance(cityCoords.lat, cityCoords.lng, pkgCoords.lat, pkgCoords.lng)
      : Infinity

    let tier = 'long'
    if (distance <= DISTANCE_TIERS.NEARBY) tier = 'nearby'
    else if (distance <= DISTANCE_TIERS.MEDIUM) tier = 'medium'

    return { ...pkg, distance: Math.round(distance), tier }
  }).sort((a, b) => a.distance - b.distance)
}

// Categorize packages into sections
export function categorizePackages(packages, citySlug, cityName) {
  const sorted = sortByDistance(packages, citySlug)

  // City-specific packages (destination matches city name exactly)
  const cityPackages = sorted.filter(p =>
    p.destination?.toLowerCase() === cityName.toLowerCase()
  )

  // Remaining packages (not city-specific) split by distance
  const otherPackages = sorted.filter(p =>
    p.destination?.toLowerCase() !== cityName.toLowerCase()
  )

  const nearby = otherPackages.filter(p => p.tier === 'nearby')
  const medium = otherPackages.filter(p => p.tier === 'medium')
  const longDistance = otherPackages.filter(p => p.tier === 'long')

  return { cityPackages, nearby, medium, longDistance, all: sorted }
}

export { CITY_COORDS, STATE_COORDS, DEST_COORDS }
