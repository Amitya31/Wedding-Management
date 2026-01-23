import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const ArtistsPage = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [loading, setLoading] = useState(true)
  const [allArtists, setAllArtists] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get URL parameters
  const locationParam = searchParams.get('location')
  const searchParam = searchParams.get('search')

  // Update filters when URL parameters change
  useEffect(() => {
    if (locationParam) {
      setSelectedLocation(locationParam)
    }
  }, [locationParam])

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-30000', label: 'Under ₹30,000' },
    { value: '30000-60000', label: '₹30,000 - ₹60,000' },
    { value: '60000-100000', label: '₹60,000 - ₹1,00,000' },
    { value: '100000+', label: 'Above ₹1,00,000' }
  ]

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'goa', label: 'Goa' },
    { value: 'udaipur', label: 'Udaipur' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chandigarh', label: 'Chandigarh' }
  ]

  // Mock data for artists
  const artists = [
    {
      id: 1,
      name: 'DJ Night Beats',
      type: 'dj',
      category: 'music',
      price: '₹20,000 - ₹60,000',
      rating: 4.8,
      location: 'delhi',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Professional DJ service with latest sound equipment and extensive music library for all wedding functions.',
      features: ['Professional DJ', 'Latest Equipment', 'Extensive Music Library', 'Lighting Setup', 'MC Services', 'Custom Playlists']
    },
    {
      id: 2,
      name: 'DJ Bollywood Mix',
      type: 'dj',
      category: 'music',
      price: '₹30,000 - ₹85,000',
      rating: 4.7,
      location: 'mumbai',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Specialized Bollywood DJ with perfect mix of traditional and contemporary wedding music.',
      features: ['Bollywood Specialist', 'Traditional & Modern Mix', 'Live Mixing', 'Dance Floor Setup', 'Request Handling', 'Energy Management']
    },
    {
      id: 3,
      name: 'DJ International Beats',
      type: 'dj',
      category: 'music',
      price: '₹35,000 - ₹1,00,000',
      rating: 4.7,
      location: 'bangalore',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'International DJ service with global music collection and multilingual MC capabilities.',
      features: ['International Music', 'Multilingual MC', 'Global Hits', 'Cultural Integration', 'Advanced Sound System', 'Visual Effects']
    },
    {
      id: 4,
      name: 'Dance Studio Elite',
      type: 'dance',
      category: 'performance',
      price: '₹40,000 - ₹1,20,000',
      rating: 4.9,
      location: 'jaipur',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Professional dance choreography team specializing in wedding performances and couple dances.',
      features: ['Expert Choreographers', 'Couple Dance Special', 'Group Performances', 'Theme-based Routines', 'Professional Training', 'Stage Coordination']
    },
    {
      id: 5,
      name: 'Traditional Dance Academy',
      type: 'dance',
      category: 'performance',
      price: '₹35,000 - ₹90,000',
      rating: 4.8,
      location: 'udaipur',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Classical and traditional dance performances for authentic wedding ceremonies.',
      features: ['Classical Dance', 'Traditional Forms', 'Cultural Performances', 'Costume Design', 'Live Music Integration', 'Ritual Dances']
    },
    {
      id: 6,
      name: 'Modern Dance Crew',
      type: 'dance',
      category: 'performance',
      price: '₹30,000 - ₹90,000',
      rating: 4.7,
      location: 'pune',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Contemporary dance group with hip-hop, salsa, and fusion performances for modern weddings.',
      features: ['Contemporary Styles', 'Hip-hop & Salsa', 'Fusion Performances', 'High Energy Shows', 'Custom Choreography', 'Professional Dancers']
    },
    {
      id: 7,
      name: 'Mehendi Art Studio',
      type: 'mehendi',
      category: 'art',
      price: '₹5,000 - ₹25,000',
      rating: 4.9,
      location: 'chennai',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Expert mehendi artists specializing in traditional, Arabic, and contemporary bridal designs.',
      features: ['Bridal Mehendi', 'Traditional Designs', 'Arabic Patterns', 'Custom Art', 'Natural Henna', 'Quick Service']
    },
    {
      id: 8,
      name: 'Royal Mehendi Artists',
      type: 'mehendi',
      category: 'art',
      price: '₹8,000 - ₹35,000',
      rating: 4.8,
      location: 'kolkata',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Luxury mehendi service with intricate designs and premium natural henna for royal bridal look.',
      features: ['Intricate Designs', 'Premium Henna', 'Royal Patterns', 'Bridal Packages', 'Family Mehendi', 'Home Service']
    },
    {
      id: 9,
      name: 'Contemporary Mehendi Art',
      type: 'mehendi',
      category: 'art',
      price: '₹6,000 - ₹20,000',
      rating: 4.7,
      location: 'hyderabad',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Modern mehendi artists with fusion designs, minimalist patterns, and contemporary bridal art.',
      features: ['Modern Designs', 'Minimalist Art', 'Fusion Patterns', 'Quick Application', 'Skin-friendly Henna', 'Trendy Styles']
    },
    {
      id: 10,
      name: 'Wedding Cinema Studios',
      type: 'photographer',
      category: 'photography',
      price: '₹50,000 - ₹2,00,000',
      rating: 4.9,
      location: 'delhi',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Professional wedding photography and cinematography team capturing timeless moments with artistic vision.',
      features: ['Cinematic Videos', 'Traditional Photography', 'Drone Shots', 'Photo Albums', 'Same Day Edit', '4K Quality']
    },
    {
      id: 11,
      name: 'Royal Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹40,000 - ₹1,50,000',
      rating: 4.8,
      location: 'mumbai',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Luxury wedding photography service specializing in royal themes and traditional Indian wedding ceremonies.',
      features: ['Royal Themes', 'Traditional Coverage', 'Portrait Photography', 'Pre-Wedding Shoots', 'Album Design', 'HD Quality']
    },
    {
      id: 12,
      name: 'Candid Moments Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹35,000 - ₹1,20,000',
      rating: 4.9,
      location: 'jaipur',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Specialist in candid wedding photography capturing natural emotions and spontaneous moments throughout the celebration.',
      features: ['Candid Shots', 'Natural Poses', 'Emotional Moments', 'Storytelling', 'Quick Delivery', 'Professional Team']
    },
    {
      id: 13,
      name: 'Destination Wedding Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹60,000 - ₹3,00,000',
      rating: 5.0,
      location: 'goa',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Expert destination wedding photographers covering exotic locations with travel-ready equipment and international experience.',
      features: ['Destination Expert', 'Travel Ready', 'International Experience', 'Adventure Photography', 'Cultural Coverage', 'Premium Packages']
    },
    {
      id: 14,
      name: 'Artistic Wedding Films',
      type: 'photographer',
      category: 'photography',
      price: '₹45,000 - ₹1,80,000',
      rating: 4.7,
      location: 'udaipur',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Creative wedding photography and videography with artistic storytelling and cinematic editing techniques.',
      features: ['Artistic Vision', 'Creative Editing', 'Short Films', 'Teaser Videos', 'Color Grading', 'Professional Equipment']
    }
  ]

  const types = ['all', 'dj', 'dance', 'mehendi', 'photographer']

  const filteredArtists = allArtists.filter(artist => {
    const typeMatch = selectedType === 'all' || artist.type === selectedType
    const locationMatch = selectedLocation === 'all' || artist.location === selectedLocation
    
    // Price range filtering
    let priceMatch = true
    if (selectedPriceRange !== 'all') {
      const priceStr = artist.price.replace(/[₹,]/g, '').replace(' ', '')
      const priceNumbers = priceStr.split('-').map(p => parseInt(p))
      const minPrice = priceNumbers[0]
      const maxPrice = priceNumbers[1] || priceNumbers[0]
      
      if (selectedPriceRange === '0-30000') {
        priceMatch = maxPrice <= 30000
      } else if (selectedPriceRange === '30000-60000') {
        priceMatch = minPrice >= 30000 && maxPrice <= 60000
      } else if (selectedPriceRange === '60000-100000') {
        priceMatch = minPrice >= 60000 && maxPrice <= 100000
      } else if (selectedPriceRange === '100000+') {
        priceMatch = minPrice >= 100000
      }
    }
    
    return typeMatch && locationMatch && priceMatch
  })

  useEffect(() => {
    // Load mock artists and vendor services
    const loadArtists = () => {
      // Load vendor services from localStorage
      const vendorServices = []
      
      // Get all localStorage keys that match vendor services pattern
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('vendor_services_')) {
          try {
            const services = JSON.parse(localStorage.getItem(key))
            // Filter only artist services
            const artistServices = services.filter(service => service.category === 'artists')
            // Transform vendor services to artist format
            const transformedArtists = artistServices.map(service => ({
              id: `vendor_${service.id}`,
              name: service.name,
              type: 'vendor', // Custom type for vendor artists
              category: 'music',
              price: service.price,
              rating: 4.5, // Default rating for vendor services
              image: service.images && service.images.length > 0 
                ? service.images[0].preview 
                : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              location: service.location.toLowerCase(),
              description: service.description,
              contactPhone: service.contactPhone,
              contactEmail: service.contactEmail,
              vendorName: service.vendorName,
              isVendorService: true,
              vendorImages: service.images || [] // Store all vendor images
            }))
            vendorServices.push(...transformedArtists)
          } catch (error) {
            console.error('Error loading vendor services:', error)
          }
        }
      }

      // Combine mock artists with vendor services
      const allArtistsData = [...artists, ...vendorServices]
      setAllArtists(allArtistsData)
    }

    // Simulate loading
    const timer = setTimeout(() => {
      loadArtists()
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-pink-600">Loading amazing artists...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
              Wedding Artists
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Professional DJs, dance choreographers, mehendi artists, and photographers to make your wedding unforgettable
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Artist Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Artists' : 
                     type === 'dj' ? 'DJ Artists' :
                     type === 'dance' ? 'Dance Choreographers' :
                     type === 'mehendi' ? 'Mehendi Artists' :
                     'Photographers'}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Location:</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Price Range:</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-600">
              Showing {filteredArtists.length} artists
            </div>
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map(artist => (
            <div key={artist.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-pink-600 font-semibold text-sm">
                  {artist.isVendorService ? 'Vendor' : (
                    artist.type === 'dj' ? 'DJ' : 
                    artist.type === 'dance' ? 'Dance' : 
                    artist.type === 'mehendi' ? 'Mehendi' : 'Photo'
                  )}
                </div>
                {artist.isVendorService && (
                  <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-white font-semibold text-xs">
                    Listed by Vendor
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{artist.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{artist.description}</p>
                
                {artist.isVendorService && artist.vendorName && (
                  <p className="text-sm text-gray-500 mb-2">Listed by: {artist.vendorName}</p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 ml-1">{artist.rating}</span>
                  </div>
                  <div className="text-pink-600 font-bold">{artist.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.isVendorService ? (
                    <>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📍 {artist.location}
                      </span>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📞 {artist.contactPhone}
                      </span>
                    </>
                  ) : (
                    artist.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        {feature}
                      </span>
                    ))
                  )}
                </div>
                
                <Link 
                  to={`/artists/${artist.id}`}
                  className="block w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all duration-300 text-center font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No artists found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtistsPage
