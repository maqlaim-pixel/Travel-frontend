import { useState } from 'react'
import { Calendar, Users, MapPin, Heart, ArrowRight, CheckCircle } from 'lucide-react'

const INTERESTS = ['Heritage', 'Beach', 'Adventure', 'Honeymoon', 'Family', 'Wildlife', 'Luxury', 'Pilgrimage', 'Food', 'Photography']

export default function PlanTripPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ destination: '', dates: '', travelers: '', interests: [] })

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-navy-900 to-sky-900 text-white py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Plan My Trip</h1>
          <p className="text-navy-200 max-w-xl mx-auto">Tell us your preferences and our experts will craft the perfect itinerary</p>
        </div>
      </section>

      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s ? 'bg-sky-600 text-white' : 'bg-navy-100 text-navy-400'
                }`}>{step > s ? '✓' : s}</div>
                <span className={`text-sm hidden sm:block ${step >= s ? 'text-navy-900 font-medium' : 'text-navy-400'}`}>
                  {s === 1 ? 'Destination' : s === 2 ? 'Dates & Travelers' : 'Interests'}
                </span>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-sky-600' : 'bg-navy-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-navy-900">Where do you want to go?</h2>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Destination</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-3.5 text-navy-400" />
                    <input type="text" placeholder="e.g., Rajasthan, Kerala, Dubai..." value={form.destination}
                      onChange={e => setForm({ ...form, destination: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Rajasthan', 'Kerala', 'Goa', 'Ladakh', 'Switzerland', 'Thailand'].map(d => (
                    <button key={d} onClick={() => setForm({ ...form, destination: d })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        form.destination === d ? 'bg-sky-50 border-sky-500 text-sky-700' : 'hover:bg-navy-50 text-navy-700'
                      }`}>{d}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-navy-900">When and how many travelers?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Travel Dates</label>
                    <input type="text" placeholder="e.g., March 15-20, 2025" value={form.dates}
                      onChange={e => setForm({ ...form, dates: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-1.5">Number of Travelers</label>
                    <select value={form.travelers} onChange={e => setForm({ ...form, travelers: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none">
                      <option value="">Select</option>
                      {['1 Person', '2 People', '3-5 People', '6-10 People', '10+ People'].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold text-navy-900">What are your interests?</h2>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map(interest => (
                    <button key={interest} onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                        form.interests.includes(interest) ? 'bg-sky-600 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'
                      }`}>
                      {interest}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Any special requests?</label>
                  <textarea rows={3} placeholder="Tell us anything else about your trip..." className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none" />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 border rounded-lg text-navy-700 hover:bg-navy-50 transition-colors">Back</button>
              ) : <div />}
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="btn-primary flex items-center gap-2">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button className="btn-primary flex items-center gap-2">
                  <CheckCircle size={16} /> Submit Trip Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
