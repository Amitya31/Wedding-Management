import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import MessageModal from '../../components/MessageModal'
import ContactForm from '../../components/ContactForm'
import SimpleImage from '../../components/SimpleImage'

const ServiceDetail = () => {
  const { id, serviceType } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactType, setContactType] = useState('message')
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: ''
  })

  // Load service data on component mount
  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setService(data.product);
        } else {
          console.error('Service not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading service:', error);
        setLoading(false);
      }
    }
    
    loadService();
  }, [id]);

  // Check if service is favorited
  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!isAuthenticated || !service) return;

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
            fav => fav.venueId?.toString() === service._id?.toString()
          )
          setIsFavorited(isAlreadyFavorited)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    checkIfFavorited()
  }, [isAuthenticated, service])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please login to submit a review')
      navigate('/login')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const requestData = {
        venueId: service._id,
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
      });

      const data = await response.json();

      if (response.ok) {
        alert('Review submitted successfully!');
        setShowReviewForm(false)
        setReviewForm({ name: '', rating: 0, comment: '' })
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Review submission error:', error);
      alert('Failed to submit review. Please try again.');
    }
  }

  const handleBookNow = (event) => {
    if (!isAuthenticated) {
      alert('Please login to book this service')
      navigate('/login')
      return
    }
    
    const rect = event.target.getBoundingClientRect()
    setButtonPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    })
    
    setShowBookingModal(true)
  }

  const handleCallNow = () => {
    if (!isAuthenticated) {
      alert('Please login to request a call')
      navigate('/login')
      return
    }
    setContactType('call')
    setShowContactForm(true)
  }

  const handleSendMessage = () => {
    if (!isAuthenticated) {
      alert('Please login to send a message')
      navigate('/login')
      return
    }
    setShowMessageModal(true)
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      alert('Please login to write a review')
      navigate('/login')
      return
    }
    setShowReviewForm(true)
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
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${service._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (response.ok) {
          setIsFavorited(false)
          alert('Removed from favorites!')
        } else {
          alert(data.message || 'Failed to remove from favorites')
        }
      } else {
        // Add to favorites
        const requestData = {
          venueId: service._id,
          venueType: serviceType,
          notes: `Interested in ${service.name}`
        };
        
        const response = await fetch('http://localhost:3000/api/favourite/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestData)
        })

        const data = await response.json()

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

  if (loading || !service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service not found</h2>
          <Link to={`/${serviceType}s`} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600">
            Back to {serviceType}s
          </Link>
        </div>
      </div>
    )
  }

  // Render dynamic details based on service type
  const renderServiceDetails = () => {
    switch (service.vendorType) {
      case 'venue':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800">Venue Type</h4>
                <p className="text-gray-600">{service.details?.venueType || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Rooms</h4>
                <p className="text-gray-600">{service.details?.rooms || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Price Per Day</h4>
                <p className="text-gray-600">${service.details?.pricePerDay || 'Contact for pricing'}</p>
              </div>
            </div>
          </div>
        )
      case 'decorator':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800">Style</h4>
                <p className="text-gray-600">{service.details?.style || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Experience</h4>
                <p className="text-gray-600">{service.details?.experience || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Starting Price</h4>
                <p className="text-gray-600">${service.details?.startingPrice || 'Contact for pricing'}</p>
              </div>
            </div>
          </div>
        )
      case 'accessories':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800">Category</h4>
                <p className="text-gray-600">{service.details?.accessoryCategory || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Gender</h4>
                <p className="text-gray-600">{service.details?.gender || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Price Range</h4>
                <p className="text-gray-600">{service.details?.priceRange || 'Contact for pricing'}</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Get service-specific features and amenities
  const getServiceFeatures = () => {
    switch (service.vendorType) {
      case 'venue':
        return [
          'Professional service',
          'Customizable packages',
          'Experienced staff',
          'Quality assurance',
          'Flexible timing',
          'Dedicated support'
        ]
      case 'decorator':
        return [
          'Creative designs',
          'Professional setup',
          'Quality materials',
          'Expert team',
          'Custom themes',
          'Timely execution'
        ]
      case 'accessories':
        return [
          'Premium quality',
          'Latest designs',
          'Professional fitting',
          'Wide variety',
          'Custom orders',
          'Expert consultation'
        ]
      default:
        return []
    }
  }

  const getServiceAmenities = () => {
    switch (service.vendorType) {
      case 'venue':
        return [
          'Vendor managed service',
          'Flexible timing',
          'Custom arrangements',
          'Dedicated support',
          'Event coordination',
          'Backup services'
        ]
      case 'decorator':
        return [
          'Design consultation',
          'Site visit',
          '3D visualization',
          'Theme development',
          'Installation',
          'Cleanup services'
        ]
      case 'accessories':
        return [
          'Personal styling',
          'Size adjustments',
          'Delivery service',
          'Try-on sessions',
          'Alterations',
          'After-sales support'
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => {
              if (serviceType === 'accessories') {
                navigate('/accessories-makeup');
              } else {
                navigate(`/${serviceType}s`);
              }
            }}
            className="mb-6 flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to {serviceType === 'accessories' ? 'Accessories & Makeup' : `${serviceType}s`}
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <SimpleImage 
                  src={service.images?.[selectedImage] || 'https://via.placeholder.com/800x800/f0f0f0/999999?text=Service+Image'} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(service.images || []).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <SimpleImage 
                      src={image} 
                      alt={`${service.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      width={150}
                      height={150}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold capitalize">
                    {service.vendorType} Service
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-gray-700 ml-1 font-semibold">4.5</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
                <p className="text-2xl text-pink-600 font-bold mb-4">
                  {service.details?.pricePerDay || service.details?.startingPrice || service.details?.priceRange || 'Contact for pricing'}
                </p>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Details</h3>
                {renderServiceDetails()}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {getServiceFeatures().map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={handleBookNow}
                  className="flex-1 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 rounded-lg hover:from-pink-500 hover:to-pink-600 transition-all duration-300 font-semibold"
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
        </div>
      </div>

      {/* Detailed Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {service.name}</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Services Included */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {getServiceAmenities().map((amenity, index) => (
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
                  onClick={handleWriteReview}
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
                {(service.reviews || []).map((review, index) => (
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
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-semibold text-green-800">🏢 Listed by: {service.owner?.username || 'Professional Vendor'}</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{service.contact}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{service.contact}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{service.location}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <button 
                  onClick={handleCallNow}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Call Now
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="w-full border-2 border-pink-400 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
        venue={service}
        buttonPosition={buttonPosition}
      />

      {/* Message Modal */}
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
        venue={service}
      />

      {showContactForm && (
        <ContactForm
          venueId={service._id}
          venueType={serviceType}
          venueName={service.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => alert(message)}
        />
      )}
    </div>
  );
};

export default ServiceDetail;
