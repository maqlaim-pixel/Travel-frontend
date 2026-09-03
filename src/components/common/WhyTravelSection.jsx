import { Landmark, Compass, Users, TreePalm, Palmtree, Mountain, Shield, Star, Heart, Award, Globe, Plane, Ship, Fish, Sunrise, Snowflake, Camera, Music, UtensilsCrossed, Building, Castle, Waves, Wind, Gem, Crown } from 'lucide-react'

export default function WhyTravelSection({ title, subtitle, items }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-1 bg-gold-500" />
            <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">{subtitle}</span>
            <div className="w-12 h-1 bg-gold-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {items.map((item, i) => {
            const Icon = item.Icon || item.icon
            if (!Icon) return null
            const isEmoji = typeof Icon === 'string'
            return (
              <div key={i} className="text-center p-6 rounded-2xl border border-amber-100 bg-amber-50/30 hover:border-amber-300 hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
                  {isEmoji ? <span className="text-3xl">{Icon}</span> : <Icon size={28} className="text-amber-600" strokeWidth={1.5} />}
                </div>
                <h3 className="font-bold text-navy-900 text-sm mb-1">{item.title}</h3>
                <p className="text-navy-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
