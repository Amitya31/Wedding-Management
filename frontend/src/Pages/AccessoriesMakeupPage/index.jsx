import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

const AccessoriesMakeupPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [allServices, setAllServices] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Get URL parameters
  const locationParam = searchParams.get('location')
  const searchParam = searchParams.get('search')

  // Initialize filter states from URL parameters
  const [selectedType, setSelectedType] = useState('all')
  const [selectedJewelleryType, setSelectedJewelleryType] = useState('all')
  const [selectedMakeupStyle, setSelectedMakeupStyle] = useState('all')
  const [selectedCostumeCategory, setSelectedCostumeCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState(locationParam || 'all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')

  // Update filters when URL parameters change
  useEffect(() => {
    if (locationParam) {
      setSelectedLocation(locationParam)
    }
  }, [locationParam])

  // Load vendor services
  useEffect(() => {
    // Load mock services and vendor services
    const loadServices = () => {
      // Load vendor services from localStorage
      const vendorServices = []
      
      // Get all localStorage keys that match vendor services pattern
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('vendor_services_')) {
          try {
            const services = JSON.parse(localStorage.getItem(key))
            // Filter only accessories-makeup services
            const accessoryServices = services.filter(service => service.category === 'accessories-makeup')
            // Transform vendor services to accessories format
            const transformedServices = accessoryServices.map(service => ({
              id: `vendor_${service.id}`,
              name: service.name,
              type: 'vendor', // Custom type for vendor services
              category: 'accessories-makeup',
              price: service.price,
              rating: 4.5, // Default rating for vendor services
              image: service.images && service.images.length > 0 
                ? service.images[0].preview 
                : 'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              location: service.location.toLowerCase(),
              description: service.description,
              features: [
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
            vendorServices.push(...transformedServices)
          } catch (error) {
            console.error('Error loading vendor services:', error)
          }
        }
      }

      // Combine mock services with vendor services
      const allServicesData = [...services, ...vendorServices]
      setAllServices(allServicesData)
    }

    // Load vendor services
    loadServices()
  }, [])

  // Mock data for accessories and makeup services
  const services = [
    {
      id: 1,
      name: 'Diamond Bridal Jewellery Collection',
      type: 'jewellery',
      category: 'bridal',
      price: '₹1,00,000 - ₹10,00,000',
      rating: 4.9,
      location: 'delhi',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Exquisite diamond bridal jewellery sets featuring premium quality diamonds in 18K gold settings. Includes necklace, earrings, maang tikka, bangles, and rings for complete bridal elegance.',
      features: ['Certified Diamonds', '18K Gold Settings', 'Custom Designs', 'Free Insurance', 'Lifetime Warranty']
    },
    {
      id: 2,
      name: 'Gold Bridal Jewellery Collection',
      type: 'jewellery',
      category: 'bridal',
      price: '₹50,000 - ₹5,00,000',
      rating: 4.8,
      location: 'mumbai',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Traditional gold bridal jewellery with intricate craftsmanship. Features 22K gold pieces with kundan, polki, and meenakari work for timeless bridal beauty.',
      features: ['22K Pure Gold', 'Kundan & Polki Work', 'Traditional Designs', 'BIS Hallmarked', 'Exchange Policy']
    },
    {
      id: 3,
      name: 'Silver Fashion Jewellery',
      type: 'jewellery',
      category: 'fashion',
      price: '₹15,000 - ₹50,000',
      rating: 4.7,
      location: 'hyderabad',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Elegant silver jewellery perfect for pre-wedding functions. Includes oxidized silver, sterling silver, and silver-plated pieces with contemporary designs.',
      features: ['925 Sterling Silver', 'Oxidized Finish', 'Contemporary Designs', 'Hypoallergenic', 'Affordable Luxury']
    },
    {
      id: 4,
      name: 'Fashion Jewellery Set',
      type: 'jewellery',
      category: 'fashion',
      price: '₹8,000 - ₹35,000',
      rating: 4.5,
      location: 'jaipur',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Trendy fashion jewellery sets for mehendi and sangeet functions. Includes American diamond pieces with modern designs and vibrant colors.',
      features: ['American Diamond', 'Lightweight Designs', 'Colorful Stones', 'Affordable Sets', 'Modern Styles']
    },
    {
      id: 5,
      name: 'South Indian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹15,000 - ₹45,000',
      rating: 4.7,
      location: 'chennai',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Traditional South Indian bridal makeup featuring bold eyes, defined brows, and classic red lips. Includes saree draping assistance and hair styling.',
      features: ['HD Makeup', 'Waterproof', 'Traditional Look', 'Saree Draping', 'Hair Styling', 'Trial Session']
    },
    {
      id: 6,
      name: 'North Indian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹30,000 - ₹1,00,000',
      rating: 4.8,
      location: 'delhi',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Modern North Indian bridal makeup with smoky eyes, contoured cheeks, and nude lips. Includes dupatta setting and jewelry assistance.',
      features: ['Airbrush Makeup', 'Contouring', 'Smoky Eyes', 'Dupatta Setting', 'Jewelry Assistance', 'Touch-up Kit']
    },
    {
      id: 7,
      name: 'Muslim Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹20,000 - ₹60,000',
      rating: 4.8,
      location: 'delhi',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Elegant Muslim bridal makeup focusing on natural beauty with defined eyes, soft contouring, and subtle lips. Includes hijab styling assistance.',
      features: ['Natural Look', 'Hijab Styling', 'Long-lasting', 'Premium Products', 'Photography Ready', 'Home Service']
    },
    {
      id: 8,
      name: 'Christian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹35,000 - ₹80,000',
      rating: 4.8,
      location: 'bangalore',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Sophisticated Christian bridal makeup with soft romantic looks, rosy cheeks, and natural lips. Includes veil placement and bouquet coordination.',
      features: ['Romantic Look', 'Veil Placement', 'Bouquet Coordination', 'Premium Brands', 'Multiple Looks', 'Video Ready']
    },
    {
      id: 9,
      name: 'Sangeet Party Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹8,000 - ₹25,000',
      rating: 4.3,
      location: 'goa',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Vibrant makeup for sangeet night with glitter, bold colors, and dance-proof formula. Includes quick touch-up service for multiple outfit changes.',
      features: ['Glitter Makeup', 'Dance-Proof', 'Bold Colors', 'Quick Touch-ups', 'Multiple Looks', 'Waterproof']
    },
    {
      id: 10,
      name: 'Mehendi Function Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹5,000 - ₹15,000',
      rating: 4.4,
      location: 'jaipur',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Natural, subtle makeup perfect for mehendi ceremonies. Focus on enhancing natural beauty with light, fresh looks.',
      features: ['Natural Look', 'Light Coverage', 'Mehendi-Friendly', 'Long-lasting', 'Subtle Colors', 'Quick Service']
    },
    {
      id: 11,
      name: 'Reception Party Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹18,000 - ₹55,000',
      rating: 4.6,
      location: 'mumbai',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Glamorous reception makeup with evening-appropriate colors and styles. Includes photography-ready finish and touch-up kit.',
      features: ['Evening Glamour', 'Photography Ready', 'Touch-up Kit', 'Long-lasting', 'Elegant Styles', 'Premium Products']
    },
    {
      id: 12,
      name: 'Bridal Lehenga Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹50,000 - ₹5,00,000',
      rating: 4.9,
      location: 'delhi',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Designer bridal lehengas featuring premium fabrics, intricate embroidery, and modern silhouettes. Includes custom fitting and designer consultation.',
      features: ['Designer Labels', 'Custom Fitting', 'Premium Fabrics', 'Intricate Embroidery', 'Matching Accessories', 'Alterations Included']
    },
    {
      id: 13,
      name: 'Bridal Saree Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹25,000 - ₹3,00,000',
      rating: 4.7,
      location: 'bangalore',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Traditional and modern bridal sarees including Kanjivaram, Banarasi, and designer sarees. Comes with blouse stitching and draping service.',
      features: ['Traditional Weaves', 'Blouse Stitching', 'Draping Service', 'Authentic Silk', 'Contemporary Designs', 'Preservation Tips']
    },
    {
      id: 14,
      name: 'Bridal Gown Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹30,000 - ₹4,00,000',
      rating: 4.8,
      location: 'mumbai',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      description: 'Elegant bridal gowns for modern brides. Features international designer collections with custom fitting and luxury fabrics.',
      features: ['Designer Gowns', 'Custom Fitting', 'Luxury Fabrics', 'International Brands', 'Modern Styles', 'Alterations Included']
    },
    {
      id: 15,
      name: 'Groom Sherwani Collection',
      type: 'costumes',
      category: 'groom',
      price: '₹20,000 - ₹2,00,000',
      rating: 4.8,
      location: 'delhi',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      description: 'Elegant groom sherwanis with premium fabrics, detailed embroidery, and modern cuts. Includes matching accessories and custom tailoring.',
      features: ['Designer Sherwanis', 'Custom Tailoring', 'Matching Accessories', 'Premium Fabrics', 'Modern Cuts', 'Express Delivery']
    },
    {
      id: 16,
      name: 'Groom Suit Collection',
      type: 'costumes',
      category: 'groom',
      price: '₹15,000 - ₹1,00,000',
      rating: 4.6,
      location: 'bangalore',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      description: 'Premium groom suits from international brands with custom fitting. Includes tuxedos, three-piece suits, and modern formal wear.',
      features: ['International Brands', 'Custom Fitting', 'Multiple Styles', 'Premium Fabrics', 'Accessories Included', 'Dry Cleaning Service']
    },
    {
      id: 17,
      name: 'Groom Traditional Wear',
      type: 'costumes',
      category: 'groom',
      price: '₹10,000 - ₹30,000',
      rating: 4.4,
      location: 'kolkata',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      description: 'Traditional groom wear including dhotis, kurta sets, and regional attire. Perfect for traditional wedding ceremonies.',
      features: ['Traditional Attire', 'Regional Styles', 'Comfortable Fabrics', 'Custom Stitching', 'Cultural Designs', 'Affordable Options']
    }
  ]

  const types = ['all', 'jewellery', 'makeup', 'costumes']
  const jewelleryTypes = ['all', 'diamond', 'gold', 'silver']
  const makeupStyles = ['all', 'south-indian', 'north-indian', 'muslim', 'christian']
  const costumeCategories = ['all', 'bride', 'groom']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25000', label: 'Under ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200000+', label: 'Above ₹2,00,000' }
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

  const filteredServices = allServices.filter(service => {
    const typeMatch = selectedType === 'all' || service.type === selectedType
    const locationMatch = selectedLocation === 'all' || service.location === selectedLocation
    
    // Price range filtering
    let priceMatch = true
    if (selectedPriceRange !== 'all') {
      const priceStr = service.price.replace(/[₹,]/g, '').replace(' ', '')
      const priceNumbers = priceStr.split('-').map(p => parseInt(p))
      const minPrice = priceNumbers[0]
      const maxPrice = priceNumbers[1] || priceNumbers[0]
      
      if (selectedPriceRange === '0-25000') {
        priceMatch = maxPrice <= 25000
      } else if (selectedPriceRange === '25000-50000') {
        priceMatch = minPrice >= 25000 && maxPrice <= 50000
      } else if (selectedPriceRange === '50000-100000') {
        priceMatch = minPrice >= 50000 && maxPrice <= 100000
      } else if (selectedPriceRange === '100000-200000') {
        priceMatch = minPrice >= 100000 && maxPrice <= 200000
      } else if (selectedPriceRange === '200000+') {
        priceMatch = minPrice >= 200000
      }
    }
    
    // Additional filters for specific types
    let jewelleryTypeMatch = true
    let makeupStyleMatch = true
    let costumeCategoryMatch = true
    
    if (service.type === 'jewellery' && selectedJewelleryType !== 'all') {
      jewelleryTypeMatch = service.name.toLowerCase().includes(selectedJewelleryType)
    }
    
    if (service.type === 'makeup' && selectedMakeupStyle !== 'all') {
      makeupStyleMatch = service.name.toLowerCase().includes(selectedMakeupStyle.replace('-', ' '))
    }
    
    if (service.type === 'costumes' && selectedCostumeCategory !== 'all') {
      costumeCategoryMatch = service.category === selectedCostumeCategory
    }
    
    return typeMatch && locationMatch && priceMatch && jewelleryTypeMatch && makeupStyleMatch && costumeCategoryMatch
  })

  const ServiceCard = ({ service }) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
        <div className="relative h-56">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 animate-pulse flex items-center justify-center">
              <div className="text-white">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-3">💎</div>
                <p className="text-white font-medium">Beautiful Service</p>
              </div>
            </div>
          ) : (
            <img 
              src={service.image} 
              alt={service.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
            />
          )}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-bold text-pink-600 flex items-center">
              ⭐ {service.rating}
            </span>
          </div>
          <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg">
            <span className="text-xs font-bold uppercase">{service.isVendorService ? 'Vendor' : service.type}</span>
          </div>
          {service.isVendorService && (
            <div className="absolute top-14 left-3 bg-green-500 text-white px-2 py-1 rounded-full shadow-lg">
              <span className="text-xs font-bold">Listed by Vendor</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
          
          {service.isVendorService && service.vendorName && (
            <p className="text-sm text-gray-500 mb-2">Listed by: {service.vendorName}</p>
          )}
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-700">
                <span className="text-lg mr-2">💫</span>
                <span className="font-medium capitalize">{service.category}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="text-lg mr-2">⭐</span>
                <span className="font-medium">{service.rating}</span>
              </div>
            </div>
            {service.isVendorService && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-lg mr-2">📍</span>
                <span>{service.location}</span>
              </div>
            )}
            <div className="text-lg font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              {service.price}
            </div>
          </div>
          
          <button 
            onClick={() => navigate(`/accessories-makeup/${service.id}`)}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-pink-600">Loading amazing services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 relative">

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
              Wedding Accessories & Makeup
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Complete your wedding look with our premium jewellery, costumes, and makeup services
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white/95 backdrop-blur-sm shadow-xl sticky top-0 z-40 border-b border-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Type</h3>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Jewellery Type Filter - Only show when jewellery is selected */}
            {selectedType === 'jewellery' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Jewellery Type</h3>
                <select 
                  value={selectedJewelleryType}
                  onChange={(e) => setSelectedJewelleryType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
                >
                  {jewelleryTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Makeup Style Filter - Only show when makeup is selected */}
            {selectedType === 'makeup' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Makeup Style</h3>
                <select 
                  value={selectedMakeupStyle}
                  onChange={(e) => setSelectedMakeupStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
                >
                  {makeupStyles.map(style => (
                    <option key={style} value={style}>
                      {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Costume Category Filter - Only show when costumes is selected */}
            {selectedType === 'costumes' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Costume Category</h3>
                <select 
                  value={selectedCostumeCategory}
                  onChange={(e) => setSelectedCostumeCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
                >
                  {costumeCategories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Location Filter - Always show */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter - Always show */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h3>
              <select 
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none bg-white text-gray-700 font-medium"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
            <button 
              onClick={() => {
                setSelectedType('all')
                setSelectedJewelleryType('all')
                setSelectedMakeupStyle('all')
                setSelectedCostumeCategory('all')
                setSelectedLocation('all')
                setSelectedPriceRange('all')
              }}
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-pink-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessoriesMakeupPage
