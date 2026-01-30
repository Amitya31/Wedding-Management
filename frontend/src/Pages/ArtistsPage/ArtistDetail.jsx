import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import MessageModal from '../../components/MessageModal'
import ContactForm from '../../components/ContactForm'
import SimpleImage from '../../components/SimpleImage'

const ArtistDetail = () => {
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
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 0,
    comment: ''
  })

  // Mock artist data with detailed information
  const artistDetails = {
    1: {
      id: 1,
      name: 'DJ Night Beats',
      type: 'dj',
      category: 'music',
      price: '₹25,000 - ₹75,000',
      rating: 4.8,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.AXOKRd8W13u8LmuvIqPcdAHaEK?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.H3xIYQnSzmb7YdWh7ZgMFAHaEh?pid=Api&P=0&h=180',
        'https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png',
        'https://tse3.mm.bing.net/th/id/OIP.AXOKRd8W13u8LmuvIqPcdAHaEK?pid=Api&P=0&h=180'
      ],
      description: 'Professional DJ service with latest sound equipment and extensive music library for all wedding functions.',
      features: ['Professional DJ', 'Latest Equipment', 'Extensive Music Library', 'Lighting Setup', 'MC Services', 'Custom Playlists'],
      detailedDescription: 'DJ Night Beats brings the ultimate musical experience to your wedding with state-of-the-art sound equipment, extensive music library spanning decades and genres, and professional MC services to keep your guests entertained throughout the celebration.',
      amenities: ['Professional Sound System', 'Lighting Effects', 'MC Services', 'Custom Playlists', 'Dance Floor Setup', 'Backup Equipment'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        setupTime: '3 hours before event',
        performanceTime: '4-6 hours included'
      },
      reviews: [
        { name: 'Rahul & Priya', rating: 5, comment: 'Amazing DJ! Kept the dance floor packed all night. Great music selection!' },
        { name: 'Anjali & Vikram', rating: 5, comment: 'Professional service with excellent equipment. The MC services were fantastic.' },
        { name: 'Sarah & John', rating: 4, comment: 'Great DJ with good music variety. Sound quality was excellent.' }
      ],
      contact: {
        phone: '+91 98765 43230',
        email: 'djnightbeats@weddingartists.com',
        address: '123 Music Studio, Mumbai - 400001'
      }
    },
    2: {
      id: 2,
      name: 'DJ Bollywood Mix',
      type: 'dj',
      category: 'music',
      price: '₹30,000 - ₹80,000',
      rating: 4.9,
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.H3xIYQnSzmb7YdWh7ZgMFAHaEh?pid=Api&P=0&h=180',
        'https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png',
        'https://tse3.mm.bing.net/th/id/OIP.AXOKRd8W13u8LmuvIqPcdAHaEK?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.H3xIYQnSzmb7YdWh7ZgMFAHaEh?pid=Api&P=0&h=180'
      ],
      description: 'Specialized Bollywood DJ with perfect mix of traditional and contemporary wedding music.',
      features: ['Bollywood Specialist', 'Traditional & Modern Mix', 'Live Mixing', 'Dance Floor Setup', 'Request Handling', 'Energy Management'],
      detailedDescription: 'DJ Bollywood Mix specializes in creating the perfect blend of traditional and contemporary Bollywood music for Indian weddings. Our expert DJs understand the cultural significance of each moment and curate the perfect soundtrack for your special day.',
      amenities: ['Bollywood Music Expert', 'Live Mixing', 'Dance Floor Setup', 'Request Handling', 'Energy Management', 'Cultural Music Knowledge'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        setupTime: '2 hours before event',
        performanceTime: '4-6 hours included'
      },
      reviews: [
        { name: 'Priya & Raj', rating: 5, comment: 'Perfect Bollywood mix! Everyone was dancing. Great energy management!' },
        { name: 'Neha & Amit', rating: 5, comment: 'Amazing DJ who understands Indian wedding traditions perfectly.' },
        { name: 'Kavita & Rohan', rating: 4, comment: 'Great music selection and energy. Made our sangeet night memorable.' }
      ],
      contact: {
        phone: '+91 98765 43231',
        email: 'djbollywood@weddingartists.com',
        address: '456 Bollywood Hub, Delhi - 110001'
      }
    },
    3: {
      id: 3,
      name: 'DJ International Beats',
      type: 'dj',
      category: 'music',
      price: '₹35,000 - ₹1,00,000',
      rating: 4.7,
      images: [
        'https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png',
        'https://tse3.mm.bing.net/th/id/OIP.AXOKRd8W13u8LmuvIqPcdAHaEK?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.H3xIYQnSzmb7YdWh7ZgMFAHaEh?pid=Api&P=0&h=180',
        'https://akm-img-a-in.tosshub.com/lingo/brt/images/story/202404/662f71d9be800-10-wedding-djs-to-book-for-your-wedding-290928589-16x9.png'
      ],
      description: 'International DJ service with global music collection and multilingual MC capabilities.',
      features: ['International Music', 'Multilingual MC', 'Global Hits', 'Cultural Integration', 'Advanced Sound System', 'Visual Effects'],
      detailedDescription: 'DJ International Beats brings a global music experience to your wedding with an extensive collection of international hits, multilingual MC services, and advanced sound systems that cater to diverse cultural backgrounds.',
      amenities: ['International Music Library', 'Multilingual MC', 'Advanced Sound System', 'Visual Effects', 'Cultural Integration', 'Global Hits'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '10 days before - 50% refund',
        setupTime: '4 hours before event',
        performanceTime: '6-8 hours included'
      },
      reviews: [
        { name: 'Maria & Carlos', rating: 5, comment: 'Perfect international music mix! Great multilingual MC services.' },
        { name: 'Sophie & Liu', rating: 4, comment: 'Amazing global music selection. Everyone loved the variety.' },
        { name: 'Emma & Ahmed', rating: 5, comment: 'Professional DJ with great cultural understanding and music knowledge.' }
      ],
      contact: {
        phone: '+91 98765 43232',
        email: 'internationalbeats@weddingartists.com',
        address: '789 Global Studio, Bangalore - 560001'
      }
    },
    4: {
      id: 4,
      name: 'Dance Studio Elite',
      type: 'dance',
      category: 'performance',
      price: '₹40,000 - ₹1,20,000',
      rating: 4.9,
      images: [
        'https://www.hire4event.com/blogs/wp-content/uploads/2019/05/choreo4.jpg',
        'https://www.visionvivaah.com/blog/wp-content/uploads/2019/08/Wedding-choreographers-in-Delhi-e1567416021780.jpg',
        'https://i.ytimg.com/vi/bdoqUbWbrpA/maxresdefault.jpg',
        'https://im.whatshot.in/img/2021/Sep/wedding-choreography-in-india-1631515077.jpg'
      ],
      description: 'Professional dance choreography team specializing in wedding performances and couple dances.',
      features: ['Expert Choreographers', 'Couple Dance Special', 'Group Performances', 'Theme-based Routines', 'Professional Training', 'Stage Coordination'],
      detailedDescription: 'Dance Studio Elite offers professional choreography services for weddings with expert choreographers specializing in couple dances, group performances, and theme-based routines that make your wedding entertainment unforgettable.',
      amenities: ['Expert Choreographers', 'Professional Training', 'Stage Coordination', 'Costume Guidance', 'Music Selection', 'Rehearsal Sessions'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        rehearsalTime: '10 sessions included',
        performanceTime: 'Full event coverage'
      },
      reviews: [
        { name: 'Anjali & Rohit', rating: 5, comment: 'Amazing choreography! Our couple dance was the highlight of the wedding.' },
        { name: 'Priya & Karan', rating: 5, comment: 'Professional team with great stage coordination. Perfect group performances!' },
        { name: 'Neha & Vikram', rating: 4, comment: 'Excellent choreographers who made us feel comfortable on stage.' }
      ],
      contact: {
        phone: '+91 98765 43233',
        email: 'dancestudio@weddingartists.com',
        address: '321 Dance Academy, Mumbai - 400001'
      }
    },
    5: {
      id: 5,
      name: 'Traditional Dance Academy',
      type: 'dance',
      category: 'performance',
      price: '₹35,000 - ₹80,000',
      rating: 4.8,
      images: [
        'https://www.visionvivaah.com/blog/wp-content/uploads/2019/08/Wedding-choreographers-in-Delhi-e1567416021780.jpg',
        'https://i.ytimg.com/vi/bdoqUbWbrpA/maxresdefault.jpg',
        'https://im.whatshot.in/img/2021/Sep/wedding-choreography-in-india-1631515077.jpg',
        'https://www.hire4event.com/blogs/wp-content/uploads/2019/05/choreo4.jpg'
      ],
      description: 'Classical and traditional dance performances for authentic wedding ceremonies.',
      features: ['Classical Dance', 'Traditional Forms', 'Cultural Performances', 'Costume Design', 'Live Music Integration', 'Ritual Dances'],
      detailedDescription: 'Traditional Dance Academy specializes in classical and traditional dance performances that add cultural authenticity to your wedding ceremonies with expert dancers, authentic costumes, and live music integration.',
      amenities: ['Classical Dance Experts', 'Traditional Costumes', 'Live Music Integration', 'Cultural Performances', 'Ritual Dances', 'Authentic Choreography'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        rehearsalTime: '8 sessions included',
        performanceTime: 'Ceremony coverage'
      },
      reviews: [
        { name: 'Lakshmi & Suresh', rating: 5, comment: 'Beautiful traditional performances! Added so much cultural value to our wedding.' },
        { name: 'Radhika & Venkat', rating: 5, comment: 'Authentic classical dances with beautiful costumes and live music.' },
        { name: 'Ananya & Pradeep', rating: 4, comment: 'Professional traditional dancers who understand cultural significance.' }
      ],
      contact: {
        phone: '+91 98765 43234',
        email: 'traditionaldance@weddingartists.com',
        address: '654 Cultural Center, Chennai - 600001'
      }
    },
    6: {
      id: 6,
      name: 'Modern Dance Crew',
      type: 'dance',
      category: 'performance',
      price: '₹30,000 - ₹90,000',
      rating: 4.7,
      images: [
        'https://i.ytimg.com/vi/bdoqUbWbrpA/maxresdefault.jpg',
        'https://im.whatshot.in/img/2021/Sep/wedding-choreography-in-india-1631515077.jpg',
        'https://www.hire4event.com/blogs/wp-content/uploads/2019/05/choreo4.jpg',
        'https://www.visionvivaah.com/blog/wp-content/uploads/2019/08/Wedding-choreographers-in-Delhi-e1567416021780.jpg'
      ],
      description: 'Contemporary dance group with hip-hop, salsa, and fusion performances for modern weddings.',
      features: ['Contemporary Styles', 'Hip-hop & Salsa', 'Fusion Performances', 'High Energy Shows', 'Custom Choreography', 'Professional Dancers'],
      detailedDescription: 'Modern Dance Crew brings contemporary dance styles including hip-hop, salsa, and fusion performances to modern weddings with high-energy shows and custom choreography tailored to your preferences.',
      amenities: ['Contemporary Dance Styles', 'Professional Dancers', 'Custom Choreography', 'High Energy Shows', 'Fusion Performances', 'Modern Music'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '10 days before - 60% refund',
        rehearsalTime: '12 sessions included',
        performanceTime: 'Full event coverage'
      },
      reviews: [
        { name: 'Sarah & Mike', rating: 5, comment: 'Amazing contemporary performances! High energy and great choreography.' },
        { name: 'Priya & David', rating: 4, comment: 'Great fusion dance performances. Everyone loved the modern style.' },
        { name: 'Neha & Chris', rating: 5, comment: 'Professional dancers with amazing energy and stage presence.' }
      ],
      contact: {
        phone: '+91 98765 43235',
        email: 'moderndance@weddingartists.com',
        address: '987 Dance Studio, Delhi - 110001'
      }
    },
    7: {
      id: 7,
      name: 'Mehendi Art Studio',
      type: 'mehendi',
      category: 'art',
      price: '₹5,000 - ₹25,000',
      rating: 4.9,
      images: [
        'http://www.aurusjewels.com/cdn/shop/articles/Mehndi_in_Indian_weddings.jpg?v=1676727334',
        'https://i.pinimg.com/originals/39/f6/a1/39f6a17dcf2ce841225b774fe68495c0.jpg',
        'https://www.brides.com/thmb/vqbfOD1EHQ_16-0PA2DsCzA2TAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/harneet-and-sim-wedding-04-e906dd6a818349f3946a22199ae883ed.jpg',
        'http://4.bp.blogspot.com/-6842IX0Gn8A/UNNUxvw3BjI/AAAAAAAABz4/_lpdQKuTnoc/s1600/1.jpg'
      ],
      description: 'Expert mehendi artists specializing in traditional, Arabic, and contemporary bridal designs.',
      features: ['Bridal Mehendi', 'Traditional Designs', 'Arabic Patterns', 'Custom Art', 'Natural Henna', 'Quick Service'],
      detailedDescription: 'Mehendi Art Studio offers expert mehendi services with traditional, Arabic, and contemporary bridal designs using natural henna and custom artistry to create beautiful, lasting mehendi for your special day.',
      amenities: ['Expert Mehendi Artists', 'Natural Henna', 'Custom Designs', 'Home Service', 'Quick Application', 'Bridal Packages'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '3 days before - 80% refund',
        applicationTime: '2-4 hours',
        colorGuarantee: 'Dark color guaranteed'
      },
      reviews: [
        { name: 'Priya Sharma', rating: 5, comment: 'Beautiful mehendi design! Exactly what I wanted for my wedding.' },
        { name: 'Anjali Patel', rating: 5, comment: 'Expert artist with great attention to detail. Natural henna with dark color.' },
        { name: 'Kavita Reddy', rating: 4, comment: 'Professional service with beautiful traditional and modern designs.' }
      ],
      contact: {
        phone: '+91 98765 43236',
        email: 'mehendiart@weddingartists.com',
        address: '123 Art Studio, Mumbai - 400001'
      }
    },
    8: {
      id: 8,
      name: 'Royal Mehendi Artists',
      type: 'mehendi',
      category: 'art',
      price: '₹8,000 - ₹35,000',
      rating: 4.8,
      images: [
        'https://i.pinimg.com/originals/39/f6/a1/39f6a17dcf2ce841225b774fe68495c0.jpg',
        'https://www.brides.com/thmb/vqbfOD1EHQ_16-0PA2DsCzA2TAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/harneet-and-sim-wedding-04-e906dd6a818349f3946a22199ae883ed.jpg',
        'http://4.bp.blogspot.com/-6842IX0Gn8A/UNNUxvw3BjI/AAAAAAAABz4/_lpdQKuTnoc/s1600/1.jpg',
        'http://www.aurusjewels.com/cdn/shop/articles/Mehndi_in_Indian_weddings.jpg?v=1676727334'
      ],
      description: 'Luxury mehendi service with intricate designs and premium natural henna for royal bridal look.',
      features: ['Intricate Designs', 'Premium Henna', 'Royal Patterns', 'Bridal Packages', 'Family Mehendi', 'Home Service'],
      detailedDescription: 'Royal Mehendi Artists provides luxury mehendi services with intricate designs, premium natural henna, and royal patterns that create a majestic bridal look with comprehensive packages for the entire family.',
      amenities: ['Luxury Mehendi Service', 'Premium Natural Henna', 'Intricate Royal Designs', 'Family Packages', 'Home Service', 'Bridal Consultation'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '5 days before - 70% refund',
        applicationTime: '3-5 hours',
        colorGuarantee: 'Premium dark color guaranteed'
      },
      reviews: [
        { name: 'Divya Singh', rating: 5, comment: 'Luxury mehendi service with intricate designs. Worth every penny!' },
        { name: 'Radhika Kumar', rating: 5, comment: 'Royal patterns with premium henna. Beautiful dark color that lasted long.' },
        { name: 'Ananya Gupta', rating: 4, comment: 'Professional service with attention to detail. Family package was great.' }
      ],
      contact: {
        phone: '+91 98765 43237',
        email: 'royalmehendi@weddingartists.com',
        address: '456 Royal Art Studio, Delhi - 110001'
      }
    },
    9: {
      id: 9,
      name: 'Contemporary Mehendi Art',
      type: 'mehendi',
      category: 'art',
      price: '₹6,000 - ₹20,000',
      rating: 4.7,
      images: [
        'https://www.brides.com/thmb/vqbfOD1EHQ_16-0PA2DsCzA2TAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/harneet-and-sim-wedding-04-e906dd6a818349f3946a22199ae883ed.jpg',
        'http://4.bp.blogspot.com/-6842IX0Gn8A/UNNUxvw3BjI/AAAAAAAABz4/_lpdQKuTnoc/s1600/1.jpg',
        'http://www.aurusjewels.com/cdn/shop/articles/Mehndi_in_Indian_weddings.jpg?v=1676727334',
        'https://i.pinimg.com/originals/39/f6/a1/39f6a17dcf2ce841225b774fe68495c0.jpg'
      ],
      description: 'Modern mehendi artists with fusion designs, minimalist patterns, and contemporary bridal art.',
      features: ['Modern Designs', 'Minimalist Art', 'Fusion Patterns', 'Quick Application', 'Skin-friendly Henna', 'Trendy Styles'],
      detailedDescription: 'Contemporary Mehendi Art specializes in modern mehendi designs with fusion patterns, minimalist art, and contemporary bridal styles using skin-friendly henna and trendy designs for the modern bride.',
      amenities: ['Modern Mehendi Designs', 'Fusion Patterns', 'Skin-friendly Henna', 'Quick Application', 'Trendy Styles', 'Contemporary Art'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '3 days before - 80% refund',
        applicationTime: '1-3 hours',
        colorGuarantee: 'Good color guaranteed'
      },
      reviews: [
        { name: 'Neha Patel', rating: 5, comment: 'Modern mehendi designs with fusion patterns. Exactly what I wanted!' },
        { name: 'Riya Sharma', rating: 4, comment: 'Contemporary style with quick application. Great for modern brides.' },
        { name: 'Anita Reddy', rating: 5, comment: 'Trendy designs with skin-friendly henna. Professional service.' }
      ],
      contact: {
        phone: '+91 98765 43238',
        email: 'contemporarymehendi@weddingartists.com',
        address: '789 Modern Art Studio, Bangalore - 560001'
      }
    },
    10: {
      id: 10,
      name: 'Wedding Cinema Studios',
      type: 'photographer',
      category: 'photography',
      price: '₹50,000 - ₹2,00,000',
      rating: 4.9,
      images: [
        'https://eventorganizers.in/wp-content/uploads/2024/02/Photographer-in-Hyderabd.webp',
        'https://tse3.mm.bing.net/th/id/OIP.wy2aj4ejMOeF89QF3vo0_wHaDj?pid=Api&P=0&h=180',
        'https://media.weddingz.in/images/4321dc871ddd6bbaef194f26d6215277/10-best-wedding-photographers-for-your-south-indian-wedding.jpg',
        'https://www.weddingstats.org/wp-content/uploads/2019/11/06-e1572878327320.jpg'
      ],
      description: 'Professional wedding photography and cinematography team capturing timeless moments with artistic vision.',
      features: ['Cinematic Videos', 'Traditional Photography', 'Drone Shots', 'Photo Albums', 'Same Day Edit', '4K Quality'],
      detailedDescription: 'Wedding Cinema Studios brings cinematic excellence to your wedding day with our team of professional photographers and videographers. We specialize in creating timeless memories through artistic storytelling, cutting-edge equipment, and a passion for capturing every precious moment of your special day.',
      amenities: ['4K Cinema Cameras', 'Drone Photography', 'Professional Lighting', 'Same Day Edit', 'Premium Photo Albums', 'Backup Equipment'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '30 days before - 70% refund',
        coverageTime: 'Full day coverage (12 hours)',
        deliveryTime: '30-45 days for final delivery'
      },
      reviews: [
        { name: 'Priya & Raj', rating: 5, comment: 'Absolutely stunning cinematography! Our wedding film looked like a Bollywood movie.' },
        { name: 'Anjali & Vikram', rating: 5, comment: 'Professional team with amazing attention to detail. Drone shots were incredible!' },
        { name: 'Sarah & John', rating: 4, comment: 'Great photography and videography services. Same day edit was a wonderful surprise.' }
      ],
      contact: {
        phone: '+91 98765 43240',
        email: 'weddingcinema@weddingartists.com',
        address: '123 Cinema Studio, Delhi - 110001'
      }
    },
    11: {
      id: 11,
      name: 'Royal Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹40,000 - ₹1,50,000',
      rating: 4.8,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.wy2aj4ejMOeF89QF3vo0_wHaDj?pid=Api&P=0&h=180',
        'https://media.weddingz.in/images/4321dc871ddd6bbaef194f26d6215277/10-best-wedding-photographers-for-your-south-indian-wedding.jpg',
        'https://www.weddingstats.org/wp-content/uploads/2019/11/06-e1572878327320.jpg',
        'https://www.atlhea.in/wp-content/uploads/2020/11/31.jpg'
      ],
      description: 'Luxury wedding photography service specializing in royal themes and traditional Indian wedding ceremonies.',
      features: ['Royal Themes', 'Traditional Coverage', 'Portrait Photography', 'Pre-Wedding Shoots', 'Album Design', 'HD Quality'],
      detailedDescription: 'Royal Photography specializes in capturing the grandeur and elegance of traditional Indian weddings with a royal touch. Our expert photographers understand the cultural significance of each ritual and ceremony, creating stunning portraits that reflect the majesty of your special day.',
      amenities: ['Traditional Photography Experts', 'Royal Theme Props', 'Portrait Studio Setup', 'Pre-Wedding Sessions', 'Luxury Album Design', 'HD Equipment'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '21 days before - 60% refund',
        coverageTime: 'Full day coverage (10 hours)',
        deliveryTime: '20-30 days for final delivery'
      },
      reviews: [
        { name: 'Divya & Karan', rating: 5, comment: 'Royal theme photography was breathtaking! Felt like we were in a palace.' },
        { name: 'Radhika & Amit', rating: 5, comment: 'Amazing traditional wedding coverage. Every ritual captured beautifully.' },
        { name: 'Ananya & Rohit', rating: 4, comment: 'Professional photographers with great attention to traditional details.' }
      ],
      contact: {
        phone: '+91 98765 43241',
        email: 'royalphotography@weddingartists.com',
        address: '456 Royal Studio, Mumbai - 400001'
      }
    },
    12: {
      id: 12,
      name: 'Candid Moments Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹35,000 - ₹1,20,000',
      rating: 4.9,
      images: [
        'https://media.weddingz.in/images/4321dc871ddd6bbaef194f26d6215277/10-best-wedding-photographers-for-your-south-indian-wedding.jpg',
        'https://www.weddingstats.org/wp-content/uploads/2019/11/06-e1572878327320.jpg',
        'https://www.atlhea.in/wp-content/uploads/2020/11/31.jpg',
        'https://tse4.mm.bing.net/th/id/OIP.mc1alybT5u-vbgblkjNKEQHaEJ?pid=Api&P=0&h=180'
      ],
      description: 'Specialist in candid wedding photography capturing natural emotions and spontaneous moments throughout the celebration.',
      features: ['Candid Shots', 'Natural Poses', 'Emotional Moments', 'Storytelling', 'Quick Delivery', 'Professional Team'],
      detailedDescription: 'Candid Moments Photography excels in capturing the genuine emotions and spontaneous moments that make your wedding unique. Our documentary-style approach focuses on natural interactions, authentic expressions, and the real story of your special day.',
      amenities: ['Candid Photography Experts', 'Natural Light Specialists', 'Storytelling Approach', 'Quick Turnaround', 'Professional Team', 'Unobtrusive Coverage'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '14 days before - 50% refund',
        coverageTime: 'Full day coverage (8 hours)',
        deliveryTime: '15-20 days for delivery'
      },
      reviews: [
        { name: 'Neha & Sameer', rating: 5, comment: 'Amazing candid photography! Caught emotions we didn\'t even notice.' },
        { name: 'Priya & Arjun', rating: 5, comment: 'Natural and spontaneous moments captured beautifully. Very professional team.' },
        { name: 'Kavita & Rahul', rating: 4, comment: 'Great candid shots with quick delivery. Loved the storytelling approach.' }
      ],
      contact: {
        phone: '+91 98765 43242',
        email: 'candidmoments@weddingartists.com',
        address: '789 Candid Studio, Jaipur - 302001'
      }
    },
    13: {
      id: 13,
      name: 'Destination Wedding Photography',
      type: 'photographer',
      category: 'photography',
      price: '₹60,000 - ₹3,00,000',
      rating: 5.0,
      images: [
        'https://www.weddingstats.org/wp-content/uploads/2019/11/06-e1572878327320.jpg',
        'https://www.atlhea.in/wp-content/uploads/2020/11/31.jpg',
        'https://tse4.mm.bing.net/th/id/OIP.mc1alybT5u-vbgblkjNKEQHaEJ?pid=Api&P=0&h=180',
        'https://eventorganizers.in/wp-content/uploads/2024/02/Photographer-in-Hyderabd.webp'
      ],
      description: 'Expert destination wedding photographers covering exotic locations with travel-ready equipment and international experience.',
      features: ['Destination Expert', 'Travel Ready', 'International Experience', 'Adventure Photography', 'Cultural Coverage', 'Premium Packages'],
      detailedDescription: 'Destination Wedding Photography specializes in capturing love stories in exotic locations around the world. Our experienced team is travel-ready with international experience, understanding the unique challenges and opportunities of destination weddings.',
      amenities: ['International Travel Experience', 'Adventure Photography Gear', 'Cultural Photography Knowledge', 'Destination Planning', 'Premium Packages', 'Multilingual Team'],
      policies: {
        bookingAmount: '60% Advance',
        cancellationPolicy: '45 days before - 80% refund',
        coverageTime: 'Multi-day coverage available',
        deliveryTime: '60-90 days for final delivery'
      },
      reviews: [
        { name: 'Maria & Carlos', rating: 5, comment: 'Perfect destination photography in Bali! Captured the location beautifully.' },
        { name: 'Sophie & Liu', rating: 5, comment: 'Amazing international experience. Made our destination wedding stress-free.' },
        { name: 'Emma & Ahmed', rating: 5, comment: 'Professional team with great cultural understanding. Worth every penny!' }
      ],
      contact: {
        phone: '+91 98765 43243',
        email: 'destinationphoto@weddingartists.com',
        address: '321 Travel Studio, Goa - 403001'
      }
    },
    14: {
      id: 14,
      name: 'Artistic Wedding Films',
      type: 'photographer',
      category: 'photography',
      price: '₹45,000 - ₹1,80,000',
      rating: 4.7,
      images: [
        'https://www.atlhea.in/wp-content/uploads/2020/11/31.jpg',
        'https://tse4.mm.bing.net/th/id/OIP.mc1alybT5u-vbgblkjNKEQHaEJ?pid=Api&P=0&h=180',
        'https://eventorganizers.in/wp-content/uploads/2024/02/Photographer-in-Hyderabd.webp',
        'https://tse3.mm.bing.net/th/id/OIP.wy2aj4ejMOeF89QF3vo0_wHaDj?pid=Api&P=0&h=180'
      ],
      description: 'Creative wedding photography and videography with artistic storytelling and cinematic editing techniques.',
      features: ['Artistic Vision', 'Creative Editing', 'Short Films', 'Teaser Videos', 'Color Grading', 'Professional Equipment'],
      detailedDescription: 'Artistic Wedding Films brings a creative and cinematic approach to wedding photography. Our team combines artistic vision with technical expertise to create stunning visual narratives that capture the unique essence of your love story.',
      amenities: ['Creative Photography Team', 'Cinematic Editing Suite', 'Color Grading Experts', 'Short Film Production', 'Teaser Video Creation', 'Professional Equipment'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '21 days before - 60% refund',
        coverageTime: 'Full day coverage (10 hours)',
        deliveryTime: '45-60 days for final delivery'
      },
      reviews: [
        { name: 'Anjali & Rohan', rating: 5, comment: 'Artistic photography exceeded our expectations! Creative and unique shots.' },
        { name: 'Priya & David', rating: 4, comment: 'Great cinematic approach. Love the artistic editing and color grading.' },
        { name: 'Neha & Chris', rating: 5, comment: 'Creative team with amazing vision. Our wedding film was like a movie!' }
      ],
      contact: {
        phone: '+91 98765 43244',
        email: 'artisticfilms@weddingartists.com',
        address: '654 Art Studio, Udaipur - 313001'
      }
    }
  }

  // Load artist from mock data or vendor services
  const getArtist = () => {
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
            const service = services.find(s => s.id.toString() === serviceId && s.category === 'artists')
            if (service) {
              // Transform vendor service to artist format
              return {
                id: id,
                name: service.name,
                type: 'vendor',
                category: 'music',
                price: service.price,
                rating: 4.5,
                images: service.images && service.images.length > 0 
                  ? service.images.map(img => img.preview)
                  : [
                      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                      'https://picsum.photos/seed/artist1/800/600.jpg',
                      'https://picsum.photos/seed/artist2/800/600.jpg'
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
                  performanceTime: 'Flexible timing'
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
    
    // Return mock artist if not found in vendor services
    return artistDetails[id]
  }

  const artist = getArtist()

  const handleBookNow = (event) => {
    if (!isAuthenticated) {
      alert('Please login to book this artist')
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
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${artist.id}`, {
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
        const requestData = {
          venueId: artist.id,
          venueType: 'artist',
          notes: `Interested in ${artist.name}`
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
        venueId: artist.id,
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

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Artist not found</h2>
          <Link 
            to="/artists"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Back to Artists
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
            onClick={() => navigate('/artists')}
            className="mb-6 flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to Artists
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <SimpleImage 
                  src={artist.images[selectedImage]} 
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={800}
                  crop="fill"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(artist.images || []).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <SimpleImage 
                      src={image} 
                      alt={`${artist.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      width={150}
                      height={150}
                      crop="fill"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Artist Information */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                    {artist.type === 'dj' ? 'DJ Artist' : 
                     artist.type === 'dance' ? 'Dance Choreographer' :
                     artist.type === 'mehendi' ? 'Mehendi Artist' :
                     'Photographer'}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-gray-700 ml-1 font-semibold">{artist.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{artist.name}</h1>
                <p className="text-2xl text-pink-600 font-bold mb-4">{artist.price}</p>
                <p className="text-gray-600 leading-relaxed">{artist.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(artist.features || []).map((feature, index) => (
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
                  className="flex-1 border-2 border-pink-400 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {artist.name}</h2>
              <p className="text-gray-600 leading-relaxed">{artist.detailedDescription}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {(artist.amenities || []).map((amenity, index) => (
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
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">Rating:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
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
                    ></textarea>
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
                {(artist.reviews || []).map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Policies */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Policies</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Amount:</span>
                  <span className="text-gray-800 font-semibold">{artist.policies.bookingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancellation:</span>
                  <span className="text-gray-800 font-semibold">{artist.policies.cancellationPolicy}</span>
                </div>
                {artist.policies.setupTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup Time:</span>
                    <span className="text-gray-800 font-semibold">{artist.policies.setupTime}</span>
                  </div>
                )}
                {artist.policies.performanceTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Performance:</span>
                    <span className="text-gray-800 font-semibold">{artist.policies.performanceTime}</span>
                  </div>
                )}
                {artist.policies.applicationTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application:</span>
                    <span className="text-gray-800 font-semibold">{artist.policies.applicationTime}</span>
                  </div>
                )}
                {artist.policies.colorGuarantee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color Guarantee:</span>
                    <span className="text-gray-800 font-semibold">{artist.policies.colorGuarantee}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{artist.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{artist.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{artist.contact.address}</span>
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

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          venue={artist}
          buttonPosition={buttonPosition}
        />
      )}

      {/* Message Modal */}
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
        venue={artist}
      />

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          venueId={artist.id}
          venueType="artist"
          venueName={artist.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => showNotification(message)}
        />
      )}
    </div>
  )
}

export default ArtistDetail
