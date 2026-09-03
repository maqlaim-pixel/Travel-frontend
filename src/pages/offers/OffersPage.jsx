import { Link } from 'react-router-dom'
import { Tag, Clock, MapPin, ArrowRight, Percent } from 'lucide-react'

const OFFERS = [
  { title: 'Early Bird Discount — Kerala', slug: 'early-bird-kerala', discount: '25%', description: 'Book 30 days in advance and save 25% on all Kerala packages.', validUntil: 'Mar 31, 2025', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600' },
  { title: 'Honeymoon Special — Maldives', slug: 'honeymoon-maldives', discount: '20%', description: 'Romantic Maldives getaway with free spa session and candlelight dinner.', validUntil: 'Apr 15, 2025', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600' },
  { title: 'Summer Sale — Ladakh', slug: 'summer-ladakh', discount: '15%', description: 'Explore Ladakh this summer at special prices. Includes all meals and transfers.', validUntil: 'Jun 30, 2025', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600' },
  { title: 'Family Package Deal — Goa', slug: 'family-goa-deal', discount: '30%', description: 'Family of 4 stays for the price of 3. Includes water activities.', validUntil: 'May 20, 2025', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600' },
]

export default function OffersPage() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-navy-900 to-sky-900 text-white py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Travel Offers</h1>
          <p className="text-navy-200 max-w-xl mx-auto">Exclusive deals and discounts on our most popular packages</p>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFERS.map(o => (
              <div key={o.slug} className="card overflow-hidden group">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <img src={o.image} alt={o.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl text-2xl font-bold">
                    {o.discount} OFF
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{o.title}</h3>
                  <p className="text-navy-600 mb-4">{o.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-navy-500 flex items-center gap-1"><Clock size={14} /> Valid until {o.validUntil}</span>
                    <button className="btn-primary text-sm !px-4 !py-2">View Offer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
