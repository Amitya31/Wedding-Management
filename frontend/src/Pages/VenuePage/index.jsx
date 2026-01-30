import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const VenuePage = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [venues, setVenues] = useState([])
  const [filteredVenues, setFilteredVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()

  // Price ranges for venues
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50000', label: 'Under ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200000-500000', label: '₹2,00,000 - ₹5,00,000' },
    { value: '500000+', label: 'Above ₹5,00,000' }
  ]

  // Venue types
  const venueTypes = [
    { id: 'all', name: 'All Venues', icon: '🏢' },
    { id: 'halls', name: 'Halls', icon: '🏛️' },
    { id: 'villas', name: 'Villas', icon: '🏡' },
    { id: 'farmhouse', name: 'Farmhouse', icon: '🌾' },
    { id: 'gardens', name: 'Gardens', icon: '🌳' },
    { id: 'hotels', name: '5 Star Hotels', icon: '🏨' }
  ]

  // Cities
  const cities = [
    { id: 'all', name: 'All Cities' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'jaipur', name: 'Jaipur' },
    { id: 'goa', name: 'Goa' },
    { id: 'udaipur', name: 'Udaipur' },
    { id: 'chandigarh', name: 'Chandigarh' }
  ]

  // Mock venue data
  const mockVenues = [
    {
      id: 1,
      name: 'Grand Royal Palace',
      type: 'halls',
      city: 'delhi',
      price: '₹50,000 - ₹2,00,000',
      capacity: '500-1000 guests',
      rating: 4.8,
      image: 'https://www.weddingsutra.com/images/the-taj-mahal-palace-img4.jpg',
      description: 'Luxurious banquet hall with modern amenities'
    },
    {
      id: 2,
      name: 'Sunset Villa Estate',
      type: 'villas',
      city: 'goa',
      price: '₹80,000 - ₹3,00,000',
      capacity: '200-500 guests',
      rating: 4.9,
      image: 'https://www.eternalweddingz.in/storage/venue_images/Qibfkip8GWSzxPLRPu8Ad4ZO8wLHrMpxcddwUeVv.webp',
      description: 'Beautiful beachfront villa perfect for intimate weddings'
    },
    {
      id: 3,
      name: 'Green Meadow Farmhouse',
      type: 'farmhouse',
      city: 'delhi',
      price: '₹40,000 - ₹1,50,000',
      capacity: '300-800 guests',
      rating: 4.6,
      image: 'http://www.udaipurweddings.com/wp-content/uploads/2017/11/13-3.jpg',
      description: 'Spacious farmhouse with lush green surroundings'
    },
    {
      id: 4,
      name: 'Rose Garden Paradise',
      type: 'gardens',
      city: 'jaipur',
      price: '₹30,000 - ₹1,00,000',
      capacity: '200-600 guests',
      rating: 4.7,
      image: 'https://www.weddingsbyneerajkamra.com/uploads/BlogPictures/default/udaivilas-hotel-udaipur.png',
      description: 'Romantic garden venue with beautiful floral arrangements'
    },
    {
      id: 5,
      name: 'Heritage Banquet Hall',
      type: 'halls',
      city: 'mumbai',
      price: '₹60,000 - ₹2,50,000',
      capacity: '400-900 guests',
      rating: 4.5,
      image: 'https://tse1.mm.bing.net/th/id/OIP.SVY9BpvNHP2MV-or8q3sSwHaE7?pid=Api&P=0&h=180',
      description: 'Traditional hall with modern facilities'
    },
    {
      id: 6,
      name: 'Luxury Garden Resort',
      type: 'gardens',
      city: 'bangalore',
      price: '₹45,000 - ₹1,80,000',
      capacity: '250-700 guests',
      rating: 4.8,
      image: 'https://tse3.mm.bing.net/th/id/OIP.cMQWata8uis-1qbdG_H0SAHaDO?pid=Api&P=0&h=180',
      description: 'Elegant garden resort with stunning landscapes'
    },
    {
      id: 7,
      name: 'Royal Farm Estate',
      type: 'farmhouse',
      city: 'udaipur',
      price: '₹70,000 - ₹2,80,000',
      capacity: '350-900 guests',
      rating: 4.9,
      image: 'https://media.weddingz.in/images/9bfe5bc7b49ce9f9385d0d9d2a3ca68f/148636425.jpg',
      description: 'Premium farmhouse with lake views'
    },
    {
      id: 8,
      name: 'Ocean View Villa',
      type: 'villas',
      city: 'goa',
      price: '₹90,000 - ₹3,50,000',
      capacity: '150-400 guests',
      rating: 4.7,
      image: 'https://i.pinimg.com/736x/57/ea/99/57ea9907aed0b584bc0679de72f59e5c.jpg',
      description: 'Stunning villa with panoramic ocean views'
    },
      {
      id: 9,
      name: 'Taj Hotel',
      type: 'hotels',
      city: 'jaipur',
      price: '₹90,000 - ₹3,50,000',
      capacity: '300-400 guests',
      rating: 4.5,
      image: 'https://media.weddingz.in/images/0684600e5ddd40a785d4f86d333dbcae/the-grand-orient-resort-dera-bassi-chandigarh.jpg',
      description: 'Luxurios Experience and Comfort'
    },
      {
      id: 10,
      name: 'Hilton',
      type: 'hotels',
      city: 'goa',
      price: '₹1,00,000 - ₹3,50,000',
      capacity: '250-400 guests',
      rating: 4.9,
      image: 'https://www.weddingsutra.com/images/the-taj-mahal-palace-img4.jpg',
      description: 'Top Class Services'
    }
  ]

  useEffect(() => {
    // Load venues from API
    const loadVenues = async () => {
      try {
        // Fetch vendor services (venues)
        const token = localStorage.getItem('token');
        const vendorResponse = await fetch('http://localhost:3000/api/user/product/filter?vendorType=venue', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const vendorData = await vendorResponse.json();
        
        // Transform vendor services to venue format
        const vendorVenues = vendorData.products ? vendorData.products.map(service => ({
          id: service._id,
          name: service.name,
          type: 'vendor', // Custom type for vendor venues
          location: service.location,
          price: service.details?.pricePerDay || 'Contact for pricing',
          rating: 4.5, // Default rating for vendor services
          image: service.images && service.images.length > 0 
            ? service.images[0]
            : 'https://www.eternalweddingz.in/storage/venue_images/Qibfkip8GWSzxPLRPu8Ad4ZO8wLHrMpxcddwUeVv.webp',
          capacity: service.details?.rooms || '100-500', // Use rooms from details
          description: service.description,
          contactPhone: service.contact,
          contactEmail: service.contact,
          vendorName: service.owner?.username || 'Vendor',
          isVendorService: true,
          vendorImages: service.images || [], // Store all vendor images
          venueType: service.details?.venueType || 'Hall',
          vendorId: service.owner
        })) : [];

        // Combine mock venues with vendor services (for now, until we have mock venues in backend)
        const allVenues = [...mockVenues, ...vendorVenues]
        setVenues(allVenues)
        setFilteredVenues(allVenues)
        setLoading(false)
      } catch (error) {
        console.error('Error loading venues:', error)
        // Fallback to mock venues only
        setVenues(mockVenues)
        setFilteredVenues(mockVenues)
        setLoading(false)
      }
    }

    // Simulate API call
    setTimeout(() => {
      loadVenues()
    }, 1000)
  }, [])

  useEffect(() => {
    // Filter venues based on selected type, city, and price range
    let filtered = venues

    if (selectedType !== 'all') {
      filtered = filtered.filter(venue => venue.type === selectedType)
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(venue => venue.city === selectedCity)
    }

    // Price range filtering
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(venue => {
        const priceStr = venue.price.replace(/[₹,]/g, '').replace(' ', '')
        const priceNumbers = priceStr.split('-').map(p => parseInt(p))
        const minPrice = priceNumbers[0]
        const maxPrice = priceNumbers[1] || priceNumbers[0]
        
        if (selectedPriceRange === '0-50000') {
          return maxPrice <= 50000
        } else if (selectedPriceRange === '50000-100000') {
          return minPrice >= 50000 && maxPrice <= 100000
        } else if (selectedPriceRange === '100000-200000') {
          return minPrice >= 100000 && maxPrice <= 200000
        } else if (selectedPriceRange === '200000-500000') {
          return minPrice >= 200000 && maxPrice <= 500000
        } else if (selectedPriceRange === '500000+') {
          return minPrice >= 500000
        }
        return true
      })
    }

    setFilteredVenues(filtered)
  }, [selectedType, selectedCity, selectedPriceRange, venues])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-pink-600">Loading amazing venues...</p>
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
              Find Your Perfect Wedding Venue
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Discover stunning venues across India for your dream wedding celebration
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Venue Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {venueTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.id === 'all' ? 'All Venues' : type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Location:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
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
              Showing {filteredVenues.length} venues
            </div>
          </div>
        </div>

      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              {filteredVenues.length}
            </span>
            <span className="text-gray-600 ml-2">Amazing Venues Found</span>
          </h2>
          {(selectedType !== 'all' || selectedCity !== 'all' || selectedPriceRange !== 'all') && (
            <p className="text-gray-600">
              Showing 
              {selectedType !== 'all' && (
                <span> <span className="font-semibold text-pink-600">{venueTypes.find(t => t.id === selectedType)?.name}</span></span>
              )}
              {selectedCity !== 'all' && (
                <span> in <span className="font-semibold text-pink-600">{cities.find(c => c.id === selectedCity)?.name}</span></span>
              )}
              {selectedPriceRange !== 'all' && (
                <span> with <span className="font-semibold text-pink-600">{priceRanges.find(r => r.value === selectedPriceRange)?.label}</span></span>
              )}
            </p>
          )}
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVenues.map(venue => (
            <div key={venue.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-pink-600 font-semibold text-sm">
                  {venue.isVendorService ? 'Vendor' : (venue.type.charAt(0).toUpperCase() + venue.type.slice(1))}
                </div>
                {venue.isVendorService && (
                  <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-white font-semibold text-xs">
                    Listed by Vendor
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{venue.description}</p>
                
                {venue.isVendorService && venue.vendorName && (
                  <p className="text-sm text-gray-500 mb-2">Listed by: {venue.vendorName}</p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 ml-1">{venue.rating}</span>
                  </div>
                  <div className="text-pink-600 font-bold">{venue.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                    📍 {venue.isVendorService ? venue.location : (venue.city.charAt(0).toUpperCase() + venue.city.slice(1))}
                  </span>
                  <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                    👥 {venue.capacity}
                  </span>
                </div>
                
                <button 
                  onClick={() => {
                    if (venue.isVendorService) {
                      navigate(`/service/${venue.id}/venue`);
                    } else {
                      navigate(`/venues/${venue.id}`);
                    }
                  }}
                  className="block w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all duration-300 text-center font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏰</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No venues found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VenuePage
