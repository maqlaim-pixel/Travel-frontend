import { Link } from 'react-router-dom'
import { Heart, MapPin, Building2, Sparkles, BookOpen, Shield, Star, Award, Headphones, ArrowRight } from 'lucide-react'

const INDIAN_DESTINATIONS = [
  'Rajasthan Weddings', 'Goa Weddings', 'Udaipur Weddings', 'Jaipur Weddings',
  'Kerala Weddings', 'Himachal Weddings', 'Kashmir Weddings',
]

const INTERNATIONAL_DESTINATIONS = [
  'Bali Weddings', 'Thailand Weddings', 'Dubai Weddings', 'Maldives Weddings',
  'Singapore Weddings', 'Europe Weddings', 'Mauritius Weddings',
]

const VENUE_TYPES = [
  'Beachfront Venues', 'Palace & Heritage', 'Luxury Resorts', 'Garden & Outdoor',
  'Island Venues', 'Royal Forts', 'Backwater Venues', 'Mountain Venues',
]

const THEMES = [
  'Royal Weddings', 'Beach Weddings', 'Boho Weddings', 'Traditional',
  'Modern Weddings', 'Intimate Weddings', 'Luxury Weddings', 'Eco-friendly',
]

const TRUST_BADGES = [
  { icon: <Shield size={20} />, label: 'HANDPICKED VENUES', desc: 'Curated selection of the most beautiful wedding venues worldwide.' },
  { icon: <Award size={20} />, label: 'EXPERT PLANNERS', desc: 'Dedicated wedding experts to plan your perfect day.' },
  { icon: <Heart size={20} />, label: 'PERSONALIZED SERVICE', desc: 'Tailor-made weddings around your vision.' },
  { icon: <Star size={20} />, label: 'BEST PRICE GUARANTEE', desc: 'Transparent quotes with no hidden costs.' },
  { icon: <Headphones size={20} />, label: 'COMPLETE SUPPORT', desc: 'End-to-end support for a smooth experience.' },
]

export default function WeddingsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-800 via-rose-700 to-amber-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 container-wide pb-12 text-white">
          <div className="flex items-center gap-2 text-gold-300 text-sm font-semibold mb-3">
            <Heart size={14} /> DESTINATION WEDDINGS
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Destination Weddings</h1>
          <p className="text-lg text-white/80 max-w-2xl">Celebrate your love in the most beautiful destinations around the world.</p>
        </div>
      </section>

      {/* Indian + International Destinations */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-sky-600" /> Weddings in India
              </h2>
              <div className="space-y-2">
                {INDIAN_DESTINATIONS.map(d => (
                  <Link key={d} to={`/destination-weddings/india/${d.toLowerCase().replace(/ weddings/g, '').replace(/ /g, '-')}`}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-navy-700 hover:text-sky-600 hover:bg-sky-50 transition-colors text-sm font-medium">
                    <span className="text-sky-400">›</span> {d}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-sky-600" /> International Weddings
              </h2>
              <div className="space-y-2">
                {INTERNATIONAL_DESTINATIONS.map(d => (
                  <Link key={d} to={`/destination-weddings/international/${d.toLowerCase().replace(/ weddings/g, '').replace(/ /g, '-')}`}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-navy-700 hover:text-sky-600 hover:bg-sky-50 transition-colors text-sm font-medium">
                    <span className="text-sky-400">›</span> {d}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues + Themes */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-sky-600" /> Wedding Venues
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {VENUE_TYPES.map(v => (
                  <Link key={v} to={`/destination-weddings/venues/${v.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="flex items-center gap-2 text-sm text-navy-600 hover:text-sky-600 transition-colors py-1">
                    <span className="text-sky-400">›</span> {v}
                  </Link>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-sky-600" /> Wedding Ideas & Themes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map(t => (
                  <Link key={t} to={`/destination-weddings/themes/${t.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-2 text-sm text-navy-600 hover:text-sky-600 transition-colors py-1">
                    <span className="text-sky-400">›</span> {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {TRUST_BADGES.map(b => (
              <div key={b.label} className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-3">
                  {b.icon}
                </div>
                <h4 className="font-bold text-xs text-navy-900 uppercase mb-1">{b.label}</h4>
                <p className="text-xs text-navy-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-rose-600 to-amber-600 text-white">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">Your Dream Wedding, Our Speciality</h2>
            <p className="text-white/80">From planning to perfection, we take care of everything.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-rose-600 font-bold rounded-lg hover:bg-rose-50 transition-colors">
            ENQUIRE FOR WEDDING <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
