import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Calendar, User, Clock, ArrowLeft, Share2, Tag } from 'lucide-react'

const POST = {
  title: '10 Best Places to Visit in Rajasthan',
  category: 'Destinations',
  author: 'Priya Sharma',
  date: 'Jan 15, 2025',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200',
  content: `
Rajasthan, the land of kings, is one of India's most enchanting destinations. From the pink hues of Jaipur to the golden sands of Jaisalmer, every city tells a story of royal grandeur.

## 1. Jaipur — The Pink City
Jaipur, the capital of Rajasthan, is famous for its magnificent palaces and vibrant bazaars. Don't miss the Amber Fort, Hawa Mahal, and City Palace. The Nahargarh Fort sunset is breathtaking.

## 2. Udaipur — City of Lakes
Often called the Venice of the East, Udaipur's Lake Pichola and Jag Mandir are postcard-perfect. The City Palace is a masterpiece of Rajasthani architecture.

## 3. Jodhpur — The Blue City
Mehrangarh Fort towers over the blue-painted old city. The Sardar Market and Jaswant Thada are must-visits.

## 4. Jaisalmer — The Golden City
Jaisalmer Fort is a living fort with shops, hotels, and homes. The Thar Desert safari and Sam Sand Dunes are unforgettable experiences.

## 5. Pushkar
The sacred Pushkar Lake and Brahma Temple attract pilgrims from across India. The annual Pushkar Camel Fair is spectacular.

## 6. Ranthambore
One of India's best tiger reserves, Ranthambore offers thrilling wildlife safaris amid ancient ruins.

## 7. Mount Abu
Rajasthan's only hill station, home to the exquisite Dilwara Jain Temples and serene Nakki Lake.

## 8. Chittorgarh
The massive Chittorgarh Fort is a UNESCO World Heritage Site with stories of Rajput valor.

## 9. Bundi
An offbeat gem with ornate stepwells, palaces, and the Taragarh Fort.

## 10. Bikaner
Famous for its camel festival, Junagarh Fort, and the unique Karni Mata Temple (Rat Temple).
  `,
}

export default function BlogDetail() {
  return (
    <div className="bg-gray-50">
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={POST.image} alt={POST.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 container-wide py-10">
          <span className="badge-blue mb-3 inline-block">{POST.category}</span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">{POST.title}</h1>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1"><User size={14} /> {POST.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {POST.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {POST.readTime}</span>
          </div>
        </div>
      </section>

      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 text-sm">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <article className="bg-white rounded-xl border p-8">
            <div className="prose prose-lg max-w-none">
              {POST.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-display font-bold text-navy-900 mt-8 mb-3">{line.replace('## ', '')}</h2>
                if (line.trim() === '') return <br key={i} />
                return <p key={i} className="text-navy-600 leading-relaxed mb-4">{line}</p>
              })}
            </div>
          </article>

          <div className="mt-8 flex gap-4">
            <button className="btn-primary flex items-center gap-2"><Share2 size={16} /> Share Article</button>
          </div>
        </div>
      </div>
    </div>
  )
}
