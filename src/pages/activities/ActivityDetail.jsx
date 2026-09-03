import { useParams } from 'react-router-dom'
import { MapPin, Clock, Star, Users, Check, Shield, Calendar } from 'lucide-react'

const ACTIVITY = {
  name: 'Paragliding in Bir Billing',
  location: 'Himachal Pradesh, India',
  duration: '1 Day',
  price: 3500,
  rating: 4.9,
  reviews: 245,
  difficulty: 'Moderate',
  image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200',
  description: 'Experience the thrill of flying over the stunning Dhauladhar range in Bir Billing, the paragliding capital of India. Tandem flights with certified pilots ensure a safe yet exhilarating experience.',
  highlights: ['30-minute tandem flight', 'Certified pilot', 'GoPro footage included', 'Stunning Himalayan views', 'Hotel pickup & drop'],
  includes: ['Professional pilot', 'All equipment', 'GoPro video', 'Insurance', 'Transport'],
  bestTime: 'March to June, September to November',
  minAge: 12,
  maxWeight: 100,
}

export default function ActivityDetail() {
  return (
    <div className="bg-gray-50">
      <section className="relative h-[45vh] min-h-[350px]">
        <img src={ACTIVITY.image} alt={ACTIVITY.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 container-wide py-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{ACTIVITY.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><MapPin size={14} /> {ACTIVITY.location}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {ACTIVITY.duration}</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-gold-400 fill-gold-400" /> {ACTIVITY.rating}</span>
          </div>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-display font-bold text-navy-900 mb-3">About</h2>
                <p className="text-navy-600 leading-relaxed">{ACTIVITY.description}</p>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-display font-bold text-navy-900 mb-3">Highlights</h2>
                <div className="space-y-2">
                  {ACTIVITY.highlights.map(h => (
                    <div key={h} className="flex items-center gap-2 text-navy-700"><Check size={16} className="text-sky-500" /> {h}</div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-xl font-display font-bold text-navy-900 mb-3">What's Included</h2>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVITY.includes.map(i => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-700"><Check size={14} className="text-green-500" /> {i}</div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className="bg-white rounded-xl border p-6 sticky top-24 space-y-6">
                <div>
                  <p className="text-sm text-navy-500 mb-1">Per person</p>
                  <p className="text-3xl font-bold text-sky-600">₹{ACTIVITY.price.toLocaleString()}</p>
                </div>
                <button className="w-full btn-primary">Book Now</button>
                <button className="w-full btn-secondary">Enquire</button>
                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-navy-600"><span>Duration</span><span className="font-medium">{ACTIVITY.duration}</span></div>
                  <div className="flex justify-between text-navy-600"><span>Difficulty</span><span className="font-medium">{ACTIVITY.difficulty}</span></div>
                  <div className="flex justify-between text-navy-600"><span>Min Age</span><span className="font-medium">{ACTIVITY.minAge}+</span></div>
                  <div className="flex justify-between text-navy-600"><span>Best Time</span><span className="font-medium">{ACTIVITY.bestTime}</span></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
