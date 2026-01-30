import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import MessageModal from '../../components/MessageModal'
import ContactForm from '../../components/ContactForm'
import SimpleImage from '../../components/SimpleImage'

const VenueDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactType, setContactType] = useState('message')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
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
        'https://www.weddingsutra.com/images/the-taj-mahal-palace-img4.jpg',
        'https://www.eternalweddingz.in/storage/venue_images/Qibfkip8GWSzxPLRPu8Ad4ZO8wLHrMpxcddwUeVv.webp',
        'http://www.udaipurweddings.com/wp-content/uploads/2017/11/13-3.jpg',
        'https://www.weddingsbyneerajkamra.com/uploads/BlogPictures/default/udaivilas-hotel-udaipur.png'
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
        'https://tse1.mm.bing.net/th/id/OIP.SVY9BpvNHP2MV-or8q3sSwHaE7?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP.cMQWata8uis-1qbdG_H0SAHaDO?pid=Api&P=0&h=180',
        'https://media.weddingz.in/images/9bfe5bc7b49ce9f9385d0d9d2a3ca68f/148636425.jpg',
        'https://i.pinimg.com/736x/57/ea/99/57ea9907aed0b584bc0679de72f59e5c.jpg'
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
        'https://www.dreammakersevent.com/images/venues/udaipur/ramada/06.jpg',
        'https://www.remotelands.com/travelogues/app/uploads/2021/02/The-Leela-Palace-01-1920x960.jpg',
        'http://www.travelmango.in/wp-content/uploads/2018/02/The_Leela_Palace.jpg',
        'https://www.thelalit.com/wp-content/uploads/2017/02/Wedding-Setup7-Udaipur-768x562.jpg'
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
        'https://lh3.googleusercontent.com/uH_eJI8S0i5QXPTPDQ8QYynC5xefkhkG0EGMRx0F7a7TFN9DS7PZETafDZxGq5vWrbSL5pk3b1FqO5CN_ln-ND7nQNQ=w1000',
        'https://tse2.mm.bing.net/th/id/OIP.rUhgggt3UqD8hd0BlGwpqwHaEH?pid=Api&P=0&h=180',
        'https://www.hoteldekho.com/blog/wp-content/uploads/2022/06/15-Best-Wedding-Venues-In-Jaipur-2.jpg',
        'https://img.traveltriangle.com/blog/wp-content/uploads/2020/04/OG.jpg'
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
        'https://www.dreammakersevent.com/images/venues/udaipur/ramada/06.jpg',
        'https://www.remotelands.com/travelogues/app/uploads/2021/02/The-Leela-Palace-01-1920x960.jpg',
        'http://www.travelmango.in/wp-content/uploads/2018/02/The_Leela_Palace.jpg',
        'https://www.thelalit.com/wp-content/uploads/2017/02/Wedding-Setup7-Udaipur-768x562.jpg'
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
        'https://lh3.googleusercontent.com/uH_eJI8S0i5QXPTPDQ8QYynC5xefkhkG0EGMRx0F7a7TFN9DS7PZETafDZxGq5vWrbSL5pk3b1FqO5CN_ln-ND7nQNQ=w1000',
        'https://tse2.mm.bing.net/th/id/OIP.rUhgggt3UqD8hd0BlGwpqwHaEH?pid=Api&P=0&h=180',
        'https://www.hoteldekho.com/blog/wp-content/uploads/2022/06/15-Best-Wedding-Venues-In-Jaipur-2.jpg',
        'https://img.traveltriangle.com/blog/wp-content/uploads/2020/04/OG.jpg'
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
        'https://www.dreammakersevent.com/images/venues/udaipur/ramada/06.jpg',
        'https://www.remotelands.com/travelogues/app/uploads/2021/02/The-Leela-Palace-01-1920x960.jpg',
        'http://www.travelmango.in/wp-content/uploads/2018/02/The_Leela_Palace.jpg',
        'https://www.thelalit.com/wp-content/uploads/2017/02/Wedding-Setup7-Udaipur-768x562.jpg'
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
        'https://lh3.googleusercontent.com/uH_eJI8S0i5QXPTPDQ8QYynC5xefkhkG0EGMRx0F7a7TFN9DS7PZETafDZxGq5vWrbSL5pk3b1FqO5CN_ln-ND7nQNQ=w1000',
        'https://tse2.mm.bing.net/th/id/OIP.rUhgggt3UqD8hd0BlGwpqwHaEH?pid=Api&P=0&h=180',
        'https://www.hoteldekho.com/blog/wp-content/uploads/2022/06/15-Best-Wedding-Venues-In-Jaipur-2.jpg',
        'https://img.traveltriangle.com/blog/wp-content/uploads/2020/04/OG.jpg'
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
        'https://www.dreammakersevent.com/images/venues/udaipur/ramada/06.jpg',
        'https://www.remotelands.com/travelogues/app/uploads/2021/02/The-Leela-Palace-01-1920x960.jpg',
        'http://www.travelmango.in/wp-content/uploads/2018/02/The_Leela_Palace.jpg',
        'https://www.thelalit.com/wp-content/uploads/2017/02/Wedding-Setup7-Udaipur-768x562.jpg'
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
        'https://lh3.googleusercontent.com/uH_eJI8S0i5QXPTPDQ8QYynC5xefkhkG0EGMRx0F7a7TFN9DS7PZETafDZxGq5vWrbSL5pk3b1FqO5CN_ln-ND7nQNQ=w1000',
        'https://tse2.mm.bing.net/th/id/OIP.rUhgggt3UqD8hd0BlGwpqwHaEH?pid=Api&P=0&h=180',
        'https://www.hoteldekho.com/blog/wp-content/uploads/2022/06/15-Best-Wedding-Venues-In-Jaipur-2.jpg',
        'https://img.traveltriangle.com/blog/wp-content/uploads/2020/04/OG.jpg'
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

  // Load venue data on component mount
  useEffect(() => {
    const loadVenue = async () => {
      try {
        const venueData = await getVenue()
        setVenue(venueData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading venue:', error)
        setLoading(false)
      }
    }
    
    loadVenue()
  }, [id])

  // Load venue from mock data or vendor services
  const getVenue = async () => {
    // First check if it's a vendor service
    if (id) {
      try {
        // Try to fetch as vendor service
        const response = await fetch(`http://localhost:3000/api/user/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          const service = data.product;
          
          // Transform vendor service to venue format
          return {
            id: service._id,
            name: service.name,
            type: 'vendor',
            city: service.location.toLowerCase(),
            price: service.details?.pricePerDay || 'Contact for pricing',
            capacity: service.details?.rooms || '100-500 guests',
            rating: 4.5,
            images: service.images || [],
            description: service.description,
            features: [
              'Professional service',
              'Customizable packages',
              'Experienced staff',
              'Quality assurance'
            ],
            amenities: [
              'Vendor managed service',
              'Flexible timing',
              'Custom arrangements',
              'Dedicated support'
            ],
            contactPhone: service.contact,
            contactEmail: service.contact,
            vendorName: service.owner?.username || 'Vendor',
            isVendorService: true,
            vendorId: service.owner,
            venueType: service.details?.venueType || 'Hall',
            reviews: [] // Empty reviews for vendor services
          };
        }
      } catch (error) {
        console.log('Not a vendor service, trying mock data...');
      }
    }
    
    // Return mock venue if not found in vendor services
    return venueDetails[id];
  }

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
        venueId: venue.id,
        name: reviewForm.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      };
      
      console.log('Submitting review:', requestData);
      
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
    console.log('Book Now clicked - isAuthenticated:', isAuthenticated);
    console.log('Current showBookingModal state:', showBookingModal);
    
    if (!isAuthenticated) {
      alert('Please login to book this venue')
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
        console.log('Removing from favorites for venue:', venue.id);
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${venue.id}`, {
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
          venueId: venue.id,
          venueType: 'venue',
          notes: `Interested in ${venue.name}`
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

  // Check if venue is already in favorites when component loads
  React.useEffect(() => {
    const checkIfFavorited = async () => {
      if (!isAuthenticated || !venue) return
      
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
            fav => fav.venueId.toString() === venue.id.toString()
          )
          setIsFavorited(isAlreadyFavorited)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    checkIfFavorited()
  }, [isAuthenticated, venue])

  if (loading || !venue) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venue details...</p>
        </div>
      </div>
    )
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
                <SimpleImage 
                  src={venue.images[selectedImage]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                  crop="fill"
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
                    <SimpleImage 
                      src={image} 
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      width={150}
                      height={150}
                      crop="fill"
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
        venue={venue}
        buttonPosition={buttonPosition}
      />

      {/* Message Modal */}
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
        venue={venue}
      />

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          venueId={venue.id}
          venueType="venue"
          venueName={venue.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => showNotification(message)}
        />
      )}
    </div>
  )
}

export default VenueDetail;
