import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Search, Star, Clock, MapPin, ChevronRight, Send, Compass, Zap, Users } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// ACTIVITY CATEGORIES — All 11 international things to do
// ═══════════════════════════════════════════════════════════════
const ACTIVITIES = {
  '': {
    name: 'Things to Do',
    slug: '',
    tagline: 'Amazing Experiences Around the World',
    description: 'Discover the most thrilling and unforgettable activities across international destinations — from adrenaline-pumping adventures to serene cultural experiences.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=600&fit=crop',
    heroIcon: '🎯',
    activities: [
      { name: 'Bungee Jumping, Queenstown', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop', country: 'new-zealand', city: 'Queenstown', desc: 'The birthplace of commercial bungee — 134m Nevis jump', category: 'Adventure', price: '₹12,000', duration: 'Half day', rating: 4.9 },
      { name: 'Scuba Diving, Maldives', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'maldives', city: 'Baa Atoll', desc: 'UNESCO Biosphere Reserve with manta rays and coral', category: 'Water Sports', price: '₹8,000', duration: 'Full day', rating: 4.9 },
      { name: 'Desert Safari, Dubai', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Dune bashing, camel rides and BBQ under stars', category: 'Desert Safari', price: '₹6,000', duration: '6 hours', rating: 4.8 },
      { name: 'Floating Market, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Authentic canal-side market with boat vendors', category: 'Cultural', price: '₹2,500', duration: 'Half day', rating: 4.7 },
      { name: 'Northern Lights, Iceland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop', country: 'europe', city: 'Reykjavik', desc: 'Aurora Borealis viewing in pristine Arctic skies', category: 'Adventure', price: '₹25,000', duration: 'Night tour', rating: 4.9 },
      { name: 'Skydiving, Dubai', image: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Palm Jumeirah views during freefall at 13,000ft', category: 'Skydiving', price: '₹18,000', duration: '3 hours', rating: 4.8 },
      { name: 'Cultural Walking Tour, Hanoi', image: 'https://images.unsplash.com/photo-1557750255-c7607237c52e?w=400&h=300&fit=crop', country: 'vietnam', city: 'Hanoi', desc: '36 ancient streets, street food and temple visits', category: 'Cultural', price: '₹1,500', duration: '3 hours', rating: 4.7 },
      { name: 'Carnival, Rio de Janeiro', image: 'https://images.unsplash.com/photo-1551710029-607e06bd45ff?w=400&h=300&fit=crop', country: 'south-america', city: 'Rio de Janeiro', desc: 'World largest carnival — samba, costumes and parades', category: 'Cultural', price: '₹40,000', duration: '3-5 days', rating: 4.9 },
      { name: 'Trekking, Nepal Himalayas', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Pokhara', desc: 'Everest Base Camp or Annapurna Circuit treks', category: 'Trekking', price: '₹35,000', duration: '7-14 days', rating: 4.8 },
      { name: 'Nightclubbing, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Rooftop bars, Khao San Road and Silom nightlife', category: 'Nightlife', price: '₹3,000', duration: 'Evening', rating: 4.6 },
      { name: 'Safari, Sri Lanka', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Yala', desc: 'Leopards, elephants and exotic wildlife', category: 'Wildlife', price: '₹5,000', duration: 'Full day', rating: 4.7 },
      { name: 'Camping, Swiss Alps', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'switzerland', city: 'Interlaken', desc: 'Mountain camping with Alpine views and starlit skies', category: 'Camping', price: '₹15,000', duration: '2-3 days', rating: 4.8 },
    ],
  },

  adventure: {
    name: 'Adventure Activities',
    slug: 'adventure',
    tagline: 'Adrenaline-Pumping Adventures',
    description: 'For the thrill-seekers — bungee jumping, zip-lining, rock climbing, white water rafting and the most extreme adventures.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=600&fit=crop',
    heroIcon: '🧗',
    activities: [
      { name: 'Bungee Jumping, Queenstown', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop', country: 'new-zealand', city: 'Queenstown', desc: '134m Nevis Bungy — highest in New Zealand', category: 'Extreme', price: '₹12,000', duration: 'Half day', rating: 4.9 },
      { name: 'Zip-lining, Costa Rica', image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc0?w=400&h=300&fit=crop', country: 'central-america', city: 'Arenal', desc: 'Canopy zip-line through tropical rainforest', category: 'Adventure', price: '₹7,000', duration: '3 hours', rating: 4.8 },
      { name: 'White Water Rafting, Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Pokhara', desc: 'Class III-V rapids on the Trisuli River', category: 'Adventure', price: '₹5,000', duration: 'Full day', rating: 4.8 },
      { name: 'Rock Climbing, Railay Beach', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Krabi', desc: 'World-class limestone cliff climbing over ocean', category: 'Adventure', price: '₹4,000', duration: 'Half day', rating: 4.7 },
      { name: 'Zipline, Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'XLine Dubai Marina — world longest urban zipline', category: 'Extreme', price: '₹8,000', duration: '1 hour', rating: 4.7 },
      { name: 'Paragliding, Interlaken', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'switzerland', city: 'Interlaken', desc: 'Tandem flight over Swiss Alps and lakes', category: 'Adventure', price: '₹15,000', duration: '20 min flight', rating: 4.9 },
      { name: 'Canyoning, Queenstown', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'Queenstown', desc: 'Rappel waterfalls and swim through canyons', category: 'Adventure', price: '₹10,000', duration: '4 hours', rating: 4.8 },
      { name: 'ATV Riding, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Off-road through rice terraces and jungle trails', category: 'Adventure', price: '₹3,000', duration: '2 hours', rating: 4.6 },
      { name: 'Glacier Hiking, Iceland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop', country: 'europe', city: 'Reykjavik', desc: 'Walk on ancient glaciers and explore ice caves', category: 'Adventure', price: '₹18,000', duration: 'Full day', rating: 4.9 },
      { name: 'Jet Boating, Gold Coast', image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=400&h=300&fit=crop', country: 'australia', city: 'Gold Coast', desc: 'High-speed jet boat through narrow canyons', category: 'Adventure', price: '₹6,000', duration: '1 hour', rating: 4.7 },
      { name: 'White Water Rafting, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Ayung River rapids through jungle gorge', category: 'Adventure', price: '₹2,500', duration: '2 hours', rating: 4.6 },
      { name: 'Trekking, Kilimanjaro', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Tanzania', desc: 'Africa highest peak — 5,895m summit trek', category: 'Trekking', price: '₹1,50,000', duration: '5-9 days', rating: 4.9 },
    ],
  },

  'water-sports': {
    name: 'Water Sports',
    slug: 'water-sports',
    tagline: 'Ocean Adventures & Water Fun',
    description: 'Dive into the most exciting water sports — jet skiing, parasailing, snorkeling, kayaking and more across tropical destinations.',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&h=600&fit=crop',
    heroIcon: '🏄',
    activities: [
      { name: 'Parasailing, Phuket', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop', country: 'thailand', city: 'Phuket', desc: 'Fly above the Andaman Sea with panoramic views', category: 'Water Sports', price: '₹2,500', duration: '15 min', rating: 4.7 },
      { name: 'Jet Skiing, Dubai', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'High-speed jet ski along Palm Jumeirah coastline', category: 'Water Sports', price: '₹5,000', duration: '30 min', rating: 4.7 },
      { name: 'Snorkeling, Phi Phi Islands', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Krabi', desc: 'Crystal waters with tropical fish and coral', category: 'Water Sports', price: '₹2,000', duration: 'Half day', rating: 4.8 },
      { name: 'Kayaking, Halong Bay', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop', country: 'vietnam', city: 'Halong Bay', desc: 'Paddle through limestone karsts and hidden caves', category: 'Water Sports', price: '₹3,000', duration: 'Half day', rating: 4.8 },
      { name: 'Surfing, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Kuta', desc: 'World-class waves for beginners to pros', category: 'Water Sports', price: '₹2,000', duration: '2 hours', rating: 4.7 },
      { name: 'Flyboarding, Pattaya', image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&h=300&fit=crop', country: 'thailand', city: 'Pattaya', desc: 'Hover above water with jet-powered flyboard', category: 'Water Sports', price: '₹3,500', duration: '30 min', rating: 4.6 },
      { name: 'Kitesurfing, Boracay', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', country: 'asia', city: 'Boracay', desc: 'Consistent winds and flat water perfect for kites', category: 'Water Sports', price: '₹4,000', duration: '2 hours', rating: 4.7 },
      { name: 'Canyoning, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Waterfall rappelling and natural water slides', category: 'Water Sports', price: '₹2,500', duration: '3 hours', rating: 4.7 },
      { name: 'Underwater Sea Walking, Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop', country: 'maldives', city: 'Malé', desc: 'Walk on the ocean floor surrounded by fish', category: 'Water Sports', price: '₹10,000', duration: '45 min', rating: 4.8 },
      { name: 'Speed Boat, Sentosa', image: 'https://images.unsplash.com/photo-1508355576831-e567172eb43a?w=400&h=300&fit=crop', country: 'singapore', city: 'Sentosa', desc: 'Thrilling speed boat ride around the island', category: 'Water Sports', price: '₹4,000', duration: '30 min', rating: 4.6 },
      { name: 'Paddleboarding, Koh Samui', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Koh Samui', desc: 'Calm morning paddle through mangrove channels', category: 'Water Sports', price: '₹1,500', duration: '1 hour', rating: 4.6 },
      { name: 'River Tubing, Vang Vieng', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop', country: 'asia', city: 'Vang Vieng', desc: 'Lazy tube float down limestone karst river', category: 'Water Sports', price: '₹1,000', duration: 'Half day', rating: 4.5 },
    ],
  },

  trekking: {
    name: 'Trekking & Hiking',
    slug: 'trekking',
    tagline: 'Epic Trails & Mountain Treks',
    description: 'The world greatest trekking routes — from Himalayan summits to Pacific Rim trails, volcanic ridges and ancient paths.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&h=600&fit=crop',
    heroIcon: '🥾',
    activities: [
      { name: 'Everest Base Camp, Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Everest', desc: '12-day trek to the foot of the world highest peak', category: 'Trekking', price: '₹1,20,000', duration: '12-16 days', rating: 4.9 },
      { name: 'Inca Trail, Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop', country: 'south-america', city: 'Cusco', desc: 'Ancient Incan path to Machu Picchu', category: 'Trekking', price: '₹80,000', duration: '4 days', rating: 4.9 },
      { name: 'Annapurna Circuit, Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Pokhara', desc: 'Classic Himalayan circuit through diverse landscapes', category: 'Trekking', price: '₹60,000', duration: '14-21 days', rating: 4.8 },
      { name: 'Mount Fuji, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Sunrise trek to Japan iconic volcanic peak', category: 'Trekking', price: '₹5,000', duration: '2 days', rating: 4.7 },
      { name: 'Kilimanjaro, Tanzania', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Tanzania', desc: 'Africa highest peak via Machame or Marangu route', category: 'Trekking', price: '₹1,50,000', duration: '5-9 days', rating: 4.9 },
      { name: 'Tongariro Crossing, NZ', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'North Island', desc: 'Volcanic alpine crossing — Lord of the Rings terrain', category: 'Trekking', price: '₹8,000', duration: '1 day', rating: 4.8 },
      { name: 'Torres del Paine, Chile', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'south-america', city: 'Patagonia', desc: 'W Trek through granite towers and glaciers', category: 'Trekking', price: '₹1,00,000', duration: '4-5 days', rating: 4.9 },
      { name: 'Bali Rice Terrace Trek', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Tegallalang terraces and hidden waterfalls walk', category: 'Hiking', price: '₹1,500', duration: 'Half day', rating: 4.6 },
      { name: 'Camino de Santiago, Spain', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop', country: 'europe', city: 'Santiago', desc: '800km pilgrimage trail across northern Spain', category: 'Trekking', price: '₹30,000', duration: '30 days', rating: 4.8 },
      { name: 'Mount Batur, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Sunrise trek with breakfast at the volcanic crater', category: 'Hiking', price: '₹2,000', duration: '5 hours', rating: 4.7 },
      { name: 'Milford Track, NZ', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Greatest walk in the world — fiordland alpine trail', category: 'Trekking', price: '₹25,000', duration: '4 days', rating: 4.9 },
      { name: 'Petra Trail, Jordan', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400&h=300&fit=crop', country: 'asia', city: 'Petra', desc: 'Ancient Nabataean carved city through narrow Siq', category: 'Hiking', price: '₹8,000', duration: '1-2 days', rating: 4.8 },
    ],
  },

  wildlife: {
    name: 'Wildlife Safari',
    slug: 'wildlife',
    tagline: 'Encounter Nature\'s Magnificent Creatures',
    description: 'Go on unforgettable wildlife safaris — see the Big Five, swim with dolphins, watch whales and encounter exotic animals in their natural habitat.',
    heroImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1400&h=600&fit=crop',
    heroIcon: '🦁',
    activities: [
      { name: 'Serengeti Safari, Tanzania', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Tanzania', desc: 'Great Migration — 2 million wildebeest crossing', category: 'Safari', price: '₹2,00,000', duration: '5-7 days', rating: 4.9 },
      { name: 'Yala Safari, Sri Lanka', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Yala', desc: 'Highest leopard density in the world', category: 'Safari', price: '₹5,000', duration: 'Full day', rating: 4.7 },
      { name: 'Masai Mara, Kenya', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Kenya', desc: 'Big Five safari with Masai warrior cultural visit', category: 'Safari', price: '₹2,50,000', duration: '5 days', rating: 4.9 },
      { name: 'Kaziranga, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Assam', desc: 'Two-thirds of world one-horned rhinos here', category: 'Safari', price: '₹4,000', duration: '2 days', rating: 4.7 },
      { name: 'Whale Watching, Mirissa', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Mirissa', desc: 'Blue whales and dolphins in warm Indian Ocean', category: 'Wildlife', price: '₹3,000', duration: '4 hours', rating: 4.8 },
      { name: 'Ranthambore Tiger Reserve', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Rajasthan', desc: 'Bengal tigers roaming ancient fort ruins', category: 'Safari', price: '₹6,000', duration: '2 days', rating: 4.7 },
      { name: 'Komodo Island, Indonesia', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Flores', desc: 'See Komodo dragons — the largest living lizards', category: 'Wildlife', price: '₹15,000', duration: '2 days', rating: 4.8 },
      { name: 'Galápagos, Ecuador', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'south-america', city: 'Galápagos', desc: 'Unique wildlife — giant tortoises, marine iguanas', category: 'Wildlife', price: '₹3,00,000', duration: '5 days', rating: 4.9 },
      { name: 'Gir National Park, India', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'india', city: 'Gujarat', desc: 'Last home of Asiatic lions on Earth', category: 'Safari', price: '₹5,000', duration: '2 days', rating: 4.7 },
      { name: 'Taman Negara, Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Pahang', desc: '130 million year old rainforest wildlife trek', category: 'Wildlife', price: '₹3,000', duration: 'Full day', rating: 4.6 },
      { name: 'Orangutan Sanctuary, Borneo', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'asia', city: 'Borneo', desc: 'Visit orangutan rehabilitation centre in the wild', category: 'Wildlife', price: '₹8,000', duration: '2 days', rating: 4.8 },
      { name: 'Iguazu Falls Wildlife, Brazil', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'south-america', city: 'Foz do Iguaçu', desc: 'Toucans, coatis and butterflies near massive falls', category: 'Wildlife', price: '₹15,000', duration: '2 days', rating: 4.8 },
    ],
  },

  cruises: {
    name: 'Cruises & Sailing',
    slug: 'cruises',
    tagline: 'Luxury Voyages & Sailing Adventures',
    description: 'Set sail on the world most spectacular cruises — from Mediterranean voyages to tropical island hopping and luxury yacht experiences.',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1400&h=600&fit=crop',
    heroIcon: '🚢',
    activities: [
      { name: 'Mediterranean Cruise', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&h=300&fit=crop', country: 'europe', city: 'Barcelona to Rome', desc: '7-night voyage through Italy, Greece and Croatia', category: 'Cruise', price: '₹1,20,000', duration: '7 nights', rating: 4.8 },
      { name: 'Ha Long Bay Cruise, Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop', country: 'vietnam', city: 'Ha Long Bay', desc: 'Overnight junk boat through limestone karsts', category: 'Cruise', price: '₹8,000', duration: '2 days', rating: 4.8 },
      { name: 'Bali to Lombok Sailing', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Island-hopping sail with snorkeling stops', category: 'Sailing', price: '₹5,000', duration: '3 days', rating: 4.7 },
      { name: 'Phi Phi Speedboat, Thailand', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Phuket', desc: 'Full-day speedboat island hopping tour', category: 'Cruise', price: '₹4,000', duration: 'Full day', rating: 4.7 },
      { name: 'Caribbean Cruise, Royal Caribbean', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&h=300&fit=crop', country: 'usa', city: 'Miami', desc: '7-night Caribbean voyage with island stops', category: 'Cruise', price: '₹1,50,000', duration: '7 nights', rating: 4.8 },
      { name: 'Milford Sound Cruise, NZ', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Fjord cruise with dolphins, penguins and waterfalls', category: 'Cruise', price: '₹6,000', duration: '2 hours', rating: 4.9 },
      { name: 'Sunset Cruise, Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop', country: 'maldives', city: 'Malé', desc: 'Luxury dhoni cruise with champagne sunset', category: 'Cruise', price: '₹12,000', duration: '3 hours', rating: 4.8 },
      { name: 'Luxury Yacht, Dubai Marina', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Private yacht charter with dinner cruise', category: 'Cruise', price: '₹25,000', duration: '4 hours', rating: 4.8 },
      { name: 'Andaman Sea Cruise, Thailand', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Krabi', desc: '4-island tour by traditional longtail boat', category: 'Cruise', price: '₹2,000', duration: 'Full day', rating: 4.7 },
      { name: 'Lake Bled Cruise, Slovenia', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'europe', city: 'Bled', desc: 'Traditional pletna boat to the island church', category: 'Sailing', price: '₹3,000', duration: '30 min', rating: 4.7 },
      { name: 'Santorini Sunset Cruise, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop', country: 'europe', city: 'Santorini', desc: 'Catamaran cruise with hot springs and BBQ', category: 'Cruise', price: '₹8,000', duration: '5 hours', rating: 4.9 },
      { name: 'Galápagos Explorer, Ecuador', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'south-america', city: 'Galápagos', desc: 'Luxury expedition cruise with naturalist guides', category: 'Cruise', price: '₹4,00,000', duration: '7 nights', rating: 4.9 },
    ],
  },

  desert: {
    name: 'Desert Safari',
    slug: 'desert',
    tagline: 'Golden Dunes & Desert Adventures',
    description: 'Experience the magic of desert landscapes — dune bashing, camel treks, Bedouin camps and starlit nights in the world great deserts.',
    heroImage: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1400&h=600&fit=crop',
    heroIcon: '🏜️',
    activities: [
      { name: 'Desert Safari, Dubai', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Dune bashing, camel rides, sandboarding and BBQ', category: 'Desert Safari', price: '₹6,000', duration: '6 hours', rating: 4.8 },
      { name: 'Wahiba Sands, Oman', image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=400&h=300&fit=crop', country: 'uae', city: 'Oman', desc: 'Authentic Bedouin camp in pristine desert', category: 'Desert Safari', price: '₹10,000', duration: 'Overnight', rating: 4.8 },
      { name: 'Sahara Camel Trek, Morocco', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop', country: 'africa', city: 'Merzouga', desc: 'Camel ride to desert camp with Berber music', category: 'Desert Safari', price: '₹12,000', duration: '2 days', rating: 4.9 },
      { name: 'Thar Desert, India', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'india', city: 'Jaisalmer', desc: 'Camel safari, fort visit and desert camping', category: 'Desert Safari', price: '₹4,000', duration: '2 days', rating: 4.7 },
      { name: 'Abu Dhabi Desert', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Abu Dhabi', desc: 'Luxury desert safari with falconry and stargazing', category: 'Desert Safari', price: '₹8,000', duration: 'Full day', rating: 4.8 },
      { name: 'Wadi Rum, Jordan', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400&h=300&fit=crop', country: 'asia', city: 'Wadi Rum', desc: 'Mars-like desert with Bedouin camps and jeep tours', category: 'Desert Safari', price: '₹15,000', duration: '2 days', rating: 4.9 },
      { name: 'Atacama Desert, Chile', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop', country: 'south-america', city: 'Atacama', desc: 'Driest desert on Earth — salt flats and geysers', category: 'Desert Safari', price: '₹25,000', duration: '3 days', rating: 4.8 },
      { name: 'White Desert, Egypt', image: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&h=300&fit=crop', country: 'africa', city: 'Cairo', desc: 'Surreal chalk formations and overnight camping', category: 'Desert Safari', price: '₹10,000', duration: '2 days', rating: 4.7 },
      { name: 'Merzouga Camel Night, Morocco', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop', country: 'africa', city: 'Sahara', desc: 'Sleep under the stars in luxury desert camp', category: 'Desert Safari', price: '₹8,000', duration: '1 night', rating: 4.8 },
      { name: 'Desert Dune Bashing, Qatar', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'uae', city: 'Doha', desc: 'Thrilling 4x4 ride through Inland Sea dunes', category: 'Desert Safari', price: '₹7,000', duration: 'Half day', rating: 4.7 },
      { name: 'Nullarbor, Australia', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'australia', city: 'South Australia', desc: 'Vast treeless plain road trip with whale watching', category: 'Desert Safari', price: '₹20,000', duration: '3 days', rating: 4.6 },
      { name: 'Sossusvlei, Namibia', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Namibia', desc: 'Tallest red dunes in the world at dawn', category: 'Desert Safari', price: '₹30,000', duration: '3 days', rating: 4.9 },
    ],
  },

  scuba: {
    name: 'Scuba Diving',
    slug: 'scuba',
    tagline: 'Explore the Underwater World',
    description: 'Discover the magic beneath the waves — coral reefs, shipwrecks, marine life and the world best scuba diving destinations.',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1400&h=600&fit=crop',
    heroIcon: '🤿',
    activities: [
      { name: 'Great Barrier Reef, Australia', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'australia', city: 'Cairns', desc: 'World largest coral reef — 2,900 individual reefs', category: 'Scuba Diving', price: '₹15,000', duration: 'Full day', rating: 4.9 },
      { name: 'Blue Hole, Belize', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'central-america', city: 'Belize', desc: 'Iconic sinkhole — stalactites and reef sharks', category: 'Scuba Diving', price: '₹20,000', duration: 'Full day', rating: 4.9 },
      { name: 'Phi Phi Islands, Thailand', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Krabi', desc: 'Colourful coral gardens and tropical fish', category: 'Scuba Diving', price: '₹4,000', duration: 'Half day', rating: 4.7 },
      { name: 'Maldives Reefs', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop', country: 'maldives', city: 'Baa Atoll', desc: 'UNESCO Biosphere with manta rays and whale sharks', category: 'Scuba Diving', price: '₹12,000', duration: 'Half day', rating: 4.9 },
      { name: 'Cenotes, Mexico', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'central-america', city: 'Yucatan', desc: 'Underground cave diving in crystal-clear sinkholes', category: 'Scuba Diving', price: '₹8,000', duration: 'Half day', rating: 4.8 },
      { name: 'Red Sea, Egypt', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'africa', city: 'Sharm El Sheikh', desc: 'World-famous walls, wrecks and coral gardens', category: 'Scuba Diving', price: '₹10,000', duration: 'Full day', rating: 4.8 },
      { name: 'Sipadan, Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Sabah', desc: 'Top 5 dive site — barracuda tornado and turtles', category: 'Scuba Diving', price: '₹18,000', duration: '2 days', rating: 4.9 },
      { name: 'Nusa Penida, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Manta Point — swim with giant manta rays', category: 'Scuba Diving', price: '₹5,000', duration: 'Full day', rating: 4.8 },
      { name: 'Gili Islands, Lombok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Lombok', desc: 'Turtle sanctuary and beginner-friendly reefs', category: 'Scuba Diving', price: '₹3,000', duration: 'Half day', rating: 4.7 },
      { name: 'Raja Ampat, Indonesia', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'indonesia', city: 'West Papua', desc: 'Most biodiverse marine area on Earth', category: 'Scuba Diving', price: '₹35,000', duration: '5 days', rating: 4.9 },
      { name: 'Silfra Fissure, Iceland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop', country: 'europe', city: 'Iceland', desc: 'Dive between tectonic plates in glacial water', category: 'Scuba Diving', price: '₹20,000', duration: '3 hours', rating: 4.9 },
      { name: 'Tubbataha Reef, Philippines', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', country: 'asia', city: 'Palawan', desc: 'UNESCO reef — sharks, turtles and pelagics', category: 'Scuba Diving', price: '₹30,000', duration: '4 days', rating: 4.9 },
    ],
  },

  skydiving: {
    name: 'Skydiving',
    slug: 'skydiving',
    tagline: 'Freefall from the Sky',
    description: 'The ultimate adrenaline rush — tandem skydiving over stunning landscapes with breathtaking views during freefall.',
    heroImage: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=1400&h=600&fit=crop',
    heroIcon: '🪂',
    activities: [
      { name: 'Skydive Dubai Palm', image: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Palm Jumeirah views during 13,000ft freefall', category: 'Skydiving', price: '₹18,000', duration: '3 hours', rating: 4.8 },
      { name: 'Skydive Queenstown', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop', country: 'new-zealand', city: 'Queenstown', desc: '15,000ft jump over The Remarkables mountain range', category: 'Skydiving', price: '₹15,000', duration: '3 hours', rating: 4.9 },
      { name: 'Skydive Interlaken', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'switzerland', city: 'Interlaken', desc: 'Swiss Alps panorama during 13,000ft tandem jump', category: 'Skydiving', price: '₹25,000', duration: '3 hours', rating: 4.9 },
      { name: 'Skydive Hawaii', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', country: 'usa', city: 'Hawaii', desc: 'Ocean and volcano views from 13,000ft', category: 'Skydiving', price: '₹20,000', duration: '3 hours', rating: 4.8 },
      { name: 'Skydive Wollongong', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop', country: 'australia', city: 'Sydney', desc: 'Pacific Ocean and Seven Mile Beach from altitude', category: 'Skydiving', price: '₹12,000', duration: '3 hours', rating: 4.7 },
      { name: 'Skydive Dubai Desert', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'Desert landscape freefall at 13,000ft', category: 'Skydiving', price: '₹16,000', duration: '3 hours', rating: 4.7 },
      { name: 'Skydive Fox Glacier', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'Fox Glacier', desc: 'Glacier and rainforest views from 16,500ft', category: 'Skydiving', price: '₹18,000', duration: '3 hours', rating: 4.9 },
      { name: 'Skydive三亚, China', image: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=400&h=300&fit=crop', country: 'china', city: 'Sanya', desc: 'Tropical island views during tandem freefall', category: 'Skydiving', price: '₹12,000', duration: '3 hours', rating: 4.6 },
      { name: 'Skydive Bonny Air, KL', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Taman Negara rainforest aerial views', category: 'Skydiving', price: '₹10,000', duration: '3 hours', rating: 4.6 },
      { name: 'Skydive Patagonia, Argentina', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'south-america', city: 'Bariloche', desc: 'Andes Mountains and lake district freefall', category: 'Skydiving', price: '₹15,000', duration: '3 hours', rating: 4.8 },
      { name: 'Skydive Mission Beach, Aus', image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=400&h=300&fit=crop', country: 'australia', city: 'Queensland', desc: 'Great Barrier Reef views from 15,000ft', category: 'Skydiving', price: '₹14,000', duration: '3 hours', rating: 4.8 },
      { name: 'Skydive Empuriabrava, Spain', image: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=400&h=300&fit=crop', country: 'europe', city: 'Barcelona', desc: 'Mediterranean coast and Pyrenees from 13,000ft', category: 'Skydiving', price: '₹18,000', duration: '3 hours', rating: 4.7 },
    ],
  },

  camping: {
    name: 'Camping',
    slug: 'camping',
    tagline: 'Under the Stars & In Nature',
    description: 'The best camping experiences worldwide — from luxury glamping to wild camping in national parks, mountains, forests and deserts.',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&h=600&fit=crop',
    heroIcon: '⛺',
    activities: [
      { name: 'Glamping, Swiss Alps', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'switzerland', city: 'Interlaken', desc: 'Luxury tents with mountain views and gourmet dining', category: 'Glamping', price: '₹25,000', duration: '2 nights', rating: 4.9 },
      { name: 'Desert Camping, Wadi Rum', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400&h=300&fit=crop', country: 'asia', city: 'Jordan', desc: 'Martian bubble tents in the red desert', category: 'Glamping', price: '₹15,000', duration: '1 night', rating: 4.8 },
      { name: 'Treehouse Camping, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Bamboo treehouse in the lush jungle canopy', category: 'Glamping', price: '₹5,000', duration: '2 nights', rating: 4.7 },
      { name: 'Lake Bled Camping, Slovenia', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', country: 'europe', city: 'Bled', desc: 'Campsite with fairy-tale lake and castle views', category: 'Camping', price: '₹3,000', duration: '2 nights', rating: 4.7 },
      { name: 'Safari Camping, Kenya', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop', country: 'africa', city: 'Masai Mara', desc: 'Tented camp in the middle of Big Five territory', category: 'Safari Camp', price: '₹40,000', duration: '3 nights', rating: 4.9 },
      { name: 'Beach Camping, Thailand', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Khao Lak', desc: 'Beachfront tent with ocean waves and campfire', category: 'Beach Camp', price: '₹2,000', duration: '1 night', rating: 4.6 },
      { name: 'Mountain Hut, Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', country: 'nepal', city: 'Himalayas', desc: 'Teahouse trekking with basic mountain accommodation', category: 'Trek Camp', price: '₹1,500', duration: '1 night', rating: 4.6 },
      { name: 'Forest Camping, Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Taman Negara', desc: 'Jungle camp in 130 million year old rainforest', category: 'Camping', price: '₹3,000', duration: '2 nights', rating: 4.6 },
      { name: 'Lakeside Camping, NZ', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=300&fit=crop', country: 'new-zealand', city: 'South Island', desc: 'Camp by Lake Tekapo with stargazing reserve', category: 'Camping', price: '₹5,000', duration: '2 nights', rating: 4.8 },
      { name: 'Glacier Camping, Iceland', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop', country: 'europe', city: 'Iceland', desc: 'Ice cave camping with Northern Lights', category: 'Adventure Camp', price: '₹35,000', duration: '2 nights', rating: 4.9 },
      { name: 'Volcano Camping, Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Mount Batur', desc: 'Camp on the volcano rim for sunrise views', category: 'Camping', price: '₹3,000', duration: '1 night', rating: 4.7 },
      { name: 'Sahara Desert Camp', image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=400&h=300&fit=crop', country: 'africa', city: 'Morocco', desc: 'Bedouin camp with camels, music and starry skies', category: 'Desert Camp', price: '₹8,000', duration: '2 nights', rating: 4.8 },
    ],
  },

  culture: {
    name: 'Cultural Experiences',
    slug: 'culture',
    tagline: 'Immerse in Local Traditions',
    description: 'Deep cultural immersion — cooking classes, temple ceremonies, traditional performances, artisan workshops and authentic local life.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=600&fit=crop',
    heroIcon: '🎭',
    activities: [
      { name: 'Thai Cooking Class, Chiang Mai', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop', country: 'thailand', city: 'Chiang Mai', desc: 'Learn pad thai, green curry and mango sticky rice', category: 'Cultural', price: '₹2,000', duration: '4 hours', rating: 4.8 },
      { name: 'Tea Ceremony, Kyoto', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Kyoto', desc: 'Traditional Japanese tea ceremony in a zen garden', category: 'Cultural', price: '₹5,000', duration: '1.5 hours', rating: 4.9 },
      { name: 'Batik Workshop, KL', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Traditional Malaysian wax-resist dyeing art', category: 'Cultural', price: '₹1,500', duration: '3 hours', rating: 4.6 },
      { name: 'Balinese Dance Class, Ubud', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Learn traditional Legong and Barong dances', category: 'Cultural', price: '₹2,000', duration: '2 hours', rating: 4.7 },
      { name: 'Hanbok Experience, Seoul', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop', country: 'south-korea', city: 'Seoul', desc: 'Wear traditional Korean hanbok and explore palaces', category: 'Cultural', price: '₹1,500', duration: '3 hours', rating: 4.7 },
      { name: 'Floating Market Tour, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Boat ride through traditional canal-side markets', category: 'Cultural', price: '₹2,500', duration: 'Half day', rating: 4.7 },
      { name: 'Pottery Workshop, Hoi An', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop', country: 'vietnam', city: 'Hoi An', desc: 'Traditional Vietnamese pottery and lantern making', category: 'Cultural', price: '₹1,000', duration: '2 hours', rating: 4.7 },
      { name: 'Sake Brewery Tour, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Kyoto', desc: 'Learn sake brewing and tasting traditions', category: 'Cultural', price: '₹4,000', duration: '3 hours', rating: 4.7 },
      { name: 'Henna Art, Morocco', image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop', country: 'africa', city: 'Marrakech', desc: 'Traditional Moroccan henna design session', category: 'Cultural', price: '₹1,000', duration: '1 hour', rating: 4.6 },
      { name: 'Sinhalese Dance, Colombo', image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop', country: 'sri-lanka', city: 'Colombo', desc: 'Kandyan dance performance and cultural show', category: 'Cultural', price: '₹2,000', duration: '2 hours', rating: 4.6 },
      { name: 'Calligraphy Class, Istanbul', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop', country: 'europe', city: 'Istanbul', desc: 'Traditional Ottoman calligraphy workshop', category: 'Cultural', price: '₹2,500', duration: '2 hours', rating: 4.7 },
      { name: 'Meditation Retreat, Bali', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Ubud', desc: 'Yoga and meditation in rice terrace setting', category: 'Cultural', price: '₹5,000', duration: 'Full day', rating: 4.8 },
    ],
  },

  nightlife: {
    name: 'Nightlife',
    slug: 'nightlife',
    tagline: 'Bars, Clubs & After-Dark Adventures',
    description: 'The world best nightlife destinations — rooftop bars, legendary nightclubs, night markets and after-dark experiences.',
    heroImage: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1400&h=600&fit=crop',
    heroIcon: '🌃',
    activities: [
      { name: 'Rooftop Bars, Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', country: 'uae', city: 'Dubai', desc: 'At.mosphere Burj Khalifa, WHITE and Soho Garden', category: 'Rooftop', price: '₹5,000', duration: 'Evening', rating: 4.8 },
      { name: 'Khao San Road, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Legendary backpacker street — buckets and DJs', category: 'Street Party', price: '₹1,000', duration: 'All night', rating: 4.6 },
      { name: 'Marquee Club, Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Ultra-popular mega club in Marina Bay', category: 'Club', price: '₹4,000', duration: 'Late night', rating: 4.7 },
      { name: 'Hongdae, Seoul', image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop', country: 'south-korea', city: 'Seoul', desc: 'Youth street with live music, bars and clubs', category: 'Street', price: '₹2,000', duration: 'Evening', rating: 4.7 },
      { name: 'Full Moon Party, Koh Phangan', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&h=300&fit=crop', country: 'thailand', city: 'Koh Phangan', desc: 'Monthly beach party with DJs and fire shows', category: 'Party', price: '₹3,000', duration: 'All night', rating: 4.7 },
      { name: 'Clarke Quay, Singapore', image: 'https://images.unsplash.com/photo-1508355576831-e567172eb43a?w=400&h=300&fit=crop', country: 'singapore', city: 'Singapore', desc: 'Riverside bars and clubs with live music', category: 'Bar District', price: '₹3,000', duration: 'Evening', rating: 4.6 },
      { name: 'Bukit Bintang, KL', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&h=300&fit=crop', country: 'malaysia', city: 'Kuala Lumpur', desc: 'Jalan Alor night market and rooftop bars', category: 'Night Market', price: '₹1,500', duration: 'Evening', rating: 4.6 },
      { name: 'Shibuya, Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop', country: 'japan', city: 'Tokyo', desc: 'Robot Restaurant, golden gai bars and karaoke', category: 'Bar District', price: '₹5,000', duration: 'Late night', rating: 4.8 },
      { name: 'Phnom Penh Nightlife, Cambodia', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop', country: 'asia', city: 'Phnom Penh', desc: 'Riverside bars and Bassac Lane pub street', category: 'Bar District', price: '₹1,000', duration: 'Evening', rating: 4.5 },
      { name: 'Bali Beach Clubs', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop', country: 'indonesia', city: 'Bali', desc: 'Potato Head, Ku De Ta and Finns Beach Club', category: 'Beach Club', price: '₹3,000', duration: 'Day to night', rating: 4.8 },
      { name: 'Laneways, Melbourne', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop', country: 'australia', city: 'Melbourne', desc: 'Hidden bars in laneways and rooftop cocktail spots', category: 'Bar District', price: '₹4,000', duration: 'Evening', rating: 4.7 },
      { name: 'Soi Cowboy, Bangkok', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', country: 'thailand', city: 'Bangkok', desc: 'Famous nightlife street with neon lights and bars', category: 'Nightlife Strip', price: '₹1,500', duration: 'Late night', rating: 4.5 },
    ],
  },
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function InternationalActivitiesPage() {
  const { actSlug } = useParams()
  const [search, setSearch] = useState('')

  const activity = ACTIVITIES[actSlug] || ACTIVITIES['']

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Category Not Found</h1>
          <p className="text-navy-500 mb-6">The activity category doesn't exist.</p>
          <Link to="/international/things-to-do" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Browse All Activities</Link>
        </div>
      </div>
    )
  }

  const allCats = Object.entries(ACTIVITIES).filter(([k]) => k !== '')
  const filteredActivities = activity.activities.filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-navy-900">
        <img src={activity.heroImage} alt={activity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <div className="container-wide">
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={14} />
              <Link to="/international" className="hover:text-white">International</Link>
              <ChevronRight size={14} />
              <Link to="/international/things-to-do" className="hover:text-white">Things to Do</Link>
              <ChevronRight size={14} />
              <span className="text-white">{activity.name}</span>
            </div>
            <span className="text-4xl mb-3 block">{activity.heroIcon}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 drop-shadow-lg">{activity.name}</h1>
            <p className="text-lg text-gray-200 max-w-2xl drop-shadow">{activity.description}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="#activities" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-xl font-medium backdrop-blur-sm transition-colors">
                <Compass size={18} /> Explore Activities
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors">
                Book Now <Zap size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACTIVITIES SECTION ═══ */}
      <section className="section-padding bg-gray-50" id="activities">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
                <h3 className="font-bold text-navy-900 mb-4">Activities by Type</h3>
                <div className="space-y-1">
                  <Link to="/international/things-to-do" className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!actSlug ? 'bg-sky-100 text-sky-700' : 'text-navy-600 hover:bg-gray-50'}`}>
                    🎯 Things to Do
                  </Link>
                  {allCats.map(([key, cat]) => (
                    <Link key={key} to={`/international/things-to-do/${key}`} className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${actSlug === key ? 'bg-sky-100 text-sky-700' : 'text-navy-600 hover:bg-gray-50'}`}>
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
                  <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">{activity.name}</span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mt-2">Explore {activity.name}</h2>
                  <p className="text-navy-500 mt-2">{filteredActivities.length} activities to try</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                  <input type="text" placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none w-56" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredActivities.map((a, i) => (
                  <Link key={i} to={`/international/${a.country}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-white/90 text-navy-700 text-[10px] font-medium px-2.5 py-1 rounded-md">{a.category}</span>
                      <span className="absolute top-3 right-3 bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">{a.price}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={13} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-navy-700">{a.rating}</span>
                        <span className="text-navy-400 mx-1">·</span>
                        <Clock size={12} className="text-navy-400" />
                        <span className="text-xs text-navy-500">{a.duration}</span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-sm group-hover:text-sky-600 transition-colors">{a.name}</h3>
                      <p className="text-xs text-navy-500 mt-1 line-clamp-2">{a.desc}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <MapPin size={11} className="text-navy-400" />
                        <span className="text-xs text-navy-400">{a.city}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredActivities.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <Search size={48} className="mx-auto text-navy-300 mb-4" />
                  <h3 className="text-xl font-semibold text-navy-700">No activities found</h3>
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Try {activity.name}?</h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-8">Book your next adventure with expert guides and best prices guaranteed.</p>
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
