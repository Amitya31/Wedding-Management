import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import ContactForm from '../../components/ContactForm'
import { favoritesAPI, reviewAPI } from '../../services/api'

const CatererDetail = () => {
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

  const catererDetails = {
    1: {
      id: 1,
      name: 'Royal Indian Caterers',
      cuisine: 'indian',
      category: 'wedding',
      price: '₹800 - ₹2000 per plate',
      rating: 4.9,
      images: [
        'https://cdn0.weddingwire.in/vendor/8242/3_2/960/jpg/cat5_15_368242-162236139093135.jpeg',
        'https://www.weddingsutra.com/images/Vendor_Images/Catering/gyanjee-caterers/gyanjee-caterers-10.jpg',
        'http://www.maharaniweddings.com/wp-content/gallery/damion-edwards-72213/indian-wedding-catering.jpg',
        'https://www.servicesutra.com/blog/wp-content/uploads/book-caterers-in-india-for-events.jpg'
      ],
      description: 'Authentic Indian cuisine with traditional recipes and royal presentation.',
      features: ['Traditional Recipes', 'Royal Presentation', 'Live Cooking', 'Regional Specialties', 'Dessert Counter', 'Professional Staff'],
      detailedDescription: 'Royal Indian Caterers brings authentic Indian cuisine with traditional recipes passed down through generations, presented with royal elegance for your special wedding celebration.',
      amenities: ['Live Cooking Stations', 'Regional Specialties', 'Royal Presentation', 'Professional Staff', 'Dessert Counter', 'Traditional Recipes'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '7 days before - 50% refund',
        setupTime: '4 hours before event',
        tasting: 'Complimentary menu tasting'
      },
      reviews: [
        { name: 'Priya & Raj', rating: 5, comment: 'Amazing authentic Indian food! Royal presentation was stunning.' },
        { name: 'Anjali & Vikram', rating: 5, comment: 'Traditional recipes were perfect. Live cooking was impressive!' },
        { name: 'Sarah & John', rating: 4, comment: 'Great regional specialties and professional service.' }
      ],
      contact: {
        phone: '+91 98765 43250',
        email: 'royal@indiancaterers.com',
        address: '123 Spice Market, Delhi - 110001'
      }
    },
    2: {
      id: 2,
      name: 'Continental Delights',
      cuisine: 'continental',
      category: 'wedding',
      price: '₹1200 - ₹3000 per plate',
      rating: 4.8,
      images: [
        'https://www.weddingsutra.com/images/Vendor_Images/Catering/gyanjee-caterers/gyanjee-caterers-10.jpg',
        'http://www.maharaniweddings.com/wp-content/gallery/damion-edwards-72213/indian-wedding-catering.jpg',
        'https://www.servicesutra.com/blog/wp-content/uploads/book-caterers-in-india-for-events.jpg',
        'http://3.bp.blogspot.com/-fqlaXRVrT1Y/UWyt0dKAvRI/AAAAAAAAJKg/jYenkvBSORU/s640/bigrajah-food.jpg'
      ],
      description: 'Premium continental cuisine with international flavors and elegant presentation.',
      features: ['International Cuisine', 'Live Grills', 'Salad Bar', 'Cheese Counter', 'Wine Pairing', 'Fine Dining Service'],
      detailedDescription: 'Continental Delights offers premium international cuisine with elegant presentation, live grills, and fine dining service for sophisticated wedding celebrations.',
      amenities: ['International Cuisine', 'Live Grills', 'Salad Bar', 'Cheese Counter', 'Wine Pairing', 'Fine Dining Service'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        setupTime: '5 hours before event',
        tasting: 'Premium wine and food pairing'
      },
      reviews: [
        { name: 'Neha & Arjun', rating: 5, comment: 'Perfect continental cuisine! Wine pairing was excellent.' },
        { name: 'Lisa & Mike', rating: 4, comment: 'Great live grills and international selection.' },
        { name: 'Kavya & Rohan', rating: 5, comment: 'Fine dining service was outstanding!' }
      ],
      contact: {
        phone: '+91 98765 43251',
        email: 'continental@delights.com',
        address: '456 Gourmet Street, Mumbai - 400001'
      }
    },
    3: {
      id: 3,
      name: 'Chinese Dragon Catering',
      cuisine: 'chinese',
      category: 'wedding',
      price: '₹700 - ₹1800 per plate',
      rating: 4.7,
      images: [
        'http://www.maharaniweddings.com/wp-content/gallery/damion-edwards-72213/indian-wedding-catering.jpg',
        'https://www.servicesutra.com/blog/wp-content/uploads/book-caterers-in-india-for-events.jpg',
        'http://3.bp.blogspot.com/-fqlaXRVrT1Y/UWyt0dKAvRI/AAAAAAAAJKg/jYenkvBSORU/s640/bigrajah-food.jpg',
        'https://www.weddingsutra.com/images/wedding-images/entertaining/wedding-caterers/wedding-caterers-pic6.jpg'
      ],
      description: 'Authentic Chinese cuisine with live noodle bars and dim sum stations.',
      features: ['Live Noodle Bar', 'Dim Sum Station', 'Wok Cooking', 'Szechuan Specialties', 'Tea Ceremony', 'Asian Desserts'],
      detailedDescription: 'Chinese Dragon Catering specializes in authentic Chinese cuisine with live cooking stations, traditional tea ceremonies, and Asian dessert selections.',
      amenities: ['Live Noodle Bar', 'Dim Sum Station', 'Wok Cooking', 'Szechuan Specialties', 'Tea Ceremony', 'Asian Desserts'],
      policies: {
        bookingAmount: '35% Advance',
        cancellationPolicy: '10 days before - 60% refund',
        setupTime: '3 hours before event',
        tasting: 'Traditional tea ceremony included'
      },
      reviews: [
        { name: 'Anita & Suresh', rating: 5, comment: 'Amazing live noodle bar! Authentic Chinese flavors.' },
        { name: 'Emma & David', rating: 4, comment: 'Great dim sum and tea ceremony.' },
        { name: 'Pooja & Karan', rating: 5, comment: 'Wok cooking was entertaining and delicious!' }
      ],
      contact: {
        phone: '+91 98765 43252',
        email: 'dragon@chinesecatering.com',
        address: '789 Dragon Lane, Bangalore - 560001'
      }
    },
    4: {
      id: 4,
      name: 'Italian Bella Vista',
      cuisine: 'italian',
      category: 'wedding',
      price: '₹1000 - ₹2500 per plate',
      rating: 4.9,
      images: [
        'https://www.servicesutra.com/blog/wp-content/uploads/book-caterers-in-india-for-events.jpg',
        'http://3.bp.blogspot.com/-fqlaXRVrT1Y/UWyt0dKAvRI/AAAAAAAAJKg/jYenkvBSORU/s640/bigrajah-food.jpg',
        'https://www.weddingsutra.com/images/wedding-images/entertaining/wedding-caterers/wedding-caterers-pic6.jpg',
        'https://i.pinimg.com/originals/e0/33/2e/e0332e0dec9e7d52f8e36c95a7dcb136.jpg'
      ],
      description: 'Traditional Italian cuisine with live pasta stations and wood-fired pizza.',
      features: ['Live Pasta Station', 'Wood-fired Pizza', 'Antipasti Bar', 'Wine Selection', 'Tiramisu Counter', 'Al Fresco Dining'],
      detailedDescription: 'Italian Bella Vista brings authentic Italian cuisine with live pasta stations, wood-fired pizza, and romantic al fresco dining for your wedding.',
      amenities: ['Live Pasta Station', 'Wood-fired Pizza', 'Antipasti Bar', 'Wine Selection', 'Tiramisu Counter', 'Al Fresco Dining'],
      policies: {
        bookingAmount: '45% Advance',
        cancellationPolicy: '12 days before - 65% refund',
        setupTime: '4 hours before event',
        tasting: 'Wine pairing with Italian specialties'
      },
      reviews: [
        { name: 'Meera & Rahul', rating: 5, comment: 'Perfect Italian cuisine! Live pasta was amazing.' },
        { name: 'Divya & Amit', rating: 5, comment: 'Wood-fired pizza was authentic and delicious.' },
        { name: 'Sneha & Vikas', rating: 4, comment: 'Great wine selection and romantic setup.' }
      ],
      contact: {
        phone: '+91 98765 43253',
        email: 'bella@italiancatering.com',
        address: '321 Roma Street, Chennai - 600001'
      }
    },
    5: {
      id: 5,
      name: 'Mexican Fiesta Caterers',
      cuisine: 'mexican',
      category: 'wedding',
      price: '₹600 - ₹1500 per plate',
      rating: 4.6,
      images: [
        'http://3.bp.blogspot.com/-fqlaXRVrT1Y/UWyt0dKAvRI/AAAAAAAAJKg/jYenkvBSORU/s640/bigrajah-food.jpg',
        'https://www.weddingsutra.com/images/wedding-images/entertaining/wedding-caterers/wedding-caterers-pic6.jpg',
        'https://i.pinimg.com/originals/e0/33/2e/e0332e0dec9e7d52f8e36c95a7dcb136.jpg',
        'https://i.pinimg.com/originals/5b/e0/04/5be004fff5f13886d74016ebf3455384.jpg'
      ],
      description: 'Vibrant Mexican cuisine with taco bars and tequila tasting.',
      features: ['Taco Bar', 'Nacho Station', 'Live Salsa', 'Tequila Tasting', 'Churro Cart', 'Mariachi Band'],
      detailedDescription: 'Mexican Fiesta Caterers brings vibrant Mexican cuisine with interactive taco bars, live salsa dancing, and festive entertainment for fun-filled weddings.',
      amenities: ['Taco Bar', 'Nacho Station', 'Live Salsa', 'Tequila Tasting', 'Churro Cart', 'Mariachi Band'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '7 days before - 50% refund',
        setupTime: '3 hours before event',
        tasting: 'Tequila and mezcal tasting included'
      },
      reviews: [
        { name: 'Nina & Sam', rating: 4, comment: 'Fun Mexican fiesta! Taco bar was great.' },
        { name: 'Rachel & Tom', rating: 5, comment: 'Live salsa and mariachi band were amazing!' },
        { name: 'Priya & Ben', rating: 4, comment: 'Great tequila tasting and churros.' }
      ],
      contact: {
        phone: '+91 98765 43254',
        email: 'fiesta@mexicancatering.com',
        address: '555 Fiesta Plaza, Hyderabad - 500001'
      }
    },
    6: {
      id: 6,
      name: 'Japanese Sakura Catering',
      cuisine: 'japanese',
      category: 'wedding',
      price: '₹1500 - ₹3500 per plate',
      rating: 4.8,
      images: [
        'https://www.weddingsutra.com/images/wedding-images/entertaining/wedding-caterers/wedding-caterers-pic6.jpg',
        'https://i.pinimg.com/originals/e0/33/2e/e0332e0dec9e7d52f8e36c95a7dcb136.jpg',
        'https://i.pinimg.com/originals/5b/e0/04/5be004fff5f13886d74016ebf3455384.jpg',
        'https://cdn.shortpixel.ai/spai/q_lossy+ex_1+ret_img/theweddingplanner.com.hk/wp-content/uploads/traditional_chinese_wedding_catering.jpg'
      ],
      description: 'Authentic Japanese cuisine with sushi bars and teppanyaki stations.',
      features: ['Sushi Bar', 'Teppanyaki Station', 'Tempura Counter', 'Sake Bar', 'Bento Boxes', 'Zen Garden Setup'],
      detailedDescription: 'Japanese Sakura Catering offers authentic Japanese cuisine with master sushi chefs, teppanyaki entertainment, and serene zen garden ambiance.',
      amenities: ['Sushi Bar', 'Teppanyaki Station', 'Tempura Counter', 'Sake Bar', 'Bento Boxes', 'Zen Garden Setup'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '21 days before - 80% refund',
        setupTime: '5 hours before event',
        tasting: 'Sake and sushi masterclass included'
      },
      reviews: [
        { name: 'Maya & Carlos', rating: 5, comment: 'Amazing sushi and teppanyaki show!' },
        { name: 'Zara & Ahmed', rating: 5, comment: 'Zen garden setup was beautiful and peaceful.' },
        { name: 'Lucy & James', rating: 4, comment: 'Great sake selection and bento boxes.' }
      ],
      contact: {
        phone: '+91 98765 43255',
        email: 'sakura@japanesecatering.com',
        address: '777 Sakura Avenue, Kolkata - 700001'
      }
    },
    7: {
      id: 7,
      name: 'Mediterranean Paradise',
      cuisine: 'mediterranean',
      category: 'wedding',
      price: '₹900 - ₹2200 per plate',
      rating: 4.7,
      images: [
        'https://i.pinimg.com/originals/e0/33/2e/e0332e0dec9e7d52f8e36c95a7dcb136.jpg',
        'https://i.pinimg.com/originals/5b/e0/04/5be004fff5f13886d74016ebf3455384.jpg',
        'https://cdn.shortpixel.ai/spai/q_lossy+ex_1+ret_img/theweddingplanner.com.hk/wp-content/uploads/traditional_chinese_wedding_catering.jpg',
        'https://www.bharatgangaram.com/wp-content/uploads/2018/07/asian-caterers.jpg'
      ],
      description: 'Fresh Mediterranean cuisine with mezze bars and grilled specialties.',
      features: ['Mezze Bar', 'Grilled Specialties', 'Fresh Seafood', 'Olive Bar', 'Hummus Station', 'Greek Desserts'],
      detailedDescription: 'Mediterranean Paradise offers fresh, healthy Mediterranean cuisine with interactive mezze bars, grilled specialties, and authentic Greek desserts.',
      amenities: ['Mezze Bar', 'Grilled Specialties', 'Fresh Seafood', 'Olive Bar', 'Hummus Station', 'Greek Desserts'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        setupTime: '4 hours before event',
        tasting: 'Olive oil and wine pairing included'
      },
      reviews: [
        { name: 'Ishita & Aditya', rating: 5, comment: 'Fresh Mediterranean flavors! Mezze bar was excellent.' },
        { name: 'Sophie & William', rating: 4, comment: 'Great grilled seafood and hummus station.' },
        { name: 'Aisha & Omar', rating: 5, comment: 'Healthy and delicious! Greek desserts were amazing.' }
      ],
      contact: {
        phone: '+91 98765 43256',
        email: 'paradise@medcatering.com',
        address: '999 Mediterranean Road, Pune - 411001'
      }
    },
    8: {
      id: 8,
      name: 'Thai Orchid Caterers',
      cuisine: 'thai',
      category: 'wedding',
      price: '₹800 - ₹2000 per plate',
      rating: 4.6,
      images: [
        'https://i.pinimg.com/originals/5b/e0/04/5be004fff5f13886d74016ebf3455384.jpg',
        'https://cdn.shortpixel.ai/spai/q_lossy+ex_1+ret_img/theweddingplanner.com.hk/wp-content/uploads/traditional_chinese_wedding_catering.jpg',
        'https://www.bharatgangaram.com/wp-content/uploads/2018/07/asian-caterers.jpg',
        'https://tse4.mm.bing.net/th/id/OIP.TCs7r5l73xWEXZIGJ3ilXwHaDS?pid=Api&P=0&h=180'
      ],
      description: 'Aromatic Thai cuisine with curry stations and fresh tropical fruits.',
      features: ['Curry Station', 'Fresh Spring Rolls', 'Tropical Fruits', 'Thai Tea Bar', 'Coconut Desserts', 'Lemongrass Decor'],
      detailedDescription: 'Thai Orchid Caterers brings aromatic Thai cuisine with interactive curry stations, fresh tropical fruits, and authentic Thai tea ceremonies.',
      amenities: ['Curry Station', 'Fresh Spring Rolls', 'Tropical Fruits', 'Thai Tea Bar', 'Coconut Desserts', 'Lemongrass Decor'],
      policies: {
        bookingAmount: '35% Advance',
        cancellationPolicy: '10 days before - 60% refund',
        setupTime: '3 hours before event',
        tasting: 'Thai tea ceremony included'
      },
      reviews: [
        { name: 'Maya & Carlos', rating: 4, comment: 'Aromatic Thai flavors! Curry station was great.' },
        { name: 'Zara & Ahmed', rating: 5, comment: 'Fresh tropical fruits and Thai tea were amazing.' },
        { name: 'Lucy & James', rating: 4, comment: 'Great coconut desserts and lemongrass decor.' }
      ],
      contact: {
        phone: '+91 98765 43257',
        email: 'orchid@thaicatering.com',
        address: '888 Thai Garden, Goa - 403001'
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
      alert('Please login to book this caterer')
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
        console.log('Removing from favorites for caterer:', caterer.id);
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${caterer.id}`, {
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
          venueId: caterer.id,
          venueType: 'caterer',
          notes: `Interested in ${caterer.name} catering services`
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
        venueId: caterer.id,
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

  // Load caterer from mock data or vendor services
  const getCaterer = () => {
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
            const service = services.find(s => s.id.toString() === serviceId && s.category === 'caterers')
            if (service) {
              // Transform vendor service to caterer format
              return {
                id: id,
                name: service.name,
                cuisine: 'vendor',
                category: 'wedding',
                price: service.price,
                rating: 4.5,
                images: service.images && service.images.length > 0 
                  ? service.images.map(img => img.preview)
                  : [
                      'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                      'https://picsum.photos/seed/caterer1/800/600.jpg',
                      'https://picsum.photos/seed/caterer2/800/600.jpg'
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
                  tasting: 'Menu tasting available'
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
    
    // Return mock caterer if not found in vendor services
    return catererDetails[id]
  }

  const caterer = getCaterer()

  // Check if caterer is already in favorites when component loads
  React.useEffect(() => {
    const checkIfFavorited = async () => {
      if (!isAuthenticated || !caterer) return
      
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
            fav => fav.venueId.toString() === caterer.id.toString()
          )
          setIsFavorited(isAlreadyFavorited)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    checkIfFavorited()
  }, [isAuthenticated, caterer])

  if (!caterer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Caterer not found</h2>
          <Link to="/caterers" className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
            Back to Caterers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate('/caterers')} className="mb-6 text-pink-600 hover:text-pink-700">
          ← Back to Caterers
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-4">
              <img src={caterer.images[selectedImage]} alt={caterer.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(caterer.images || []).map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-pink-500' : 'border-gray-200'}`}>
                  <img src={image} alt={`${caterer.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                {caterer.cuisine.charAt(0).toUpperCase() + caterer.cuisine.slice(1)} Cuisine
              </span>
              <h1 className="text-4xl font-bold text-gray-800 my-4">{caterer.name}</h1>
              <p className="text-2xl text-pink-600 font-bold mb-4">{caterer.price}</p>
              <p className="text-gray-600">{caterer.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {(caterer.features || []).map((feature, index) => (
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {caterer.name}</h2>
              <p className="text-gray-600">{caterer.detailedDescription}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {(caterer.amenities || []).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                    <span className="text-pink-500">🍽️</span>
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
                {(caterer.reviews || []).map((review, index) => (
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
                  <span className="text-gray-800 font-semibold">{caterer.policies.bookingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation:</span>
                  <span className="text-gray-800 font-semibold">{caterer.policies.cancellationPolicy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup Time:</span>
                  <span className="text-gray-800 font-semibold">{caterer.policies.setupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasting:</span>
                  <span className="text-gray-800 font-semibold">{caterer.policies.tasting}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              {caterer.isVendorService && caterer.vendorName && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-800">🏢 Listed by: {caterer.vendorName}</div>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{caterer.contactPhone || caterer.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{caterer.contactEmail || caterer.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{caterer.isVendorService ? caterer.contact.address : caterer.contact.address}</span>
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
          venue={caterer}
          buttonPosition={buttonPosition}
        />
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          venueId={caterer.id}
          venueType="caterer"
          venueName={caterer.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => showNotification(message)}
        />
      )}
    </div>
  )
}

export default CatererDetail;
