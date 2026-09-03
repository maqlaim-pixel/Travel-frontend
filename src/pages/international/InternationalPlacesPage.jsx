import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Search, Star, Clock, MapPin, ChevronLeft, ChevronRight, Phone, Mail, Send, ArrowRight, Compass, Globe, Ticket } from 'lucide-react'
import api from '../../services/api'

// ═══════════════════════════════════════════════════════════════
// PLACE CATEGORIES — All 9 international places to visit
// ═══════════════════════════════════════════════════════════════
const PLACES = {
  '': {
    name: 'Top Places to Visit',
    slug: '',
    tagline: 'Must-Visit Places Around the World',
    description: 'Discover the most incredible places to visit across the globe — from iconic landmarks and museums to beaches, parks and shopping destinations.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&h=600&fit=crop',
    heroIcon: '🗺️',
    places: [
      { name: 'Eiffel Tower, Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop', country: 'europe', city: 'Paris', desc: 'The most iconic landmark in the world, lit up every night', category: 'Landmark', rating: 4.9, timing: '9:30 AM - 11:45 PM' },
      { name: 'Burj Khalifa, Dubai', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Tallest building in the world at 828 meters', category: 'Landmark', rating: 4.8, timing: '10:00 AM - 11:00 PM' },
      { name: 'Colosseum, Rome', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop', country: 'europe', city: 'Rome', desc: 'Ancient Roman amphitheatre — a wonder of engineering', category: 'Landmark', rating: 4.8, timing: '8:30 AM - 7:00 PM' },
      { name: 'Great Wall of China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'china', city: 'Beijing', desc: '13,000 miles of ancient defensive wall', category: 'Landmark', rating: 4.9, timing: '7:30 AM - 5:30 PM' },
      { name: 'Maldives Beaches', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop', country: 'maldives', city: 'Malé', desc: 'Pristine white sand and crystal clear waters', category: 'Beach', rating: 4.9, timing: 'Open 24 hours' },
      { name: 'Universal Studios, Singapore', image: 'https://images.unsplash.com/photo-1508355576831-e567172eb43a?w=400&h=300&fit=crop', country: 'singapore', city: 'Sentosa', desc: 'Hollywood-themed amusement park with thrilling rides', category: 'Theme Park', rating: 4.7, timing: '10:00 AM - 7:00 PM' },
      { name: 'Senso-ji Temple, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Tokyo oldest Buddhist temple in historic Asakusa', category: 'Religious', rating: 4.8, timing: '6:00 AM - 5:00 PM' },
      { name: 'Marina Bay Sands, Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Iconic integrated resort with infinity pool', category: 'Landmark', rating: 4.7, timing: 'Open 24 hours' },
      { name: 'Louvre Museum, Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop', country: 'europe', city: 'Paris', desc: 'World largest art museum, home to Mona Lisa', category: 'Museum', rating: 4.9, timing: '9:00 AM - 6:00 PM' },
      { name: 'Orchard Road, Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Premier shopping belt with luxury brands and malls', category: 'Shopping', rating: 4.7, timing: '10:00 AM - 10:00 PM' },
      { name: 'Yosemite National Park, USA', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'usa', city: 'California', desc: 'Iconic granite cliffs, waterfalls and giant sequoias', category: 'National Park', rating: 4.9, timing: 'Open 24 hours' },
      { name: 'Milford Sound, New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Breathtaking fjord with waterfalls and wildlife', category: 'Waterfall', rating: 4.9, timing: 'Cruises daily' },
    ],
  },

  landmarks: {
    name: 'Famous Landmarks',
    slug: 'landmarks',
    tagline: 'Iconic Monuments & Structures',
    description: 'Visit the world most famous landmarks — architectural marvels, historic monuments and structures that define cities and nations.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&h=600&fit=crop',
    heroIcon: '🗼',
    places: [
      { name: 'Eiffel Tower, Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop', country: 'europe', city: 'Paris', desc: 'Iconic iron tower — symbol of Paris and France', category: 'Landmark', rating: 4.9, timing: '9:30 AM - 11:45 PM' },
      { name: 'Burj Khalifa, Dubai', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Tallest building in the world at 828 meters', category: 'Landmark', rating: 4.8, timing: '10:00 AM - 11:00 PM' },
      { name: 'Colosseum, Rome', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop', country: 'europe', city: 'Rome', desc: 'Ancient amphitheatre — 50,000 spectators capacity', category: 'Landmark', rating: 4.8, timing: '8:30 AM - 7:00 PM' },
      { name: 'Great Wall of China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'china', city: 'Beijing', desc: '2,300-year-old defensive wall stretching 13,000 miles', category: 'Landmark', rating: 4.9, timing: '7:30 AM - 5:30 PM' },
      { name: 'Sydney Opera House', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop', country: 'australia', city: 'Sydney', desc: 'UNESCO World Heritage shell-shaped performing arts center', category: 'Landmark', rating: 4.8, timing: '9:00 AM - 5:00 PM' },
      { name: 'Statue of Liberty, New York', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=300&fit=crop', country: 'usa', city: 'New York', desc: 'Iconic symbol of freedom gifted by France', category: 'Landmark', rating: 4.8, timing: '8:30 AM - 4:00 PM' },
      { name: 'Marina Bay Sands, Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Iconic boat-shaped rooftop with infinity pool', category: 'Landmark', rating: 4.7, timing: 'Open 24 hours' },
      { name: 'Petronas Towers, Kuala Lumpur', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Twin towers — former world tallest buildings', category: 'Landmark', rating: 4.7, timing: '9:00 AM - 9:00 PM' },
      { name: 'Tower of London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', country: 'europe', city: 'London', desc: 'Historic castle housing the Crown Jewels', category: 'Landmark', rating: 4.8, timing: '9:00 AM - 5:30 PM' },
      { name: 'Big Ben, London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', country: 'europe', city: 'London', desc: 'Iconic clock tower at the Houses of Parliament', category: 'Landmark', rating: 4.7, timing: 'Exterior viewing' },
      { name: 'Forbidden City, Beijing', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'china', city: 'Beijing', desc: 'Vast imperial palace with 9,999 rooms', category: 'Landmark', rating: 4.8, timing: '8:30 AM - 5:00 PM' },
      { name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop', country: 'india', city: 'Agra', desc: 'UNESCO World Heritage marble mausoleum of love', category: 'Landmark', rating: 4.9, timing: '6:00 AM - 6:30 PM' },
    ],
  },

  museums: {
    name: 'Museums & Galleries',
    slug: 'museums',
    tagline: 'Art, History & Cultural Treasures',
    description: 'Explore world-class museums and art galleries — from Renaissance masterpieces to ancient artifacts and contemporary installations.',
    heroImage: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1400&h=600&fit=crop',
    heroIcon: '🎨',
    places: [
      { name: 'Louvre Museum, Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop', country: 'europe', city: 'Paris', desc: 'World largest art museum — Mona Lisa, Venus de Milo', category: 'Museum', rating: 4.9, timing: '9:00 AM - 6:00 PM' },
      { name: 'British Museum, London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', country: 'europe', city: 'London', desc: '8 million artifacts spanning 2 million years of history', category: 'Museum', rating: 4.8, timing: '10:00 AM - 5:00 PM' },
      { name: 'Metropolitan Museum of Art, NYC', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=300&fit=crop', country: 'usa', city: 'New York', desc: '2 million+ works spanning 5,000 years of art', category: 'Museum', rating: 4.8, timing: '10:00 AM - 5:00 PM' },
      { name: 'National Museum, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Japan oldest and largest museum with national treasures', category: 'Museum', rating: 4.7, timing: '9:30 AM - 5:00 PM' },
      { name: 'Vatican Museums, Rome', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop', country: 'europe', city: 'Rome', desc: 'Sistine Chapel, Raphael Rooms and papal collections', category: 'Museum', rating: 4.9, timing: '8:00 AM - 7:00 PM' },
      { name: 'National Gallery, Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Largest visual arts venue in Southeast Asia', category: 'Gallery', rating: 4.6, timing: '10:00 AM - 7:00 PM' },
      { name: 'War Remnants Museum, HCMC', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop', country: 'vietnam', city: 'Ho Chi Minh City', desc: 'Powerful museum about the Vietnam War', category: 'Museum', rating: 4.7, timing: '7:30 AM - 5:30 PM' },
      { name: '798 Art District, Beijing', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'china', city: 'Beijing', desc: 'Contemporary art zone in converted factory complex', category: 'Gallery', rating: 4.6, timing: '10:00 AM - 6:00 PM' },
      { name: 'TeamLab Borderless, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Imersive digital art museum — walk through artworks', category: 'Museum', rating: 4.8, timing: '10:00 AM - 9:00 PM' },
      { name: 'Rijksmuseum, Amsterdam', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop', country: 'europe', city: 'Amsterdam', desc: 'Dutch Masters — Rembrandt, Vermeer masterpieces', category: 'Museum', rating: 4.8, timing: '9:00 AM - 5:00 PM' },
      { name: 'Pergamon Museum, Berlin', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop', country: 'europe', city: 'Berlin', desc: 'Ancient architectural reconstructions and artifacts', category: 'Museum', rating: 4.7, timing: '10:00 AM - 6:00 PM' },
      { name: 'ArtScience Museum, Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Lotus-shaped museum with futuristic exhibitions', category: 'Museum', rating: 4.6, timing: '10:00 AM - 7:00 PM' },
    ],
  },

  'theme-parks': {
    name: 'Theme Parks',
    slug: 'theme-parks',
    tagline: 'Thrilling Rides & Fun for All Ages',
    description: 'The most exciting international theme parks — roller coasters, water rides, character experiences and family entertainment.',
    heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1400&h=600&fit=crop',
    heroIcon: '🎢',
    places: [
      { name: 'Universal Studios, Singapore', image: 'https://images.unsplash.com/photo-1508355576831-e567172eb43a?w=400&h=300&fit=crop', country: 'singapore', city: 'Sentosa', desc: 'Hollywood-themed park with Transformers, Mummy rides', category: 'Theme Park', rating: 4.7, timing: '10:00 AM - 7:00 PM' },
      { name: 'DisneySea, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Nautical-themed Disney park — unique to Tokyo', category: 'Theme Park', rating: 4.9, timing: '9:00 AM - 9:00 PM' },
      { name: 'Disneyland, Hong Kong', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop', country: 'asia', city: 'Hong Kong', desc: 'Magic Kingdom with castle, parades and fireworks', category: 'Theme Park', rating: 4.6, timing: '10:00 AM - 8:30 PM' },
      { name: 'Dreamworld, Gold Coast', image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=400&h=300&fit=crop', country: 'australia', city: 'Gold Coast', desc: 'Australia largest theme park with Big Thrill rides', category: 'Theme Park', rating: 4.5, timing: '10:00 AM - 5:00 PM' },
      { name: 'Gardens by the Bay, Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Futuristic Supertree Grove, Cloud Forest and Flower Dome', category: 'Theme Park', rating: 4.8, timing: '5:00 AM - 2:00 AM' },
      { name: 'Legoland, Johor', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Johor', desc: 'LEGO-themed park with rides, water park and hotel', category: 'Theme Park', rating: 4.5, timing: '10:00 AM - 6:00 PM' },
      { name: 'Bali Safari & Marine Park', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Gianyar', desc: 'Safari train, water park and animal encounters', category: 'Theme Park', rating: 4.5, timing: '9:00 AM - 5:00 PM' },
      { name: 'Everland, Seoul', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop', country: 'south-korea', city: 'Yongin', desc: 'Korea largest theme park with T Express wooden coaster', category: 'Theme Park', rating: 4.6, timing: '9:00 AM - 9:00 PM' },
      { name: 'Siam Ocean World, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Southeast Asia largest oceanarium with 30,000+ animals', category: 'Theme Park', rating: 4.5, timing: '10:00 AM - 9:00 PM' },
      { name: 'Dubai Parks & Resorts', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Motiongate, Legoland and Bollywood Parks', category: 'Theme Park', rating: 4.6, timing: '10:00 AM - 8:00 PM' },
      { name: 'Fuji-Q Highland, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Yamanashi', desc: 'Roller coasters with Mount Fuji views', category: 'Theme Park', rating: 4.6, timing: '9:30 AM - 5:30 PM' },
      { name: 'Sunway Lagoon, KL', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Water park, amusement park and wildlife park combined', category: 'Theme Park', rating: 4.5, timing: '10:00 AM - 11:00 PM' },
    ],
  },

  beaches: {
    name: 'Beaches',
    slug: 'beaches',
    tagline: 'World-Class Beaches & Coastal Paradises',
    description: 'The most beautiful beaches on Earth — from hidden coves to famous shorelines with crystal clear waters and golden sands.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=600&fit=crop',
    heroIcon: '🏖️',
    places: [
      { name: 'Whitehaven Beach, Australia', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', country: 'australia', city: 'Whitsundays', desc: '98% pure silica white sand — one of the best beaches', category: 'Beach', rating: 4.9, timing: 'Day trips available' },
      { name: 'Maya Bay, Thailand', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Phi Phi Islands', desc: 'The Beach movie filming location — turquoise limestone bay', category: 'Beach', rating: 4.8, timing: '7:00 AM - 6:00 PM' },
      { name: 'Baga Beach, Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', country: 'india', city: 'Goa', desc: 'Popular beach with water sports, shacks and nightlife', category: 'Beach', rating: 4.5, timing: 'Open 24 hours' },
      { name: 'Bondi Beach, Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop', country: 'australia', city: 'Sydney', desc: 'Iconic crescent beach with surfing and coastal walk', category: 'Beach', rating: 4.7, timing: 'Open 24 hours' },
      { name: 'Seminyak Beach, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Trendy beach clubs, surf breaks and sunset bars', category: 'Beach', rating: 4.7, timing: 'Open 24 hours' },
      { name: 'Railay Beach, Krabi', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Krabi', desc: 'Dramatic limestone cliffs and emerald waters', category: 'Beach', rating: 4.8, timing: 'Longtail boats daily' },
      { name: 'Galle Face Beach, Colombo', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Colombo', desc: 'Urban oceanfront promenade with street food and kites', category: 'Beach', rating: 4.5, timing: 'Open 24 hours' },
      { name: 'South Beach, Miami', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop', country: 'usa', city: 'Miami', desc: 'Art Deco district meets white sand and turquoise water', category: 'Beach', rating: 4.6, timing: 'Open 24 hours' },
      { name: 'Kuta Beach, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Famous surf beach with vibrant nightlife nearby', category: 'Beach', rating: 4.5, timing: 'Open 24 hours' },
      { name: 'Palolem Beach, Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', country: 'india', city: 'Goa', desc: 'Crescent-shaped peaceful beach with huts', category: 'Beach', rating: 4.6, timing: 'Open 24 hours' },
      { name: 'Patong Beach, Phuket', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop', country: 'thailand', city: 'Phuket', desc: 'Phuket most famous beach with nightlife', category: 'Beach', rating: 4.5, timing: 'Open 24 hours' },
      { name: 'Marina Beach, Chennai', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', country: 'india', city: 'Chennai', desc: 'World second longest urban beach — sunrise walks', category: 'Beach', rating: 4.5, timing: 'Open 24 hours' },
    ],
  },

  'national-parks': {
    name: 'National Parks',
    slug: 'national-parks',
    tagline: 'Wildlife, Nature & Conservation',
    description: 'The world greatest national parks — home to endangered species, pristine ecosystems and breathtaking natural landscapes.',
    heroImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1400&h=600&fit=crop',
    heroIcon: '🦁',
    places: [
      { name: 'Yellowstone, USA', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'usa', city: 'Wyoming', desc: 'First national park — geysers, hot springs and wildlife', category: 'National Park', rating: 4.9, timing: 'Open 24 hours' },
      { name: 'Yosemite, USA', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'usa', city: 'California', desc: 'Iconic granite cliffs, waterfalls and giant sequoias', category: 'National Park', rating: 4.9, timing: 'Open 24 hours' },
      { name: 'Jim Corbett, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Uttarakhand', desc: 'India oldest national park — Bengal tigers and elephants', category: 'National Park', rating: 4.7, timing: '6:00 AM - 6:00 PM' },
      { name: 'Ranthambore, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Rajasthan', desc: 'Famous tiger reserve with ancient fort ruins', category: 'National Park', rating: 4.7, timing: '6:00 AM - 6:00 PM' },
      { name: 'Fiordland, New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Milford Sound, Doubtful Sound and ancient rainforest', category: 'National Park', rating: 4.9, timing: 'Visitor center hours' },
      { name: 'Komodo National Park, Indonesia', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Flores', desc: 'Home to the Komodo dragon — the largest lizard', category: 'National Park', rating: 4.8, timing: '7:00 AM - 5:00 PM' },
      { name: 'Taman Negara, Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Pahang', desc: 'One of the world oldest tropical rainforests', category: 'National Park', rating: 4.6, timing: '7:00 AM - 5:00 PM' },
      { name: 'Grand Canyon, USA', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop', country: 'usa', city: 'Arizona', desc: '277-mile gorge carved by the Colorado River', category: 'National Park', rating: 4.9, timing: 'Open 24 hours' },
      { name: 'Kaziranga, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Assam', desc: 'UNESCO park — two-thirds of world one-horned rhinos', category: 'National Park', rating: 4.7, timing: '7:30 AM - 4:00 PM' },
      { name: 'Khao Sok, Thailand', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Surat Thani', desc: 'Ancient rainforest with floating bungalows and limestone', category: 'National Park', rating: 4.7, timing: '8:00 AM - 5:00 PM' },
      { name: 'Tongariro, New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'North Island', desc: 'Volcanic alpine crossing — Lord of the Rings filming', category: 'National Park', rating: 4.8, timing: 'Open 24 hours' },
      { name: 'Sundarbans, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'West Bengal', desc: 'UNESCO mangrove forest — Royal Bengal Tigers', category: 'National Park', rating: 4.6, timing: '6:00 AM - 5:00 PM' },
    ],
  },

  waterfalls: {
    name: 'Waterfalls',
    slug: 'waterfalls',
    tagline: 'Majestic Cascades & Thundering Falls',
    description: 'The world most spectacular waterfalls — from massive cataracts to hidden jungle cascades surrounded by lush tropical vegetation.',
    heroImage: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=1400&h=600&fit=crop',
    heroIcon: '💧',
    places: [
      { name: 'Niagara Falls, USA/Canada', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'usa', city: 'New York', desc: 'Massive cataract — 750,000 gallons per second', category: 'Waterfall', rating: 4.8, timing: 'Open 24 hours' },
      { name: 'Dudhsagar Falls, Goa', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'india', city: 'Goa', desc: 'Four-tiered 310m waterfall — Sea of Milk', category: 'Waterfall', rating: 4.7, timing: 'Monsoon peak' },
      { name: 'Milford Sound Waterfalls, NZ', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Stirling Falls and Lady Bowen Falls in fjord', category: 'Waterfall', rating: 4.9, timing: 'Cruises daily' },
      { name: 'Tegenungan, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Popular waterfall near Ubud with swimming pool', category: 'Waterfall', rating: 4.5, timing: '8:00 AM - 6:00 PM' },
      { name: 'Jog Falls, India', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'india', city: 'Karnataka', desc: 'Second highest plunge waterfall in India', category: 'Waterfall', rating: 4.6, timing: 'Monsoon best' },
      { name: 'Waimangu, New Zealand', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'North Island', desc: 'Volcanic hydrothermal valley with cascades', category: 'Waterfall', rating: 4.7, timing: '8:30 AM - 5:00 PM' },
      { name: 'Vallée de la Waterfalls, Reunion', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'oceania', city: 'Réunion', desc: 'Over 300 waterfalls in a volcanic cirque', category: 'Waterfall', rating: 4.8, timing: 'Guided hikes' },
      { name: 'Erawan Falls, Thailand', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Kanchanaburi', desc: 'Seven-tiered emerald pool waterfall in national park', category: 'Waterfall', rating: 4.7, timing: '8:00 AM - 4:30 PM' },
      { name: 'Stirling Falls, Milford Sound', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: '155m cascade — boat tours sail right under it', category: 'Waterfall', rating: 4.9, timing: 'Cruise included' },
      { name: 'Athirappilly Falls, India', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'india', city: 'Kerala', desc: 'Niagara of India — 80ft waterfall in Western Ghats', category: 'Waterfall', rating: 4.6, timing: '8:00 AM - 6:00 PM' },
      { name: 'Cascata do Arvoredo, Brazil', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'south-america', city: 'Brazil', desc: 'One of South America most beautiful waterfalls', category: 'Waterfall', rating: 4.7, timing: 'Day tours' },
      { name: 'Kaieteur Falls, Guyana', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8336?w=400&h=300&fit=crop', country: 'south-america', city: 'Guyana', desc: 'World largest single-drop waterfall by volume', category: 'Waterfall', rating: 4.8, timing: 'Flights from Georgetown' },
    ],
  },

  religious: {
    name: 'Religious Sites',
    slug: 'religious',
    tagline: 'Sacred Temples, Mosques & Churches',
    description: 'Visit the world most revered religious sites — ancient temples, grand mosques, historic churches and spiritual destinations.',
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1400&h=600&fit=crop',
    heroIcon: '🙏',
    places: [
      { name: 'Senso-ji Temple, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Tokyo oldest temple — iconic Kaminarimon Thunder Gate', category: 'Religious', rating: 4.8, timing: '6:00 AM - 5:00 PM' },
      { name: 'Wat Arun, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Temple of Dawn — iconic riverside porcelain spire', category: 'Religious', rating: 4.8, timing: '8:00 AM - 6:00 PM' },
      { name: 'Sheikh Zayed Mosque, Abu Dhabi', image: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=400&h=300&fit=crop', country: 'uae', city: 'Abu Dhabi', desc: 'Largest mosque in UAE — white marble and gold', category: 'Religious', rating: 4.9, timing: '9:00 AM - 10:00 PM' },
      { name: 'Boudhanath Stupa, Kathmandu', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Kathmandu', desc: 'World largest Buddhist stupa with prayer wheels', category: 'Religious', rating: 4.8, timing: 'Always open' },
      { name: 'Golden Temple, Amritsar', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', country: 'india', city: 'Amritsar', desc: 'Holiest Sikh shrine — gold-plated and lake-side', category: 'Religious', rating: 4.9, timing: 'Always open' },
      { name: 'Basilica of Bom Jesus, Goa', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=400&h=300&fit=crop', country: 'india', city: 'Goa', desc: 'UNESCO Heritage church with St. Francis Xavier remains', category: 'Religious', rating: 4.7, timing: '9:00 AM - 6:30 PM' },
      { name: 'Meiji Shrine, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Peaceful Shinto shrine in a lush forest', category: 'Religious', rating: 4.8, timing: 'Sunrise - Sunset' },
      { name: 'Pashupatinath, Kathmandu', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Kathmandu', desc: 'Sacred Hindu temple on the Bagmati River', category: 'Religious', rating: 4.7, timing: '4:00 AM - 9:00 PM' },
      { name: 'Tanah Lot, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Iconic sea temple on a rocky outcrop', category: 'Religious', rating: 4.8, timing: '6:00 AM - 7:00 PM' },
      { name: 'St. Peter\'s Basilica, Vatican', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop', country: 'europe', city: 'Vatican City', desc: 'World largest church — Michelangelo\'s dome', category: 'Religious', rating: 4.9, timing: '7:00 AM - 7:00 PM' },
      { name: 'Angkor Wat, Cambodia', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'asia', city: 'Siem Reap', desc: 'Largest religious monument — Khmer empire temple', category: 'Religious', rating: 4.9, timing: '5:00 AM - 6:00 PM' },
      { name: 'Borobudur, Indonesia', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Java', desc: 'Largest Buddhist temple — 2 million stone blocks', category: 'Religious', rating: 4.8, timing: '6:00 AM - 5:00 PM' },
    ],
  },

  shopping: {
    name: 'Shopping Places',
    slug: 'shopping',
    tagline: 'Retail Paradise & Markets',
    description: 'The world best shopping destinations — luxury malls, vibrant markets, duty-free havens and unique retail experiences.',
    heroImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&h=600&fit=crop',
    heroIcon: '🛍️',
    places: [
      { name: 'Orchard Road, Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Premier 2.2km shopping belt with ION, Paragon, Takashimaya', category: 'Shopping', rating: 4.7, timing: '10:00 AM - 10:00 PM' },
      { name: 'Dubai Mall, Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'World largest shopping mall — 1,200+ stores', category: 'Shopping', rating: 4.8, timing: '10:00 AM - 12:00 AM' },
      { name: 'Chatuchak Market, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'World largest weekend market — 15,000+ stalls', category: 'Shopping', rating: 4.7, timing: 'Sat-Sun 9:00 AM - 6:00 PM' },
      { name: 'Bukit Bintang, KL', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Pavilion KL, Starhill and street shopping hub', category: 'Shopping', rating: 4.6, timing: '10:00 AM - 10:00 PM' },
      { name: 'Myeongdong, Seoul', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop', country: 'south-korea', city: 'Seoul', desc: 'K-beauty shopping heaven — skincare, fashion and food', category: 'Shopping', rating: 4.7, timing: '10:00 AM - 10:00 PM' },
      { name: 'Gold Souk, Dubai', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Traditional market with 300+ gold retailers', category: 'Shopping', rating: 4.6, timing: '10:00 AM - 10:00 PM' },
      { name: 'Nishiki Market, Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Kyoto', desc: 'Kyoto kitchen — 400-year-old food market', category: 'Shopping', rating: 4.7, timing: '9:00 AM - 6:00 PM' },
      { name: 'Pettah Market, Colombo', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Colombo', desc: 'Bustling bazaar with spices, textiles and electronics', category: 'Shopping', rating: 4.5, timing: '9:00 AM - 7:00 PM' },
      { name: 'Oxford Street, London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', country: 'europe', city: 'London', desc: 'Famous shopping street — Selfridges, Primark, flags', category: 'Shopping', rating: 4.6, timing: '10:00 AM - 9:00 PM' },
      { name: 'Fifth Avenue, New York', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=300&fit=crop', country: 'usa', city: 'New York', desc: 'Tiffany, Saks, Apple Store and luxury flagship stores', category: 'Shopping', rating: 4.7, timing: '10:00 AM - 9:00 PM' },
      { name: 'Chinatown, Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Heritage shopping with souvenirs, tea and traditional goods', category: 'Shopping', rating: 4.5, timing: '10:00 AM - 10:00 PM' },
      { name: 'Grand Bazaar, Istanbul', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop', country: 'europe', city: 'Istanbul', desc: 'One of the oldest and largest covered markets', category: 'Shopping', rating: 4.7, timing: '8:30 AM - 7:00 PM' },
    ],
  },
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function InternationalPlacesPage() {
  const { placeSlug } = useParams()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const place = PLACES[placeSlug] || PLACES['']

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Category Not Found</h1>
          <p className="text-navy-500 mb-6">The places category doesn't exist.</p>
          <Link to="/international/places" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Browse All Places</Link>
        </div>
      </div>
    )
  }

  const allCats = Object.entries(PLACES).filter(([k]) => k !== '')
  const filteredPlaces = place.places.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-navy-900">
        <img src={place.heroImage} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="container-wide">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={14} />
              <Link to="/international" className="hover:text-white">International</Link>
              <ChevronRight size={14} />
              <Link to="/international/places" className="hover:text-white">Places to Visit</Link>
              <ChevronRight size={14} />
              <span className="text-white">{place.name}</span>
            </div>
            <span className="text-4xl mb-3 block">{place.heroIcon}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">{place.name}</h1>
            <p className="text-lg text-gray-200 max-w-2xl drop-shadow">{place.description}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="#places" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-medium backdrop-blur-sm transition-colors">
                <Compass size={18} /> Explore Places
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors">
                Plan Your Visit <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLACES SECTION ═══ */}
      <section className="section-padding bg-gray-50" id="places">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
                <h3 className="font-bold text-navy-900 mb-4">Places by Type</h3>
                <div className="space-y-1">
                  <Link to="/international/places" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!placeSlug ? 'bg-sky-100 text-sky-700' : 'text-navy-600 hover:bg-gray-50'}`}>
                    🗺️ Top Places to Visit
                  </Link>
                  {allCats.map(([key, cat]) => (
                    <Link key={key} to={`/international/places/${key}`} className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${placeSlug === key ? 'bg-sky-100 text-sky-700' : 'text-navy-600 hover:bg-gray-50'}`}>
                      {cat.heroIcon} {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">{place.name}</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2">Explore {place.name}</h2>
                  <p className="text-navy-500 mt-2">{filteredPlaces.length} places to explore</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                  <input type="text" placeholder="Search places..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none w-56" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPlaces.map((p, i) => (
                  <Link key={i} to={`/international/${p.country}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-white/90 text-navy-700 text-[10px] font-medium px-2.5 py-1 rounded-md">{p.category}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-navy-700">{p.rating}</span>
                        <span className="text-navy-400 mx-1">·</span>
                        <Clock size={12} className="text-navy-400" />
                        <span className="text-xs text-navy-500">{p.timing}</span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-sm group-hover:text-sky-600 transition-colors">{p.name}</h3>
                      <p className="text-xs text-navy-500 mt-1 line-clamp-2">{p.desc}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <MapPin size={11} className="text-navy-400" />
                        <span className="text-xs text-navy-400">{p.city}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPlaces.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <Search size={48} className="mx-auto text-navy-300 mb-4" />
                  <h3 className="text-xl font-semibold text-navy-700">No places found</h3>
                  <p className="text-navy-500 mt-2">Try adjusting your search</p>
                  <button onClick={() => setSearch('')} className="text-sky-600 hover:text-sky-700 text-sm font-medium mt-3">Clear Search</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-r from-sky-600 to-indigo-700 py-16">
        <div className="container-wide text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Visit {place.name.replace('Top Places to Visit', 'Amazing Places')}?</h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-8">Let our travel experts plan your perfect trip to these incredible destinations.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-white text-sky-700 hover:bg-sky-50 px-8 py-3.5 rounded-xl font-semibold transition-colors inline-flex items-center gap-2">
              <Send size={18} /> Enquire Now
            </Link>
            <Link to="/plan-trip" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-semibold transition-colors inline-flex items-center gap-2">
              <Compass size={18} /> Plan My Trip
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
