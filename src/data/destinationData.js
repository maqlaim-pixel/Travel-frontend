// Dynamic destination data keyed by slug
// Used by DestinationDetail.jsx — fully data-driven, no hardcoding

const U = 'https://images.unsplash.com'

const DESTINATIONS = {
  // ═══════════════════════════════════════════
  // GUJARAT DESTINATIONS
  // ═══════════════════════════════════════════
  ahmedabad: {
    name: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Heritage, Food & Culture',
    image: U + '/photo-1609766418204-94aae0ecfab5?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '25°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Ahmedabad is a vibrant blend of rich heritage, culture, history, shopping, food and modern lifestyle. A UNESCO World Heritage City and the first Indian city to be inscribed as a World Heritage Site. Known for its magnificent stepwells, ancient temples, bustling bazaars, and the world-famous Gujarati cuisine.',
    highlights: [
      'Sabarmati Ashram — Mahatma Gandhi\'s home',
      'Adalaj Stepwell — stunning 15th century architecture',
      'Sidi Saiyyed Mosque — iconic stone latticework',
      'Kankaria Lake — family entertainment hub',
      'Manek Chowk — famous night food market',
      'Old Ahmedabad Heritage Walk',
      'Science City — interactive science museum',
    ],
    attractions: [
      { name: 'Sabarmati Ashram', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Historic ashram of Mahatma Gandhi, symbol of India\'s freedom struggle' },
      { name: 'Adalaj Stepwell', image: U + '/photo-1580687774146-06e21c6d77f9?w=400&h=300&fit=crop', desc: 'Magnificent 15th century stepwell with intricate Indo-Islamic architecture' },
      { name: 'Sidi Saiyyed Mosque', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'Famous for its exquisite stone latticework windows (jalis)' },
      { name: 'Kankaria Lake', image: U + '/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', desc: 'Circular lakefront with zoo, amusement park and boating' },
    ],
    food: [
      'Gujarati Thali — traditional full-course meal',
      'Fafda and Jalebi — classic Ahmedabad breakfast',
      'Khaman — steamed chickpea flour snack',
      'Manek Chowk Street Food — night market delicacies',
      'Dhokla — steamed fermented rice and chickpea snack',
      'Undhiyu — seasonal mixed vegetable dish',
    ],
    packages: [
      { title: 'Ahmedabad Heritage Walk', duration: '3D/2N', price: 8999, rating: 4.7 },
      { title: 'Ahmedabad Food and Culture Tour', duration: '4D/3N', price: 12999, rating: 4.8 },
      { title: 'Ahmedabad Weekend Getaway', duration: '2D/1N', price: 5999, rating: 4.5 },
    ],
  },

  dwarka: {
    name: 'Dwarka',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Spiritual Capital of Gujarat',
    image: U + '/photo-1590050752117-29885e590d8e?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '26°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Dwarka is one of the four sacred Char Dham pilgrimage sites and the legendary capital of Lord Krishna\'s kingdom. Located on the western tip of Gujarat, it is home to the magnificent Dwarkadhish Temple and stunning beaches along the Arabian Sea.',
    highlights: [
      'Dwarkadhish Temple — one of Char Dham',
      'Bet Dwarka — island associated with Lord Krishna',
      'Dwarka Beach — serene sunset views',
      'Nageshwar Jyotirlinga — sacred Shiva temple',
      'Rukmini Devi Temple — ancient temple',
      'Gomti Ghat — sacred bathing ghats',
    ],
    attractions: [
      { name: 'Dwarkadhish Temple', image: U + '/photo-1590050752117-29885e590d8e?w=400&h=300&fit=crop', desc: 'Magnificent temple dedicated to Lord Krishna, one of Char Dham' },
      { name: 'Bet Dwarka', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Island believed to be Lord Krishna\'s original residence' },
      { name: 'Nageshwar Jyotirlinga', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'One of the 12 sacred Jyotirlingas of Lord Shiva' },
      { name: 'Dwarka Beach', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Peaceful beach with stunning Arabian Sea views' },
    ],
    food: [
      'Gujarati Kathiawadi Thali',
      'Dahi Vada — lentil dumplings in yogurt',
      'Mohanthal — gram flour sweet',
      'Fresh Seafood — coastal delicacies',
    ],
    packages: [
      { title: 'Dwarka Darshan Tour', duration: '3D/2N', price: 7999, rating: 4.6 },
      { title: 'Dwarka and Somnath Pilgrimage', duration: '5D/4N', price: 14999, rating: 4.8 },
    ],
  },

  somnath: {
    name: 'Somnath',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Eternal Shrine — First Jyotirlinga',
    image: U + '/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '27°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Somnath is home to the first among the twelve Jyotirlingas of Lord Shiva. The magnificent temple on the Arabian Sea coast is a symbol of faith and resilience, having been rebuilt multiple times throughout history.',
    highlights: [
      'Somnath Temple — first Jyotirlinga',
      'Triveni Sangam — confluence of rivers',
      'Somnath Beach — stunning coastal views',
      'Light and Sound Show — temple history narration',
      'Laxminarayan Temple — nearby sacred site',
      'Geeta Mandir — spiritual center',
    ],
    attractions: [
      { name: 'Somnath Temple', image: U + '/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', desc: 'First Jyotirlinga of Lord Shiva, rebuilt in Chalukya style' },
      { name: 'Triveni Sangam', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Sacred confluence of Hiran, Kapila and Saraswati rivers' },
      { name: 'Somnath Beach', image: U + '/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', desc: 'Beautiful beach with sunset views near the temple' },
      { name: 'Light and Sound Show', image: U + '/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', desc: 'Evening show narrating the temple\'s glorious history' },
    ],
    food: [
      'Gujarati Kathiawadi Thali',
      'Fresh Coastal Seafood',
      'Thepla and Kadhi — traditional Gujarati',
    ],
    packages: [
      { title: 'Somnath Spiritual Tour', duration: '3D/2N', price: 8499, rating: 4.7 },
      { title: 'Gujarat Pilgrimage Circuit', duration: '7D/6N', price: 21999, rating: 4.9 },
    ],
  },

  palitana: {
    name: 'Palitana',
    state: 'Gujarat',
    country: 'India',
    tagline: 'City of Temples — Jain Pilgrimage',
    image: U + '/photo-1548013146-72479768bada?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '28°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Palitana is the world\'s largest cluster of Jain temples, situated on Shatrunjaya hill. With over 900 temples spread across the hilltop, it is the most sacred pilgrimage site for Jains worldwide.',
    highlights: [
      'Shatrunjaya Hill — 900+ Jain temples',
      'Temple City — world\'s largest temple cluster',
      'Panoramic views from the hilltop',
      'Ancient Jain architecture and sculptures',
      'Sacred pilgrimage for Jains',
    ],
    attractions: [
      { name: 'Shatrunjaya Temples', image: U + '/photo-1548013146-72479768bada?w=400&h=300&fit=crop', desc: 'Over 900 Jain temples on the hilltop, largest temple cluster in the world' },
      { name: 'Palitana Fort', image: U + '/photo-1580687774146-06e21c6d77f9?w=400&h=300&fit=crop', desc: 'Historic fort with panoramic views of the temple city' },
      { name: 'Stepwell Architecture', image: U + '/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', desc: 'Beautiful stepwells with intricate carvings' },
      { name: 'Vallabhipur Ruins', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'Ancient ruins of the former capital' },
    ],
    food: [
      'Jain Cuisine — no onion, no garlic',
      'Gujarati Kathiawadi Thali',
      'Traditional Sweets',
    ],
    packages: [
      { title: 'Palitana Temple Tour', duration: '2D/1N', price: 5999, rating: 4.6 },
      { title: 'Gujarat Pilgrimage Package', duration: '5D/4N', price: 15999, rating: 4.8 },
    ],
  },

  kutch: {
    name: 'Kutch',
    state: 'Gujarat',
    country: 'India',
    tagline: 'White Desert and Cultural Richness',
    image: U + '/photo-1512343879784-a960bf40e7f2?w=1200&h=600&fit=crop',
    bestTime: 'October to February',
    avgTemp: '24°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Kutch is a mesmerizing district of Gujarat known for the Great Rann of Kutch — a vast white salt desert. During Rann Utsav, it transforms into a cultural extravaganza with folk music, dance, handicrafts and camel rides under the moonlit sky.',
    highlights: [
      'Great Rann of Kutch — vast white salt desert',
      'Rann Utsav — cultural festival (Nov-Feb)',
      'Bhuj — historic city and arts center',
      'Wild Ass Sanctuary — Indian wild ass habitat',
      'Handicraft Villages — Ajrakh, Bandhani, Rabari',
      'Mandvi Beach — pristine coastal beauty',
    ],
    attractions: [
      { name: 'Great Rann of Kutch', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Stunning white salt desert stretching to the horizon' },
      { name: 'Bhuj', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Historic city with palaces, museums and craft villages' },
      { name: 'Mandvi Beach', image: U + '/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', desc: 'Beautiful beach near the Rann with Vijay Vilas Palace' },
      { name: 'Kutch Museum', image: U + '/photo-1548013146-72479768bada?w=400&h=300&fit=crop', desc: 'Museum showcasing Kutch rich cultural heritage' },
    ],
    food: [
      'Kutchi Dabeli — spiced potato burger',
      'Kadhi Khichdi — comfort food',
      'Traditional Kutchi Thali',
      'Sindhi Cuisine influences',
    ],
    packages: [
      { title: 'Rann Utsav Experience', duration: '4D/3N', price: 12999, rating: 4.9 },
      { title: 'Kutch Cultural Tour', duration: '5D/4N', price: 16999, rating: 4.7 },
    ],
  },

  gir: {
    name: 'Gir',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Home of the Asiatic Lion',
    image: U + '/photo-1477587458883-47145ed94245?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '27°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Gir National Park is the last refuge of the Asiatic lion and one of India\'s most successful wildlife conservation stories. The dry deciduous forests are home to lions, leopards, deer, and over 300 species of birds.',
    highlights: [
      'Asiatic Lion Safari — last wild population',
      'Gir National Park — 1412 sq km sanctuary',
      'Bird Watching — 300+ species',
      'Devalia Safari Park — eco-tourism zone',
      'Kamleshwar Dam — scenic spot',
      'Tribal Villages — Maldhari community',
    ],
    attractions: [
      { name: 'Gir National Park', image: U + '/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop', desc: 'Last home of Asiatic lions with thrilling jeep safaris' },
      { name: 'Devalia Safari Park', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Eco-tourism zone for easy wildlife viewing' },
      { name: 'Kamleshwar Dam', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'Scenic dam with crocodile watching' },
      { name: 'Somnath Temple', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Nearby sacred Jyotirlinga temple' },
    ],
    food: [
      'Kathiwadi Thali',
      'Traditional Maldhari Cuisine',
      'Fresh Forest Produce dishes',
    ],
    packages: [
      { title: 'Gir Lion Safari', duration: '3D/2N', price: 11999, rating: 4.8 },
      { title: 'Gir and Somnath Combo', duration: '5D/4N', price: 18999, rating: 4.9 },
    ],
  },

  saputara: {
    name: 'Saputara',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Gujarat\'s Hill Station Paradise',
    image: U + '/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '20°C',
    languages: 'Gujarati, Hindi, English',
    description: 'Saputara is Gujarat\'s only hill station, nestled in the Sahyadri range at 1000m elevation. Known for its pleasant climate, lush green hills, lakes, and tribal culture, it offers a perfect escape from the plains.',
    highlights: [
      'Saputara Lake — boating and sunset views',
      'Table Point — panoramic hilltop views',
      'Artist Village — tribal art and crafts',
      'Rose Garden — beautiful floral garden',
      'Governor\'s Hill — trekking spot',
      'Lake Garden — family-friendly park',
    ],
    attractions: [
      { name: 'Saputara Lake', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Beautiful artificial lake with boating facilities' },
      { name: 'Table Point', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'Hilltop viewpoint with stunning valley views' },
      { name: 'Artist Village', image: U + '/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', desc: 'Tribal art center showcasing local craftsmanship' },
      { name: 'Governor\'s Hill', image: U + '/photo-1548013146-72479768bada?w=400&h=300&fit=crop', desc: 'Trekking spot with panoramic views' },
    ],
    food: [
      'Gujarati Kathiawadi Thali',
      'Tribal Cuisine',
      'Street Food at Lake Garden',
    ],
    packages: [
      { title: 'Saputara Hill Station Tour', duration: '3D/2N', price: 7999, rating: 4.5 },
      { title: 'Saputara Weekend Getaway', duration: '2D/1N', price: 4999, rating: 4.4 },
    ],
  },

  diu: {
    name: 'Diu',
    state: 'Gujarat',
    country: 'India',
    tagline: 'Portuguese Heritage and Beach Paradise',
    image: U + '/photo-1512343879784-a960bf40e7f2?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '26°C',
    languages: 'Gujarati, Hindi, English, Portuguese',
    description: 'Diu is a serene island territory with a rich Portuguese colonial heritage. Known for its pristine beaches, historic fort, and laid-back island vibes, it offers a unique blend of Indian and Portuguese culture.',
    highlights: [
      'Diu Fort — Portuguese-era fortress',
      'Nagoa Beach — crescent-shaped beach',
      'St. Paul\'s Church — baroque architecture',
      'Diu Museum — colonial artifacts',
      'Shell Museum — unique collection',
      'Naida Caves — natural limestone caves',
    ],
    attractions: [
      { name: 'Diu Fort', image: U + '/photo-1548013146-72479768bada?w=400&h=300&fit=crop', desc: '16th century Portuguese fort with lighthouse and cannons' },
      { name: 'Nagoa Beach', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Beautiful palm-fringed crescent beach' },
      { name: 'St. Paul\'s Church', image: U + '/photo-1590050752117-29885e590d8e?w=400&h=300&fit=crop', desc: 'Magnificent baroque church built in 1610' },
      { name: 'Naida Caves', image: U + '/photo-1580687774146-06e21c6d77f9?w=400&h=300&fit=crop', desc: 'Natural limestone caves with stunning formations' },
    ],
    food: [
      'Portuguese-influenced Seafood',
      'Gujarati Coastal Cuisine',
      'Fresh Fish Curry',
    ],
    packages: [
      { title: 'Diu Island Escape', duration: '3D/2N', price: 9999, rating: 4.6 },
      { title: 'Diu and Diu Fort Heritage Tour', duration: '2D/1N', price: 6499, rating: 4.5 },
    ],
  },

  // ═══════════════════════════════════════════
  // OTHER STATE DESTINATIONS (fallback)
  // ═══════════════════════════════════════════
  jaipur: {
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    tagline: 'The Pink City',
    image: U + '/photo-1477587458883-47145ed94245?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '22°C',
    languages: 'Hindi, Rajasthani, English',
    description: 'Jaipur is the capital of Rajasthan, known for its iconic pink buildings, magnificent forts and palaces. A UNESCO World Heritage City and gateway to Rajasthan\'s royal heritage.',
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort'],
    attractions: [
      { name: 'Amber Fort', image: U + '/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop', desc: 'Magnificent hilltop fort with stunning architecture' },
      { name: 'Hawa Mahal', image: U + '/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop', desc: 'Palace of Winds with 953 pink sandstone windows' },
    ],
    food: ['Dal Baati Churma', 'Ghewar', 'Pyaaz Kachori'],
    packages: [
      { title: 'Jaipur Heritage Tour', duration: '3D/2N', price: 12999, rating: 4.8 },
    ],
  },

  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    tagline: 'The City of Dreams',
    image: U + '/photo-1529253873976-e1d329372604?w=1200&h=600&fit=crop',
    bestTime: 'November to February',
    avgTemp: '27°C',
    languages: 'Marathi, Hindi, English',
    description: 'Mumbai is India\'s largest city and financial capital, known for Bollywood, colonial architecture, vibrant nightlife and the Gateway of India.',
    highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Juhu Beach', 'CST Station'],
    attractions: [
      { name: 'Gateway of India', image: U + '/photo-1529253873976-e1d329372604?w=400&h=300&fit=crop', desc: 'Iconic arch monument overlooking the Arabian Sea' },
      { name: 'Marine Drive', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Queen\'s Necklace — iconic seaside boulevard' },
    ],
    food: ['Vada Pav', 'Pav Bhaji', 'Bombil Fry'],
    packages: [
      { title: 'Mumbai City Tour', duration: '3D/2N', price: 14999, rating: 4.7 },
    ],
  },

  goa: {
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    tagline: 'Beach Paradise',
    image: U + '/photo-1512343879784-a960bf40e7f2?w=1200&h=600&fit=crop',
    bestTime: 'November to February',
    avgTemp: '28°C',
    languages: 'Konkani, Hindi, English',
    description: 'Goa is India\'s smallest state but biggest party destination, known for its pristine beaches, Portuguese churches, vibrant nightlife and spice plantations.',
    highlights: ['Baga Beach', 'Basilica of Bom Jesus', 'Fort Aguada', 'Dudhsagar Falls', 'Palolem Beach'],
    attractions: [
      { name: 'Baga Beach', image: U + '/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', desc: 'Popular beach with water sports and nightlife' },
      { name: 'Basilica of Bom Jesus', image: U + '/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', desc: 'UNESCO Heritage church in Old Goa' },
    ],
    food: ['Fish Curry Rice', 'Bebinca', 'Vindaloo'],
    packages: [
      { title: 'Goa Beach Holiday', duration: '4D/3N', price: 11999, rating: 4.7 },
    ],
  },

  // Generic fallback for unknown destinations
  default: {
    name: 'Destination',
    state: '',
    country: 'India',
    tagline: 'Explore India',
    image: U + '/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    bestTime: 'October to March',
    avgTemp: '25°C',
    languages: 'Hindi, English',
    description: 'Discover this amazing destination with its rich culture, heritage, and natural beauty. Plan your trip with us for an unforgettable experience.',
    highlights: ['Cultural Heritage', 'Natural Beauty', 'Local Cuisine', 'Historical Sites'],
    attractions: [
      { name: 'Local Attractions', image: U + '/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', desc: 'Explore the best of this destination' },
    ],
    food: ['Local Cuisine', 'Traditional Dishes', 'Street Food'],
    packages: [],
  },
}

// Slug aliases — compound slugs map to single-word keys
var SLUG_ALIASES = {
  'mumbai-maharashtra': 'mumbai',
  'pune-maharashtra': 'mumbai',
  'goa-goa': 'goa',
  'bangalore-karnataka': 'mumbai',
  'chennai-tamil-nadu': 'mumbai',
  'jaipur-rajasthan': 'jaipur',
  'udaipur-rajasthan': 'jaipur',
  'jodhpur-rajasthan': 'jaipur',
}

export function getDestinationData(slug) {
  var key = SLUG_ALIASES[slug] || slug
  return DESTINATIONS[key] || {
    ...DESTINATIONS.default,
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase() }) : 'Destination',
  }
}

export default DESTINATIONS
