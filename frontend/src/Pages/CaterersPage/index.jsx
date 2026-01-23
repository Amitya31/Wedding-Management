import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const CaterersPage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [allCaterers, setAllCaterers] = useState([])
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
    // Load mock caterers and vendor services
    const loadCaterers = () => {
      // Load vendor services from localStorage
      const vendorServices = []
      
      // Get all localStorage keys that match vendor services pattern
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('vendor_services_')) {
          try {
            const services = JSON.parse(localStorage.getItem(key))
            // Filter only caterer services
            const catererServices = services.filter(service => service.category === 'caterers')
            // Transform vendor services to caterer format
            const transformedCaterers = catererServices.map(service => ({
              id: `vendor_${service.id}`,
              name: service.name,
              cuisine: 'vendor', // Custom cuisine for vendor caterers
              price: service.price,
              rating: 4.5, // Default rating for vendor services
              image: service.images && service.images.length > 0 
                ? service.images[0].preview 
                : 'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              location: service.location.toLowerCase(),
              description: service.description,
              specialties: [
                'Professional service',
                'Flexible pricing',
                'Direct vendor contact',
                'Customizable packages',
                'Experienced staff',
                'Quality assurance'
              ],
              contactPhone: service.contactPhone,
              contactEmail: service.contactEmail,
              vendorName: service.vendorName,
              isVendorService: true,
              vendorImages: service.images || [] // Store all vendor images
            }))
            vendorServices.push(...transformedCaterers)
          } catch (error) {
            console.error('Error loading vendor services:', error)
          }
        }
      }

      // Combine mock caterers with vendor services
      const allCaterersData = [...caterers, ...vendorServices]
      setAllCaterers(allCaterersData)
    }

    // Load vendor services
    loadCaterers()
  }, [])

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under ₹1,000 per plate' },
    { value: '1000-2000', label: '₹1,000 - ₹2,000 per plate' },
    { value: '2000-3000', label: '₹2,000 - ₹3,000 per plate' },
    { value: '3000+', label: 'Above ₹3,000 per plate' }
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

  const caterers = [
    {
      id: 1,
      name: 'Royal Indian Caterers',
      cuisine: 'indian',
      category: 'wedding',
      price: '₹1800 - ₹4000 per plate',
      rating: 4.9,
      location: 'delhi',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Authentic Indian cuisine with traditional recipes and royal presentation for wedding celebrations.',
      features: ['Traditional Recipes', 'Royal Presentation', 'Live Cooking', 'Regional Specialties', 'Dessert Counter', 'Professional Staff']
    },
    {
      id: 2,
      name: 'Continental Delights',
      cuisine: 'continental',
      category: 'wedding',
      price: '₹2000 - ₹5000 per plate',
      rating: 4.8,
      location: 'mumbai',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Premium continental cuisine with international flavors and elegant presentation for modern weddings.',
      features: ['International Cuisine', 'Live Grills', 'Salad Bar', 'Cheese Counter', 'Wine Pairing', 'Fine Dining Service']
    },
    {
      id: 3,
      name: 'Chinese Dragon Catering',
      cuisine: 'chinese',
      category: 'wedding',
      price: '₹700 - ₹1800 per plate',
      rating: 4.7,
      location: 'bangalore',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Authentic Chinese cuisine with live noodle bars and dim sum stations for unique wedding experiences.',
      features: ['Live Noodle Bar', 'Dim Sum Station', 'Wok Cooking', 'Szechuan Specialties', 'Tea Ceremony', 'Asian Desserts']
    },
    {
      id: 4,
      name: 'Italian Bella Vista',
      cuisine: 'italian',
      category: 'wedding',
      price: '₹1000 - ₹2500 per plate',
      rating: 4.8,
      location: 'chennai',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Traditional Italian cuisine with live pasta stations and wood-fired pizza for romantic weddings.',
      features: ['Live Pasta Station', 'Wood-fired Pizza', 'Antipasti Bar', 'Wine Selection', 'Tiramisu Counter', 'Al Fresco Dining']
    },
    {
      id: 5,
      name: 'Mexican Fiesta Caterers',
      cuisine: 'mexican',
      category: 'wedding',
      price: '₹600 - ₹1500 per plate',
      rating: 4.6,
      location: 'hyderabad',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Vibrant Mexican cuisine with taco bars and tequila tasting for fun-filled wedding celebrations.',
      features: ['Taco Bar', 'Nacho Station', 'Live Salsa', 'Tequila Tasting', 'Churro Cart', 'Mariachi Band']
    },
    {
      id: 6,
      name: 'Japanese Sakura Catering',
      cuisine: 'japanese',
      category: 'wedding',
      price: '₹1500 - ₹3500 per plate',
      rating: 4.7,
      location: 'bangalore',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Authentic Japanese cuisine with sushi bars and teppanyaki stations for elegant wedding dining.',
      features: ['Sushi Bar', 'Teppanyaki Station', 'Tempura Counter', 'Sake Bar', 'Bento Boxes', 'Zen Garden Setup']
    },
    {
      id: 7,
      name: 'Mediterranean Paradise',
      cuisine: 'mediterranean',
      category: 'wedding',
      price: '₹900 - ₹2200 per plate',
      rating: 4.7,
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Fresh Mediterranean cuisine with mezze bars and grilled specialties for healthy wedding feasts.',
      features: ['Mezze Bar', 'Grilled Specialties', 'Fresh Seafood', 'Olive Bar', 'Hummus Station', 'Greek Desserts']
    },
    {
      id: 8,
      name: 'Thai Orchid Caterers',
      cuisine: 'thai',
      category: 'wedding',
      price: '₹800 - ₹2000 per plate',
      rating: 4.6,
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Aromatic Thai cuisine with curry stations and fresh tropical fruits for exotic wedding flavors.',
      features: ['Curry Station', 'Fresh Spring Rolls', 'Tropical Fruits', 'Thai Tea Bar', 'Coconut Desserts', 'Lemongrass Decor']
    }
  ]

  const cuisineTypes = ['all', 'indian', 'continental', 'chinese', 'italian', 'mexican', 'japanese', 'mediterranean', 'thai']

  const filteredCaterers = allCaterers.filter(caterer => {
    const cuisineMatch = selectedCuisine === 'all' || caterer.cuisine === selectedCuisine
    const locationMatch = selectedLocation === 'all' || caterer.location === selectedLocation
    
    // Price range filtering
    let priceMatch = true
    if (selectedPriceRange !== 'all') {
      const priceStr = caterer.price.replace(/[₹,]/g, '').replace(' per plate', '').replace(' ', '')
      const priceNumbers = priceStr.split('-').map(p => parseInt(p))
      const minPrice = priceNumbers[0]
      const maxPrice = priceNumbers[1] || priceNumbers[0]
      
      if (selectedPriceRange === '0-1000') {
        priceMatch = maxPrice <= 1000
      } else if (selectedPriceRange === '1000-2000') {
        priceMatch = minPrice >= 1000 && maxPrice <= 2000
      } else if (selectedPriceRange === '2000-3000') {
        priceMatch = minPrice >= 2000 && maxPrice <= 3000
      } else if (selectedPriceRange === '3000+') {
        priceMatch = minPrice >= 3000
      }
    }
    
    return cuisineMatch && locationMatch && priceMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
              Wedding Caterers
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Exceptional cuisine and dining experiences to delight your wedding guests
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Cuisine Type:</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {cuisineTypes.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : 
                     cuisine === 'indian' ? 'Indian' :
                     cuisine === 'continental' ? 'Continental' :
                     cuisine === 'chinese' ? 'Chinese' :
                     cuisine === 'italian' ? 'Italian' :
                     cuisine === 'mexican' ? 'Mexican' :
                     cuisine === 'japanese' ? 'Japanese' :
                     cuisine === 'mediterranean' ? 'Mediterranean' :
                     'Thai'}
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
              Showing {filteredCaterers.length} caterers
            </div>
          </div>
        </div>

        {/* Caterers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaterers.map(caterer => (
            <div key={caterer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={caterer.image} 
                  alt={caterer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-pink-600 font-semibold text-sm">
                  {caterer.isVendorService ? 'Vendor' : (
                    caterer.cuisine === 'indian' ? 'Indian' :
                    caterer.cuisine === 'continental' ? 'Continental' :
                    caterer.cuisine === 'chinese' ? 'Chinese' :
                    caterer.cuisine === 'italian' ? 'Italian' :
                    caterer.cuisine === 'mexican' ? 'Mexican' :
                    caterer.cuisine === 'japanese' ? 'Japanese' :
                    caterer.cuisine === 'mediterranean' ? 'Mediterranean' :
                    'Thai'
                  )}
                </div>
                {caterer.isVendorService && (
                  <div className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full text-white font-semibold text-xs">
                    Listed by Vendor
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{caterer.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{caterer.description}</p>
                
                {caterer.isVendorService && caterer.vendorName && (
                  <p className="text-sm text-gray-500 mb-2">Listed by: {caterer.vendorName}</p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700 ml-1">{caterer.rating}</span>
                  </div>
                  <div className="text-pink-600 font-bold">{caterer.price}</div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {caterer.isVendorService ? (
                    <>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📍 {caterer.location}
                      </span>
                      <span className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        📞 {caterer.contactPhone}
                      </span>
                    </>
                  ) : (
                    (caterer.features || caterer.specialties || []).slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-pink-50 text-pink-600 rounded-full text-xs">
                        {feature}
                      </span>
                    ))
                  )}
                </div>
                
                <Link 
                  to={`/caterers/${caterer.id}`}
                  className="block w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all duration-300 text-center font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCaterers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No caterers found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CaterersPage
