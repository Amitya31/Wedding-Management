import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import ContactForm from '../../components/ContactForm'
import { favoritesAPI, reviewAPI } from '../../services/api'

const DecoratorDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactType, setContactType] = useState('message')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: ''
  })

  const decoratorDetails = {
    1: {
      id: 1,
      name: 'Royal Wedding Decorators',
      type: 'traditional',
      category: 'wedding',
      price: '₹2,00,000 - ₹10,00,000',
      rating: 4.9,
      images: [
        'https://getethnic.com/wp-content/uploads/2020/09/207007-AmitaSPhotography-0084-orig.jpg',
        'https://decorsutrablog.com/wp-content/uploads/2020/06/DecorSutra_Wedding-Decor-3-_Bhoomi-EVents-Planners.jpg',
        'https://www.trendydecorator.com/wedding/2.jpg',
        'https://indianweddingdecorators.com.au/wp-content/uploads/2022/04/Mandap-Decoration-Indian-Wedding-Decorators-Melbourne-Australia-15-1-1024x576.jpg'
      ],
      description: 'Luxurious traditional wedding decoration with authentic themes and premium materials.',
      features: ['Traditional Themes', 'Premium Materials', 'Royal Setup', 'Floral Arrangements', 'Lighting Design', 'Stage Decoration'],
      detailedDescription: 'Royal Wedding Decorators brings authentic traditional themes with premium materials for royal celebrations.',
      amenities: ['Premium Materials', 'Traditional Themes', 'Royal Setup', 'Floral Arrangements', 'Lighting Design', 'Stage Decoration'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        setupTime: '2 days before event',
        consultation: 'Free initial consultation'
      },
      reviews: [
        { name: 'Priya & Raj', rating: 5, comment: 'Amazing traditional decoration! Made our wedding look royal.' },
        { name: 'Anjali & Vikram', rating: 5, comment: 'Premium materials and authentic designs. Worth every penny!' },
        { name: 'Sarah & John', rating: 4, comment: 'Beautiful traditional setup with attention to detail.' }
      ],
      contact: {
        phone: '+91 98765 43240',
        email: 'royal@weddingdecorators.com',
        address: '123 Royal Plaza, Delhi - 110001'
      }
    },
    2: {
      id: 2,
      name: 'Modern Wedding Planners',
      type: 'modern',
      category: 'wedding',
      price: '₹1,50,000 - ₹8,00,000',
      rating: 4.8,
      images: [
        'https://decorsutrablog.com/wp-content/uploads/2020/06/DecorSutra_Wedding-Decor-3-_Bhoomi-EVents-Planners.jpg',
        'https://www.trendydecorator.com/wedding/2.jpg',
        'https://indianweddingdecorators.com.au/wp-content/uploads/2022/04/Mandap-Decoration-Indian-Wedding-Decorators-Melbourne-Australia-15-1-1024x576.jpg',
        'https://tse3.mm.bing.net/th/id/OIP.7S3-Ap9gRaopqixImJ-sogHaFj?pid=Api&P=0&h=180'
      ],
      description: 'Contemporary wedding decoration with minimalist designs and modern aesthetics.',
      features: ['Modern Designs', 'Minimalist Style', 'Innovative Concepts', 'LED Lighting', 'Contemporary Themes', 'Clean Aesthetics'],
      detailedDescription: 'Modern Wedding Planners specializes in contemporary decoration with minimalist designs, innovative concepts, and cutting-edge lighting.',
      amenities: ['LED Lighting', 'Modern Designs', 'Minimalist Style', 'Contemporary Themes', 'Clean Aesthetics', 'Innovative Concepts'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '21 days before - 80% refund',
        setupTime: '1 day before event',
        consultation: 'Free design consultation'
      },
      reviews: [
        { name: 'Neha & Arjun', rating: 5, comment: 'Perfect modern setup! Clean and elegant designs.' },
        { name: 'Lisa & Mike', rating: 4, comment: 'Great contemporary themes and professional service.' },
        { name: 'Kavya & Rohan', rating: 5, comment: 'Innovative concepts and beautiful lighting effects.' }
      ],
      contact: {
        phone: '+91 98765 43241',
        email: 'modern@weddingdecorators.com',
        address: '456 Modern Avenue, Mumbai - 400001'
      }
    },
    3: {
      id: 3,
      name: 'Floral Paradise Decorators',
      type: 'floral',
      category: 'wedding',
      price: '₹1,00,000 - ₹6,00,000',
      rating: 4.9,
      images: [
        'https://www.trendydecorator.com/wedding/2.jpg',
        'https://indianweddingdecorators.com.au/wp-content/uploads/2022/04/Mandap-Decoration-Indian-Wedding-Decorators-Melbourne-Australia-15-1-1024x576.jpg',
        'https://tse3.mm.bing.net/th/id/OIP.7S3-Ap9gRaopqixImJ-sogHaFj?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.y3BPpJLcFrSaILwcgTudVgHaE8?pid=Api&P=0&h=180'
      ],
      description: 'Specialized floral decoration with exotic flowers and creative arrangements.',
      features: ['Exotic Flowers', 'Creative Arrangements', 'Natural Themes', 'Floral Arch', 'Centerpieces', 'Garden Setup'],
      detailedDescription: 'Floral Paradise Decorators creates stunning floral arrangements with exotic flowers and natural themes.',
      amenities: ['Exotic Flowers', 'Creative Arrangements', 'Natural Themes', 'Floral Arch', 'Centerpieces', 'Garden Setup'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        setupTime: '1 day before event',
        consultation: 'Free floral consultation'
      },
      reviews: [
        { name: 'Anita & Suresh', rating: 5, comment: 'Breathtaking floral arrangements! Exquisite flowers.' },
        { name: 'Emma & David', rating: 5, comment: 'Creative and natural themes. Perfect for our garden wedding.' },
        { name: 'Pooja & Karan', rating: 4, comment: 'Beautiful centerpieces and floral arch.' }
      ],
      contact: {
        phone: '+91 98765 43242',
        email: 'floral@weddingdecorators.com',
        address: '789 Garden Road, Bangalore - 560001'
      }
    },
    4: {
      id: 4,
      name: 'Cultural Heritage Decor',
      type: 'cultural',
      category: 'wedding',
      price: '₹80,000 - ₹5,00,000',
      rating: 4.7,
      images: [
        'https://indianweddingdecorators.com.au/wp-content/uploads/2022/04/Mandap-Decoration-Indian-Wedding-Decorators-Melbourne-Australia-15-1-1024x576.jpg',
        'https://tse3.mm.bing.net/th/id/OIP.7S3-Ap9gRaopqixImJ-sogHaFj?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.y3BPpJLcFrSaILwcgTudVgHaE8?pid=Api&P=0&h=180',
        'https://www.marriagecolours.com/images/cwd-carousel/dbg3.jpg'
      ],
      description: 'Authentic cultural decoration reflecting traditional Indian heritage.',
      features: ['Cultural Themes', 'Regional Styles', 'Traditional Elements', 'Heritage Decor', 'Ritual Setup', 'Authentic Materials'],
      detailedDescription: 'Cultural Heritage Decor specializes in authentic traditional Indian decoration with regional customs and heritage elements.',
      amenities: ['Cultural Themes', 'Regional Styles', 'Traditional Elements', 'Heritage Decor', 'Ritual Setup', 'Authentic Materials'],
      policies: {
        bookingAmount: '35% Advance',
        cancellationPolicy: '10 days before - 65% refund',
        setupTime: '2 days before event',
        consultation: 'Free cultural consultation'
      },
      reviews: [
        { name: 'Meera & Rahul', rating: 5, comment: 'Authentic cultural setup! Perfect traditional elements.' },
        { name: 'Divya & Amit', rating: 4, comment: 'Beautiful heritage decor with attention to rituals.' },
        { name: 'Sneha & Vikas', rating: 5, comment: 'Regional styles were perfectly captured.' }
      ],
      contact: {
        phone: '+91 98765 43243',
        email: 'cultural@weddingdecorators.com',
        address: '321 Heritage Street, Jaipur - 302001'
      }
    },
    5: {
      id: 5,
      name: 'Luxury Wedding Designers',
      type: 'luxury',
      category: 'wedding',
      price: '₹5,00,000 - ₹25,00,000',
      rating: 5.0,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.7S3-Ap9gRaopqixImJ-sogHaFj?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.y3BPpJLcFrSaILwcgTudVgHaE8?pid=Api&P=0&h=180',
        'https://www.marriagecolours.com/images/cwd-carousel/dbg3.jpg',
        'https://i.pinimg.com/originals/b8/c7/cf/b8c7cfc25fdccf106b114629031571fb.jpg'
      ],
      description: 'Ultra-luxury wedding decoration with premium materials and exclusive designs.',
      features: ['Luxury Materials', 'Exclusive Designs', 'Personalized Themes', 'Premium Lighting', 'Custom Setup', 'VIP Service'],
      detailedDescription: 'Luxury Wedding Designers offers ultra-luxury decoration with premium materials, exclusive designs, and personalized themes.',
      amenities: ['Luxury Materials', 'Exclusive Designs', 'Personalized Themes', 'Premium Lighting', 'Custom Setup', 'VIP Service'],
      policies: {
        bookingAmount: '60% Advance',
        cancellationPolicy: '30 days before - 90% refund',
        setupTime: '3 days before event',
        consultation: 'Complimentary luxury consultation'
      },
      reviews: [
        { name: 'Ishita & Aditya', rating: 5, comment: 'Absolutely luxurious! Beyond our expectations.' },
        { name: 'Sophie & William', rating: 5, comment: 'Premium materials and exclusive designs. Worth every penny!' },
        { name: 'Aisha & Omar', rating: 5, comment: 'VIP service and personalized themes were amazing.' }
      ],
      contact: {
        phone: '+91 98765 43244',
        email: 'luxury@weddingdecorators.com',
        address: '999 Luxury Boulevard, Delhi - 110001'
      }
    },
    6: {
      id: 6,
      name: 'Outdoor Garden Decorators',
      type: 'outdoor',
      category: 'wedding',
      price: '₹1,20,000 - ₹7,00,000',
      rating: 4.6,
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.y3BPpJLcFrSaILwcgTudVgHaE8?pid=Api&P=0&h=180',
        'https://www.marriagecolours.com/images/cwd-carousel/dbg3.jpg',
        'https://i.pinimg.com/originals/b8/c7/cf/b8c7cfc25fdccf106b114629031571fb.jpg',
        'https://getethnic.com/wp-content/uploads/2020/09/207007-AmitaSPhotography-0084-orig.jpg'
      ],
      description: 'Beautiful outdoor wedding decoration with garden themes and natural elements.',
      features: ['Garden Themes', 'Natural Elements', 'Outdoor Lighting', 'Tent Setup', 'Green Decor', 'Weather Protection'],
      detailedDescription: 'Outdoor Garden Decorators creates beautiful outdoor wedding setups with garden themes, natural elements, and weather protection.',
      amenities: ['Garden Themes', 'Natural Elements', 'Outdoor Lighting', 'Tent Setup', 'Green Decor', 'Weather Protection'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 75% refund',
        setupTime: '2 days before event',
        consultation: 'Free outdoor venue assessment'
      },
      reviews: [
        { name: 'Nina & Sam', rating: 4, comment: 'Great outdoor setup! Weather protection was excellent.' },
        { name: 'Rachel & Tom', rating: 5, comment: 'Beautiful garden themes and natural elements.' },
        { name: 'Priya & Ben', rating: 4, comment: 'Perfect tent setup and outdoor lighting.' }
      ],
      contact: {
        phone: '+91 98765 43245',
        email: 'outdoor@weddingdecorators.com',
        address: '555 Garden Valley, Pune - 411001'
      }
    },
    7: {
      id: 7,
      name: 'Destination Wedding Planners',
      type: 'destination',
      category: 'wedding',
      price: '₹3,00,000 - ₹15,00,000',
      rating: 4.8,
      images: [
        'https://www.marriagecolours.com/images/cwd-carousel/dbg3.jpg',
        'https://i.pinimg.com/originals/b8/c7/cf/b8c7cfc25fdccf106b114629031571fb.jpg',
        'https://getethnic.com/wp-content/uploads/2020/09/207007-AmitaSPhotography-0084-orig.jpg',
        'https://decorsutrablog.com/wp-content/uploads/2020/06/DecorSutra_Wedding-Decor-3-_Bhoomi-EVents-Planners.jpg'
      ],
      description: 'Exotic destination wedding decoration with beach themes and international styles.',
      features: ['Beach Themes', 'Palace Settings', 'International Styles', 'Travel Setup', 'Exotic Decor', 'Destination Expertise'],
      detailedDescription: 'Destination Wedding Planners specializes in exotic destination decoration with beach themes, palace settings, and international styles.',
      amenities: ['Beach Themes', 'Palace Settings', 'International Styles', 'Travel Setup', 'Exotic Decor', 'Destination Expertise'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '45 days before - 85% refund',
        setupTime: '4 days before event',
        consultation: 'Free destination planning consultation'
      },
      reviews: [
        { name: 'Maya & Carlos', rating: 5, comment: 'Amazing beach setup! Perfect destination wedding.' },
        { name: 'Zara & Ahmed', rating: 5, comment: 'Exotic decor and palace settings were stunning.' },
        { name: 'Lucy & James', rating: 4, comment: 'Great international styles and travel setup.' }
      ],
      contact: {
        phone: '+91 98765 43246',
        email: 'destination@weddingdecorators.com',
        address: '777 Beach Road, Goa - 403001'
      }
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleBookNow = (event) => {
    if (!isAuthenticated) {
      alert('Please login to book this decorator')
      navigate('/login')
      return
    }
    
    // Capture button position
    const rect = event.target.getBoundingClientRect()
    setButtonPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    })
    
    setShowBookingModal(true)
  }

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please login to save favorites')
      navigate('/login')
      return
    }

    setIsLoadingFavorite(true)
    
    try {
      const token = localStorage.getItem('token')
      
      if (isFavorited) {
        // Remove from favorites
        console.log('Removing from favorites for decorator:', decorator.id);
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${decorator.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        console.log('Remove response:', data);

        if (response.ok) {
          setIsFavorited(false)
          alert('Removed from favorites!')
        } else {
          alert(data.message || 'Failed to remove from favorites')
        }
      } else {
        // Add to favorites
        const requestData = {
          venueId: decorator.id,
          venueType: 'decorator',
          notes: `Interested in ${decorator.name} decoration services`
        };
        
        console.log('Adding to favorites with data:', requestData);
        
        const response = await fetch('http://localhost:3000/api/favourite/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestData)
        })
        
        const data = await response.json()
        console.log('Add response:', data);

        if (response.ok) {
          setIsFavorited(true)
          alert('Added to favorites!')
        } else {
          if (data.message.includes('already in favourites')) {
            setIsFavorited(true)
            alert('Already in favorites!')
          } else {
            alert(data.message || 'Failed to add to favorites')
          }
        }
      }
    } catch (error) {
      console.error('Favorite error:', error)
      alert('Failed to update favorites. Please try again.')
    } finally {
      setIsLoadingFavorite(false)
    }
  }

  const handleCallNow = () => {
    setContactType('call')
    setShowContactForm(true)
  }

  const handleSendMessage = () => {
    setContactType('message')
    setShowContactForm(true)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (!reviewForm.name || !reviewForm.rating || !reviewForm.comment) {
      showNotification('Please fill all fields', 'error')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const requestData = {
        venueId: decorator.id,
        name: reviewForm.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      };
      
      const response = await fetch('http://localhost:3000/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()

      if (response.ok) {
        showNotification('Review submitted successfully!')
        setShowReviewForm(false)
        setReviewForm({ name: '', rating: 0, comment: '' })
      } else {
        showNotification(data.message || 'Failed to submit review', 'error')
      }
    } catch (error) {
      console.error('Review submission error:', error)
      showNotification('Failed to submit review. Please try again.', 'error')
    }
  }

  // Load decorator from mock data or vendor services
  const getDecorator = () => {
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
            const service = services.find(s => s.id.toString() === serviceId && s.category === 'decorators')
            if (service) {
              // Transform vendor service to decorator format
              return {
                id: id,
                name: service.name,
                type: 'vendor',
                category: 'wedding',
                price: service.price,
                rating: 4.5,
                images: service.images && service.images.length > 0 
                  ? service.images.map(img => img.preview)
                  : [
                      'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                      'https://picsum.photos/seed/decorator1/800/600.jpg',
                      'https://picsum.photos/seed/decorator2/800/600.jpg'
                    ],
                description: service.description,
                features: [
                  'Professional service',
                  'Flexible pricing',
                  'Direct vendor contact',
                  'Customizable packages',
                  'Experienced staff',
                  'Quality assurance'
                ],
                detailedDescription: service.description,
                amenities: [
                  'Customer support',
                  'Online booking',
                  'Payment flexibility',
                  'Vendor consultation'
                ],
                policies: {
                  bookingAmount: 'Flexible booking terms',
                  cancellationPolicy: 'Flexible cancellation policy',
                  setupTime: 'Available on request',
                  consultation: 'Free consultation'
                },
                reviews: [],
                contact: {
                  phone: service.contactPhone,
                  email: service.contactEmail,
                  address: service.location
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
    
    // Return mock decorator if not found in vendor services
    return decoratorDetails[id]
  }

  const decorator = getDecorator()

  // Check if decorator is already in favorites when component loads
  React.useEffect(() => {
    const checkIfFavorited = async () => {
      if (!isAuthenticated || !decorator) return
      
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/favourite/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          const isAlreadyFavorited = data.favourites.some(
            fav => fav.venueId.toString() === decorator.id.toString()
          )
          setIsFavorited(isAlreadyFavorited)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    checkIfFavorited()
  }, [isAuthenticated, decorator])

  if (!decorator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Decorator not found</h2>
          <Link to="/decorators" className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
            Back to Decorators
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate('/decorators')} className="mb-6 text-pink-600 hover:text-pink-700">
          ← Back to Decorators
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-4">
              <img src={decorator.images[selectedImage]} alt={decorator.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(decorator.images || []).map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-pink-500' : 'border-gray-200'}`}>
                  <img src={image} alt={`${decorator.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                {decorator.type.charAt(0).toUpperCase() + decorator.type.slice(1)} Decorator
              </span>
              <h1 className="text-4xl font-bold text-gray-800 my-4">{decorator.name}</h1>
              <p className="text-2xl text-pink-600 font-bold mb-4">{decorator.price}</p>
              <p className="text-gray-600">{decorator.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {(decorator.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-pink-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleBookNow}
                className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-600 transition-all"
              >
                Book Now
              </button>
              <button 
                onClick={handleFavorite}
                disabled={isLoadingFavorite}
                className={`flex-1 border-2 py-3 rounded-lg transition-colors font-semibold ${
                  isFavorited 
                    ? 'bg-pink-100 border-pink-400 text-pink-600' 
                    : 'border-pink-400 text-pink-600 hover:bg-pink-50'
                } ${isLoadingFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoadingFavorite ? 'Saving...' : isFavorited ? '❤️ Saved' : '🤍 Save to Favorites'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {decorator.name}</h2>
              <p className="text-gray-600">{decorator.detailedDescription}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {(decorator.amenities || []).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <span className="text-pink-500">✨</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

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
                <form onSubmit={handleSubmitReview} className="mb-6 p-6 bg-pink-50 rounded-lg">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                      required
                    />
                    <div>
                      <label className="block text-gray-700 mb-2">Rating:</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({...reviewForm, rating: star})}
                            className={`text-2xl ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="Your Review"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                      rows="4"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {(decorator.reviews || []).map((review, index) => (
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

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Policies</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Amount:</span>
                  <span className="text-gray-800 font-semibold">{decorator.policies.bookingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation:</span>
                  <span className="text-gray-800 font-semibold">{decorator.policies.cancellationPolicy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup Time:</span>
                  <span className="text-gray-800 font-semibold">{decorator.policies.setupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation:</span>
                  <span className="text-gray-800 font-semibold">{decorator.policies.consultation}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              {decorator.isVendorService && decorator.vendorName && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-800">🏢 Listed by: {decorator.vendorName}</div>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{decorator.contactPhone || decorator.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{decorator.contactEmail || decorator.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{decorator.isVendorService ? decorator.contact.address : decorator.contact.address}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button 
                  onClick={handleCallNow}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Call Now
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="w-full border-2 border-pink-400 text-pink-600 py-2 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          venue={decorator}
          buttonPosition={buttonPosition}
        />
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          venueId={decorator.id}
          venueType="decorator"
          venueName={decorator.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => showNotification(message)}
        />
      )}
    </div>
  )
}

export default DecoratorDetail
