import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

const DecoratorsPage = () => {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [allDecorators, setAllDecorators] = useState([])
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

  // Load vendor services
  useEffect(() => {
    // Load decorators from API
    const loadDecorators = async () => {
      try {
        // Fetch vendor services (decorators)
        const token = localStorage.getItem('token');
        const vendorResponse = await fetch('http://localhost:3000/api/user/product/filter?vendorType=decorator', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const vendorData = await vendorResponse.json();
        
        // Transform vendor services to decorator format
        const vendorDecorators = vendorData.products ? vendorData.products.map(service => ({
          id: service._id,
          name: service.name,
          type: 'vendor',
          category: 'wedding',
          price: service.details?.startingPrice || 'Contact for pricing',
          rating: 4.5,
          image: service.images && service.images.length > 0 
            ? service.images[0]
            : 'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          description: service.description,
          location: service.location,
          features: [
            'Professional service',
            'Flexible pricing',
            'Direct vendor contact',
            'Customizable packages',
            'Experienced staff',
            'Quality assurance'
          ],
          contactPhone: service.contact,
          contactEmail: service.contact,
          vendorName: service.owner?.username || 'Vendor',
          isVendorService: true,
          vendorImages: service.images || [],
          style: service.details?.style || 'Modern',
          experience: service.details?.experience || 'Experienced',
          vendorId: service.owner
        })) : [];

        // Combine mock decorators with vendor services
        const allDecoratorsData = [...decorators, ...vendorDecorators]
        setAllDecorators(allDecoratorsData)
      } catch (error) {
        console.error('Error loading decorators:', error)
        // Fallback to mock decorators only
        setAllDecorators(decorators)
      }
    }

    loadDecorators()
  }, [])

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100000', label: 'Under ₹1,00,000' },
    { value: '100000-300000', label: '₹1,00,000 - ₹3,00,000' },
    { value: '300000-600000', label: '₹3,00,000 - ₹6,00,000' },
    { value: '600000-1000000', label: '₹6,00,000 - ₹10,00,000' },
    { value: '1000000+', label: 'Above ₹10,00,000' }
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

  const decorators = [
    {
      id: 1,
      name: 'Royal Wedding Decorators',
      type: 'traditional',
      category: 'wedding',
      price: '₹2,00,000 - ₹10,00,000',
      rating: 4.9,
      location: 'delhi',
      image: 'https://getethnic.com/wp-content/uploads/2020/09/207007-AmitaSPhotography-0084-orig.jpg',
      description: 'Luxurious traditional wedding decoration with authentic themes and premium materials for royal celebrations.',
      features: ['Traditional Themes', 'Premium Materials', 'Royal Setup', 'Floral Arrangements', 'Lighting Design', 'Stage Decoration']
    },
    {
      id: 2,
      name: 'Modern Wedding Planners',
      type: 'modern',
      category: 'wedding',
      price: '₹1,50,000 - ₹8,00,000',
      rating: 4.8,
      location: 'mumbai',
      image: 'https://decorsutrablog.com/wp-content/uploads/2020/06/DecorSutra_Wedding-Decor-3-_Bhoomi-EVents-Planners.jpg',
      description: 'Contemporary wedding decoration with minimalist designs, modern aesthetics, and innovative concepts.',
      features: ['Modern Designs', 'Minimalist Style', 'Innovative Concepts', 'LED Lighting', 'Contemporary Themes', 'Clean Aesthetics']
    },
    {
      id: 3,
      name: 'Floral Paradise Decorators',
      type: 'floral',
      category: 'wedding',
      price: '₹1,00,000 - ₹5,00,000',
      rating: 4.7,
      location: 'bangalore',
      image: 'https://www.trendydecorator.com/wedding/2.jpg',
      description: 'Specialized floral decoration services with exotic flowers, creative arrangements, and natural themes.',
      features: ['Exotic Flowers', 'Creative Arrangements', 'Natural Themes', 'Floral Arch', 'Centerpieces', 'Garden Setup']
    },
    {
      id: 4,
      name: 'Cultural Heritage Decor',
      type: 'cultural',
      category: 'wedding',
      price: '₹80,000 - ₹3,00,000',
      rating: 4.6,
      location: 'goa',
      image: 'https://indianweddingdecorators.com.au/wp-content/uploads/2022/04/Mandap-Decoration-Indian-Wedding-Decorators-Melbourne-Australia-15-1-1024x576.jpg',
      description: 'Authentic cultural decoration reflecting traditional Indian heritage and regional wedding customs.',
      features: ['Cultural Themes', 'Regional Styles', 'Traditional Elements', 'Heritage Decor', 'Ritual Setup', 'Authentic Materials']
    },
    {
      id: 5,
      name: 'Luxury Wedding Designers',
      type: 'luxury',
      category: 'wedding',
      price: '₹5,00,000 - ₹25,00,000',
      rating: 5.0,
      location: 'delhi',
      image: 'https://tse3.mm.bing.net/th/id/OIP.7S3-Ap9gRaopqixImJ-sogHaFj?pid=Api&P=0&h=180',
      description: 'Ultra-luxury wedding decoration with premium materials, exclusive designs, and personalized themes.',
      features: ['Luxury Materials', 'Exclusive Designs', 'Personalized Themes', 'Premium Lighting', 'Custom Setup', 'VIP Service']
    },
    {
      id: 6,
      name: 'Outdoor Garden Decorators',
      type: 'outdoor',
      category: 'wedding',
      price: '₹1,20,000 - ₹4,00,000',
      rating: 4.7,
      location: 'pune',
      image: 'https://tse2.mm.bing.net/th/id/OIP.y3BPpJLcFrSaILwcgTudVgHaE8?pid=Api&P=0&h=180',
      description: 'Beautiful outdoor wedding decoration with garden themes, natural elements, and open-air setups.',
      features: ['Garden Themes', 'Natural Elements', 'Outdoor Lighting', 'Tent Setup', 'Green Decor', 'Weather Protection']
    },
    {
      id: 7,
      name: 'Destination Wedding Planners',
      type: 'destination',
      category: 'wedding',
      price: '₹3,00,000 - ₹15,00,000',
      rating: 4.9,
      location: 'jaipur',
      image: 'https://www.marriagecolours.com/images/cwd-carousel/dbg3.jpg',
      description: 'Exotic destination wedding decoration with beach themes, palace settings, and international styles.',
      features: ['Beach Themes', 'Palace Settings', 'International Styles', 'Travel Setup', 'Exotic Decor', 'Destination Expertise']
    }
  ]

  const decoratorTypes = ['all', 'traditional', 'modern', 'floral', 'cultural', 'luxury', 'outdoor', 'destination']

  const filteredDecorators = allDecorators.filter(decorator => {
    const typeMatch = selectedType === 'all' || decorator.type === selectedType
    const locationMatch = selectedLocation === 'all' || decorator.location === selectedLocation
    
    // Price range filtering
    let priceMatch = true
    if (selectedPriceRange !== 'all') {
      const priceStr = decorator.price.replace(/[₹,]/g, '').replace(' ', '')
      const priceNumbers = priceStr.split('-').map(p => parseInt(p))
      const minPrice = priceNumbers[0]
      const maxPrice = priceNumbers[1] || priceNumbers[0]
      
      if (selectedPriceRange === '0-100000') {
        priceMatch = maxPrice <= 100000
      } else if (selectedPriceRange === '100000-300000') {
        priceMatch = minPrice >= 100000 && maxPrice <= 300000
      } else if (selectedPriceRange === '300000-600000') {
        priceMatch = minPrice >= 300000 && maxPrice <= 600000
      } else if (selectedPriceRange === '600000-1000000') {
        priceMatch = minPrice >= 600000 && maxPrice <= 1000000
      } else if (selectedPriceRange === '1000000+') {
        priceMatch = minPrice >= 1000000
      }
    }
    
    return typeMatch && locationMatch && priceMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
              Wedding Decorators
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Professional decorators to transform your wedding venue into a magical celebration
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Decorator Type:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {decoratorTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Decorators' : 
                     type.charAt(0).toUpperCase() + type.slice(1)}
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
              Showing {filteredDecorators.length} decorators
            </div>
          </div>
        </div>

        {/* Decorators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDecorators.map(decorator => (
            <div key={decorator.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={decorator.image} 
                  alt={decorator.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-pink-600 font-semibold text-sm">
                  {decorator.isVendorService ? 'Vendor' : (decorator.type.charAt(0).toUpperCase() + decorator.type.slice(1))}
                </div>
                {decorator.isVendorService && (
                  <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-white font-semibold text-xs">
                    Listed by Vendor
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{decorator.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{decorator.description}</p>
                
                {decorator.isVendorService && decorator.vendorName && (
                  <p className="text-sm text-gray-500 mb-2">Listed by: {decorator.vendorName}</p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 ml-1">{decorator.rating}</span>
                  </div>
                  <div className="text-pink-600 font-bold">{decorator.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {decorator.isVendorService ? (
                    <>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📍 {decorator.location}
                      </span>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📞 {decorator.contactPhone}
                      </span>
                    </>
                  ) : (
                    decorator.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        {feature}
                      </span>
                    ))
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    if (decorator.isVendorService) {
                      navigate(`/service/${decorator.id}/decorator`);
                    } else {
                      navigate(`/decorators/${decorator.id}`);
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

        {filteredDecorators.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No decorators found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DecoratorsPage