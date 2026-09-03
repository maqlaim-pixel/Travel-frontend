import { Link } from 'react-router-dom'
import { Users, Heart, Mountain, Waves, Church, Sparkles, Compass, Calendar, Star, ArrowRight } from 'lucide-react'

const HOLIDAY_TYPES = [
  { name: 'Family Holidays', icon: <Users size={24} />, desc: 'Perfect for the whole family', color: 'from-sky-500 to-sky-700', links: ['Family Getaways', 'Beach Holidays', 'Hill Station Holidays', 'Wildlife Holidays'] },
  { name: 'Honeymoon Holidays', icon: <Heart size={24} />, desc: 'Romantic escapes for couples', color: 'from-pink-500 to-rose-600', links: ['Romantic Getaways', 'Beach Honeymoons', 'Luxury Honeymoons', 'Budget Honeymoons'] },
  { name: 'Adventure Holidays', icon: <Mountain size={24} />, desc: 'Thrilling experiences', color: 'from-orange-500 to-red-600', links: ['Trekking', 'Camping', 'Wildlife Safari', 'Water Sports'] },
  { name: 'Beach Holidays', icon: <Waves size={24} />, desc: 'Sun, sand and surf', color: 'from-cyan-500 to-blue-600', links: ['Beach Getaways', 'Island Holidays', 'Tropical Beach', 'Water Sports'] },
  { name: 'Spiritual & Religious', icon: <Church size={24} />, desc: 'Pilgrimage and spiritual journeys', color: 'from-amber-500 to-orange-600', links: ['Pilgrimage Tours', 'Temple Tours', 'Meditation', 'Yoga Holidays'] },
  { name: 'Luxury Holidays', icon: <Sparkles size={24} />, desc: 'Premium experiences', color: 'from-violet-500 to-purple-600', links: ['Luxury Resorts', 'Private Tours', 'Premium Dining', 'Exclusive Experiences'] },
]

const BUDGET_TYPES = [
  { name: 'Budget Holidays', icon: '💰', desc: 'Amazing holidays at the best prices', href: '/holidays/budget' },
  { name: 'Weekend Holidays', icon: '📅', desc: 'Short trips & quick getaways', href: '/holidays/weekend' },
  { name: 'Group Holidays', icon: '👥', desc: 'Perfect for friends and reunions', href: '/holidays/group' },
  { name: 'Solo Holidays', icon: '🎒', desc: 'Travel solo on your terms', href: '/holidays/solo' },
  { name: 'Festival Holidays', icon: '🎉', desc: 'Celebrate with special experiences', href: '/holidays/festival' },
]

export default function HolidaysPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-800 via-navy-800 to-indigo-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 container-wide pb-12 text-white">
          <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-3">
            <Sparkles size={14} /> HOLIDAYS
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Discover Your Perfect Holiday</h1>
          <p className="text-lg text-white/80 max-w-2xl">Discover the perfect holiday for every mood and every moment.</p>
        </div>
      </section>

      {/* Holiday Types Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">Explore by Holiday Type</h2>
            <p className="text-navy-600">Find the perfect holiday for your travel style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOLIDAY_TYPES.map(type => (
              <div key={type.name} className="card overflow-hidden group">
                <div className={`h-3 bg-gradient-to-r ${type.color}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} text-white flex items-center justify-center mb-4`}>
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-xl text-navy-900 mb-2">{type.name}</h3>
                  <p className="text-navy-500 text-sm mb-4">{type.desc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {type.links.map(link => (
                      <li key={link}>
                        <Link to={`/holidays/${type.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${link.toLowerCase().replace(/ /g, '-')}`}
                          className="flex items-center gap-2 text-sm text-navy-600 hover:text-sky-600 transition-colors">
                          <span className="text-sky-400">›</span> {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/holidays/${type.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="inline-flex items-center gap-1 text-sky-600 font-semibold text-sm hover:underline">
                    VIEW ALL <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget / Quick Types */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {BUDGET_TYPES.map(b => (
              <Link key={b.name} to={b.href} className="card p-5 text-center group hover:border-sky-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{b.icon}</div>
                <h4 className="font-bold text-navy-900 group-hover:text-sky-600 transition-colors text-sm mb-1">{b.name}</h4>
                <p className="text-xs text-navy-500">{b.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-sky-600 to-navy-800 text-white">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">Find Your Perfect Holiday Today!</h2>
            <p className="text-white/80">Handpicked destinations • Best prices • Hassle-free holidays</p>
          </div>
          <Link to="/packages" className="btn-gold">EXPLORE HOLIDAYS →</Link>
        </div>
      </section>
    </div>
  )
}
