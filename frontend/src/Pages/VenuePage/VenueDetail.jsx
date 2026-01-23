import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const VenueDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: ''
  })

  // Mock venue data with detailed information
  const venueDetails = {
    1: {
      id: 1,
      name: 'Grand Royal Palace',
      type: 'halls',
      city: 'delhi',
      price: '₹50,000 - ₹2,00,000',
      capacity: '500-1000 guests',
      rating: 4.8,
      images: [
        'https://media-api.xogrp.com/images/a46789ba-034f-4da5-9cb4-22c940a86632',
        'https://picsum.photos/seed/palace1/800/600.jpg',
        'https://picsum.photos/seed/palace2/800/600.jpg',
        'https://picsum.photos/seed/palace3/800/600.jpg'
      ],
      description: 'Grand Royal Palace is a luxurious banquet hall that epitomizes elegance and sophistication. With state-of-the-art facilities and breathtaking architecture, this venue offers the perfect backdrop for your dream wedding.',
      features: [
        'Air-conditioned banquet hall',
        'In-house catering available',
        'Parking for 200+ vehicles',
        'Bridal suite and groom room',
        'Professional lighting and sound system',
        'Decor services available',
        'Valet parking',
        '24/7 power backup'
      ],
      amenities: [
        'Luxury accommodation for wedding party',
        'Spa and wellness center',
        'Swimming pool',
        'Fitness center',
        'Business center',
        'Concierge services'
      ],
      policies: {
        catering: 'In-house catering mandatory',
        decoration: 'Outside decorators allowed with fees',
        alcohol: 'Alcohol served with license',
        payment: '50% advance, balance on event day',
        cancellation: '30 days notice required'
      },
      contact: {
        phone: '+91 98765 43210',
        email: 'grandroyal@wedease.com',
        address: 'Connaught Place, New Delhi, Delhi 110001'
      },
      reviews: [
        { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning venue! The staff was very professional and the food was amazing.' },
        { name: 'Rahul Verma', rating: 4, comment: 'Great location and beautiful interiors. Perfect for large weddings.' },
        { name: 'Ananya Patel', rating: 5, comment: 'Our dream wedding venue! Everything was perfect from start to finish.' }
      ]
    },
    2: {
      id: 2,
      name: 'Sunset Villa Estate',
      type: 'villas',
      city: 'goa',
      price: '₹80,000 - ₹3,00,000',
      capacity: '200-500 guests',
      rating: 4.9,
      images: [
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/villa1/800/600.jpg',
        'https://picsum.photos/seed/villa2/800/600.jpg',
        'https://picsum.photos/seed/villa3/800/600.jpg'
      ],
      description: 'Sunset Villa Estate offers a breathtaking beachfront location perfect for intimate and romantic weddings. This private villa combines luxury with natural beauty, creating an unforgettable wedding experience.',
      features: [
        'Private beach access',
        'Infinity pool overlooking the ocean',
        'Outdoor ceremony space',
        'Indoor reception area',
        'Gourmet kitchen facilities',
        'Luxury bridal suite',
        'Guest accommodation available',
        'Professional event planning services'
      ],
      amenities: [
        'Beachfront bar',
        'Spa services',
        'Water sports activities',
        'Helicopter landing pad',
        'Private chef available',
        'Butler service'
      ],
      policies: {
        catering: 'Outside catering allowed',
        decoration: 'Full creative freedom',
        alcohol: 'BYOB allowed with corkage fees',
        payment: '40% advance, 60% on event day',
        cancellation: '45 days notice required'
      },
      contact: {
        phone: '+91 98765 43211',
        email: 'sunsetvilla@wedease.com',
        address: 'Baga Beach, North Goa, Goa 403509'
      },
      reviews: [
        { name: 'Sarah Johnson', rating: 5, comment: 'The beach view was absolutely stunning! Perfect for our destination wedding.' },
        { name: 'Michael Chen', rating: 5, comment: 'Luxurious villa with amazing service. Worth every penny!' }
      ]
    },
    3: {
      id: 3,
      name: 'Green Meadow Farmhouse',
      type: 'farmhouse',
      city: 'delhi',
      price: '₹40,000 - ₹1,50,000',
      capacity: '300-800 guests',
      rating: 4.6,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/farm1/800/600.jpg',
        'https://picsum.photos/seed/farm2/800/600.jpg',
        'https://picsum.photos/seed/farm3/800/600.jpg'
      ],
      description: 'Green Meadow Farmhouse offers a rustic yet elegant setting surrounded by lush greenery. This venue combines countryside charm with modern amenities for a perfect wedding celebration.',
      features: [
        'Lush green lawns',
        'Outdoor mandap setup',
        'Indoor banquet area',
        'Swimming pool',
        'Parking for 150+ vehicles',
        'Generator backup',
        'Changing rooms',
        'Kitchen facilities'
      ],
      amenities: [
        'Garden seating areas',
        'Barbecue facilities',
        'Children\'s play area',
        'Outdoor lighting',
        'Security services',
        'Housekeeping'
      ],
      policies: {
        catering: 'Outside catering allowed',
        decoration: 'Full decoration freedom',
        alcohol: 'Alcohol permitted',
        payment: '30% advance, balance on event day',
        cancellation: '20 days notice required'
      },
      contact: {
        phone: '+91 98765 43212',
        email: 'greenmeadow@wedease.com',
        address: 'Chhatarpur, New Delhi, Delhi 110074'
      },
      reviews: [
        { name: 'Deepak Kumar', rating: 4, comment: 'Great farmhouse with beautiful gardens. Perfect for outdoor weddings.' },
        { name: 'Neha Singh', rating: 5, comment: 'Amazing venue! The green surroundings made our wedding photos stunning.' }
      ]
    },
    4: {
      id: 4,
      name: 'Rose Garden Paradise',
      type: 'gardens',
      city: 'jaipur',
      price: '₹30,000 - ₹1,00,000',
      capacity: '200-600 guests',
      rating: 4.7,
      images: [
        'https://2.bp.blogspot.com/-TjYHq_ucrL0/WUoGMcO6J0I/AAAAAAAAaAc/ekhT4kar0QkbqMMYPkDItLQgaC6KOFbUACLcBGAs/s1600/westin2.jpg',
        'https://picsum.photos/seed/garden1/800/600.jpg',
        'https://picsum.photos/seed/garden2/800/600.jpg',
        'https://picsum.photos/seed/garden3/800/600.jpg'
      ],
      description: 'Rose Garden Paradise is a botanical wonderland featuring thousands of roses and exotic flowers. This romantic garden venue creates a fairy-tale atmosphere for your special day.',
      features: [
        'Floral garden pathways',
        'Central gazebo',
        'Water fountains',
        'Outdoor seating areas',
        'Covered pavilion',
        'Parking facilities',
        'Garden lighting',
        'Floral arrangements included'
      ],
      amenities: [
        'Botanical tours',
        'Photography sessions',
        'Floral workshops',
        'Garden games',
        'Tea ceremony area',
        'Meditation spaces'
      ],
      policies: {
        catering: 'Preferred caterers available',
        decoration: 'Natural garden decoration enhanced',
        alcohol: 'Limited alcohol service',
        payment: '25% advance, balance on event day',
        cancellation: '15 days notice required'
      },
      contact: {
        phone: '+91 98765 43213',
        email: 'rosegarden@wedease.com',
        address: 'Malviya Nagar, Jaipur, Rajasthan 302017'
      },
      reviews: [
        { name: 'Kavita Reddy', rating: 5, comment: 'The most romantic venue ever! The roses created such a beautiful ambiance.' },
        { name: 'Amit Shah', rating: 4, comment: 'Beautiful garden venue. Perfect for nature-loving couples.' }
      ]
    },
    5: {
      id: 5,
      name: 'Heritage Banquet Hall',
      type: 'halls',
      city: 'mumbai',
      price: '₹60,000 - ₹2,50,000',
      capacity: '400-900 guests',
      rating: 4.5,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.TpdKJQLNtTda-7aeCmQDNgHaE7?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/heritage1/800/600.jpg',
        'https://picsum.photos/seed/heritage2/800/600.jpg',
        'https://picsum.photos/seed/heritage3/800/600.jpg'
      ],
      description: 'Heritage Banquet Hall combines traditional Indian architecture with modern luxury. This venue offers a perfect blend of cultural heritage and contemporary comfort.',
      features: [
        'Traditional architecture',
        'Modern sound system',
        'Stage for performances',
        'Dance floor',
        'VIP seating areas',
        'Valet parking',
        'Elevator access',
        'Climate control'
      ],
      amenities: [
        'Traditional decor elements',
        'Cultural performances',
        'Live music setup',
        'Traditional catering options',
        'Mehndi and sangeet areas',
        'Photography backdrops'
      ],
      policies: {
        catering: 'In-house traditional catering',
        decoration: 'Traditional decoration specialists',
        alcohol: 'Full bar service available',
        payment: '35% advance, balance on event day',
        cancellation: '25 days notice required'
      },
      contact: {
        phone: '+91 98765 43214',
        email: 'heritage@wedease.com',
        address: 'Bandra West, Mumbai, Maharashtra 400050'
      },
      reviews: [
        { name: 'Rohit Mehta', rating: 4, comment: 'Great traditional venue with modern amenities.' },
        { name: 'Pooja Desai', rating: 5, comment: 'Perfect blend of heritage and luxury. Our guests loved it!' }
      ]
    },
    6: {
      id: 6,
      name: 'Luxury Garden Resort',
      type: 'gardens',
      city: 'bangalore',
      price: '₹45,000 - ₹1,80,000',
      capacity: '250-700 guests',
      rating: 4.8,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.9V09noDMgcgRdXU9Sk4-ZQHaFj?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/resort1/800/600.jpg',
        'https://picsum.photos/seed/resort2/800/600.jpg',
        'https://picsum.photos/seed/resort3/800/600.jpg'
      ],
      description: 'Luxury Garden Resort offers a sophisticated outdoor venue with meticulously landscaped gardens and world-class amenities. Perfect for couples seeking elegance and natural beauty.',
      features: [
        'Manicured gardens',
        'Water features',
        'Outdoor ceremony space',
        'Indoor reception hall',
        'Resort accommodation',
        'Spa facilities',
        'Multiple venue options',
        'Professional event team'
      ],
      amenities: [
        'Golf course access',
        'Tennis courts',
        'Swimming pools',
        'Fine dining restaurants',
        'Wellness center',
        'Kids club'
      ],
      policies: {
        catering: 'Resort catering preferred',
        decoration: 'Professional decorators available',
        alcohol: 'Full bar service',
        payment: '40% advance, balance on event day',
        cancellation: '30 days notice required'
      },
      contact: {
        phone: '+91 98765 43215',
        email: 'luxuryresort@wedease.com',
        address: 'Whitefield, Bangalore, Karnataka 560066'
      },
      reviews: [
        { name: 'Vikram Nair', rating: 5, comment: 'Amazing resort with beautiful gardens. Exceeded our expectations!' },
        { name: 'Divya Krishnan', rating: 5, comment: 'Luxurious venue with impeccable service. Highly recommend!' }
      ]
    },
    7: {
      id: 7,
      name: 'Royal Farm Estate',
      type: 'farmhouse',
      city: 'udaipur',
      price: '₹70,000 - ₹2,80,000',
      capacity: '350-900 guests',
      rating: 4.9,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.rEHhL0woFTdVZkln-NVXPQHaD3?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/royal1/800/600.jpg',
        'https://picsum.photos/seed/royal2/800/600.jpg',
        'https://picsum.photos/seed/royal3/800/600.jpg'
      ],
      description: 'Royal Farm Estate offers majestic lake views and royal architecture. This premium farmhouse venue combines rustic charm with regal elegance for a truly royal wedding experience.',
      features: [
        'Lake views',
        'Royal architecture',
        'Outdoor ceremony space',
        'Grand reception hall',
        'Luxury suites',
        'Boating facilities',
        'Helipad available',
        'Royal dining experience'
      ],
      amenities: [
        'Lakefront dining',
        'Royal welcome ceremonies',
        'Traditional music performances',
        'Firework displays',
        'Photography spots',
        'Vintage car services'
      ],
      policies: {
        catering: 'Royal cuisine specialists',
        decoration: 'Royal theme decorators',
        alcohol: 'Premium bar service',
        payment: '50% advance, balance on event day',
        cancellation: '45 days notice required'
      },
      contact: {
        phone: '+91 98765 43216',
        email: 'royalestate@wedease.com',
        address: 'Fateh Sagar Lake, Udaipur, Rajasthan 313001'
      },
      reviews: [
        { name: 'Rajat Singh', rating: 5, comment: 'Truly royal experience! The lake views were breathtaking.' },
        { name: 'Meera Patel', rating: 5, comment: 'Felt like royalty on our wedding day. Absolutely magical!' }
      ]
    },
    8: {
      id: 8,
      name: 'Ocean View Villa',
      type: 'villas',
      city: 'goa',
      price: '₹90,000 - ₹3,50,000',
      capacity: '150-400 guests',
      rating: 4.7,
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/ocean1/800/600.jpg',
        'https://picsum.photos/seed/ocean2/800/600.jpg',
        'https://picsum.photos/seed/ocean3/800/600.jpg'
      ],
      description: 'Ocean View Villa offers stunning panoramic ocean views and luxurious beachfront living. This exclusive villa provides an intimate setting for unforgettable wedding celebrations.',
      features: [
        'Panoramic ocean views',
        'Private beach access',
        'Infinity pool',
        'Sunset deck',
        'Luxury villa suites',
        'Gourmet kitchen',
        'Outdoor dining area',
        'Private cinema room'
      ],
      amenities: [
        'Beach butler service',
        'Yoga pavilion',
        'Water sports equipment',
        'Private chef service',
        'Wine cellar',
        'Game room'
      ],
      policies: {
        catering: 'Celebrity chef available',
        decoration: 'Beach theme specialists',
        alcohol: 'Premium wine selection',
        payment: '45% advance, balance on event day',
        cancellation: '40 days notice required'
      },
      contact: {
        phone: '+91 98765 43217',
        email: 'oceanview@wedease.com',
        address: 'Palolem Beach, South Goa, Goa 403702'
      },
      reviews: [
        { name: 'Nikhil Rao', rating: 5, comment: 'The ocean views were absolutely stunning! Perfect for our intimate wedding.' },
        { name: 'Tina Fernandez', rating: 4, comment: 'Beautiful villa with amazing service. Highly recommend for beach weddings.' }
      ]
    },
    9: {
      id: 9,
      name: 'Taj Hotel',
      type: 'hotels',
      city: 'jaipur',
      price: '₹90,000 - ₹3,50,000',
      capacity: '300-400 guests',
      rating: 4.5,
      images: [
        'https://www.wedresearch.net/wp-content/uploads/2017/07/grand-ballroom.jpg',
        'https://picsum.photos/seed/taj1/800/600.jpg',
        'https://picsum.photos/seed/taj2/800/600.jpg',
        'https://picsum.photos/seed/taj3/800/600.jpg'
      ],
      description: 'Taj Hotel brings legendary hospitality and timeless elegance to your wedding celebration. Experience world-class service and luxurious surroundings for your special day.',
      features: [
        'Grand ballroom',
        'Multiple event spaces',
        'Luxury accommodation',
        'World-class catering',
        'Spa and wellness',
        'Business center',
        'Concierge services',
        'Valet parking'
      ],
      amenities: [
        'Butler service',
        'Fine dining restaurants',
        'Swimming pool',
        'Fitness center',
        'Shopping arcade',
        'Cultural performances'
      ],
      policies: {
        catering: 'Taj cuisine mandatory',
        decoration: 'Taj decorators preferred',
        alcohol: 'Premium bar service',
        payment: '50% advance, balance on event day',
        cancellation: '30 days notice required'
      },
      contact: {
        phone: '+91 98765 43218',
        email: 'tajwedding@wedease.com',
        address: 'Civil Lines, Jaipur, Rajasthan 302006'
      },
      reviews: [
        { name: 'Anjali Gupta', rating: 5, comment: 'Taj hospitality is unmatched! Our wedding was perfect in every way.' },
        { name: 'Karan Malhotra', rating: 4, comment: 'Luxurious venue with amazing service. Worth the premium price.' }
      ]
    },
    10: {
      id: 10,
      name: 'Hilton',
      type: 'hotels',
      city: 'goa',
      price: '₹1,00,000 - ₹3,50,000',
      capacity: '250-400 guests',
      rating: 4.9,
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.7PNEGXyHecELJg0lKD6IUgHaD4?pid=Api&P=0&h=180',
        'https://picsum.photos/seed/hilton1/800/600.jpg',
        'https://picsum.photos/seed/hilton2/800/600.jpg',
        'https://picsum.photos/seed/hilton3/800/600.jpg'
      ],
      description: 'Hilton offers international luxury and impeccable service for your dream wedding. Experience world-class hospitality and stunning venues in the beautiful setting of Goa.',
      features: [
        'Beachfront location',
        'Multiple banquet halls',
        'Outdoor garden spaces',
        'Luxury suites',
        'International cuisine',
        'Event planning team',
        'Audiovisual equipment',
        'Wedding packages available'
      ],
      amenities: [
        'Beach club access',
        'Multiple restaurants',
        'Infinity pools',
        'Spa and wellness',
        'Fitness center',
        'Kids club',
        'Water sports'
      ],
      policies: {
        catering: 'Hilton catering services',
        decoration: 'Professional decorators',
        alcohol: 'Full bar service',
        payment: '40% advance, balance on event day',
        cancellation: '35 days notice required'
      },
      contact: {
        phone: '+91 98765 43219',
        email: 'hiltonwedding@wedease.com',
        address: 'Candolim Beach, North Goa, Goa 403515'
      },
      reviews: [
        { name: 'Priyanka Sharma', rating: 5, comment: 'Hilton service is exceptional! Our beach wedding was absolutely perfect.' },
        { name: 'David Wilson', rating: 5, comment: 'International luxury at its best. Highly recommend for destination weddings!' }
      ]
    }
  }

  // Load venue from mock data or vendor services
  const getVenue = () => {
    // First check if it's a vendor service
    if (id && id.toString().startsWith('vendor_')) {
      // Extract the actual service ID
      const serviceId = id.toString().replace('vendor_', '')
      
      // Search in localStorage for vendor services
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('vendor_services_')) {
          try {
            const services = JSON.parse(localStorage.getItem(key))
            const service = services.find(s => s.id.toString() === serviceId && s.category === 'venues')
            if (service) {
              // Transform vendor service to venue format
              return {
                id: id,
                name: service.name,
                type: 'vendor',
                city: service.location.toLowerCase(),
                price: service.price,
                capacity: '100-500 guests',
                rating: 4.5,
                images: service.images && service.images.length > 0 
                  ? service.images.map(img => img.preview)
                  : [
                      'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                      'https://picsum.photos/seed/vendor1/800/600.jpg',
                      'https://picsum.photos/seed/vendor2/800/600.jpg'
                    ],
                description: service.description,
                detailedDescription: `${service.name} is an exceptional venue choice that offers a perfect blend of elegance and functionality for your special occasion. This venue provides a stunning backdrop with modern amenities and professional service to ensure your event is memorable. With flexible spaces and experienced event coordination, this venue can accommodate various wedding styles and guest counts, making it an ideal choice for couples seeking a beautiful and well-managed celebration venue.`,
                features: [
                  'Professional service',
                  'Flexible pricing',
                  'Direct vendor contact',
                  'Customizable packages',
                  'Experienced staff',
                  'Quality assurance'
                ],
                amenities: [
                  'Customer support',
                  'Online booking',
                  'Payment flexibility',
                  'Vendor consultation'
                ],
                policies: {
                  cancellation: 'Flexible cancellation policy',
                  payment: 'Multiple payment options available',
                  timing: 'Available 24/7 for inquiries'
                },
                contact: {
                  phone: service.contactPhone,
                  email: service.contactEmail
                },
                vendorName: service.vendorName,
                isVendorService: true,
                contactPhone: service.contactPhone,
                contactEmail: service.contactEmail
              }
            }
          } catch (error) {
            console.error('Error loading vendor service:', error)
          }
        }
      }
    }
    
    // Return mock venue if not found in vendor services
    return venueDetails[id]
  }

  const venue = getVenue()

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // Handle review submission logic here
    console.log('Review submitted:', reviewForm)
    setShowReviewForm(false)
    setReviewForm({ name: '', rating: 0, comment: '' })
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Venue not found</h2>
          <Link to="/venues" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600">
            Back to Venues
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/venues')}
            className="mb-6 flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to Venues
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={venue.images[selectedImage]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(venue.images || []).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                    {venue.isVendorService ? 'Vendor Venue' : (venue.type.charAt(0).toUpperCase() + venue.type.slice(1))}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-gray-700 ml-1 font-semibold">{venue.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{venue.name}</h1>
                <p className="text-2xl text-pink-600 font-bold mb-4">{venue.price}</p>
                <p className="text-gray-600 leading-relaxed">{venue.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(venue.features || []).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all duration-300 font-semibold">
                  Book Now
                </button>
                <button className="flex-1 border-2 border-pink-400 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition-colors font-semibold">
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {venue.name}</h2>
              <p className="text-gray-600 leading-relaxed">{venue.detailedDescription || venue.description || 'No detailed description available.'}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {(venue.amenities || []).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <span className="text-pink-500 text-xl">✨</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-8 p-6 bg-pink-50 rounded-xl border-2 border-pink-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Share Your Experience</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({...reviewForm, rating: star})}
                            className={`text-2xl transition-colors ${
                              star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border-2 border-pink-300 focus:border-pink-500 focus:outline-none transition-colors"
                        rows="4"
                        placeholder="Share your experience..."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button 
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        onClick={handleSubmitReview}
                        className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {(venue.reviews || []).map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-600 ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📞 Contact Information</h3>
              {venue.isVendorService && venue.vendorName && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-800">🏢 Listed by: {venue.vendorName}</div>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{venue.contactPhone || venue.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{venue.contactEmail || venue.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{venue.isVendorService ? venue.contact.address : venue.contact.address}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
                  Call Now
                </button>
                <button className="w-full border-2 border-pink-400 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VenueDetail;
