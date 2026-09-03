import { Link } from 'react-router-dom'
import { MapPin, Calendar } from 'lucide-react'

export default function DestinationCard({ destination, menuSlug }) {
  const fallbackImg = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600'
  const href = menuSlug
    ? `/${menuSlug}/${destination.slug}`
    : `/destinations/${destination.slug}`

  return (
    <Link to={href} className="group block bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-44 overflow-hidden">
        <img
          src={destination.image || fallbackImg}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg">{destination.name}</h3>
          {destination.tagline && (
            <p className="text-white/80 text-xs">{destination.tagline}</p>
          )}
        </div>
      </div>
      <div className="p-3 flex items-center justify-between text-xs text-navy-500">
        {destination.bestTime && (
          <span className="flex items-center gap-1"><Calendar size={12} /> {destination.bestTime}</span>
        )}
        {destination.country && (
          <span className="flex items-center gap-1"><MapPin size={12} /> {destination.country}</span>
        )}
      </div>
    </Link>
  )
}
