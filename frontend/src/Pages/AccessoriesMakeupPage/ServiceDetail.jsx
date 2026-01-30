import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import BookingModal from '../../components/BookingModal'
import MessageModal from '../../components/MessageModal'
import ContactForm from '../../components/ContactForm'

const ServiceDetail = () => {
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

  // Mock service data with detailed information
  const serviceDetails = {
    1: {
      id: 1,
      name: 'Diamond Bridal Jewellery Collection',
      type: 'jewellery',
      category: 'bridal',
      price: '₹1,00,000 - ₹10,00,000',
      rating: 4.9,
      images: [
        'https://i.pinimg.com/736x/b8/f9/72/b8f972d3b219305b4591d26e27a9bce3.jpg',
        'https://tse2.mm.bing.net/th/id/OIP.ypY2kkrz6hzgDLBi9xVL5gHaE8?pid=Api&P=0&h=180',
        'http://3.bp.blogspot.com/-IdfomL4SDZE/UgDS2-IJ7bI/AAAAAAAAACM/3yhgNhQI9Zs/s1600/north+indian+bridal+jewellery+kunbdan+set+(1).png',
        'https://i.pinimg.com/originals/c3/09/7a/c3097a7f3eb1390b417e2352301d0d46.jpg'
      ],
      description: 'Exquisite diamond bridal jewellery sets featuring premium quality diamonds in 18K gold settings. Each piece is carefully crafted by master jewelers with decades of experience in creating timeless bridal masterpieces.',
      features: ['Certified Diamonds', '18K Gold Settings', 'Custom Designs', 'Free Insurance', 'Lifetime Warranty'],
      detailedDescription: 'Our Diamond Bridal Collection represents the pinnacle of luxury and craftsmanship. Each piece features GIA-certified diamonds set in premium 18K gold, creating stunning combinations that enhance your bridal beauty. From traditional to contemporary designs, we offer complete sets including necklaces, earrings, maang tikkas, bangles, and rings.',
      amenities: ['Free Trial Session', 'Expert Consultation', 'Custom Design Service', 'Insurance Coverage', 'Lifetime Maintenance', 'Exchange Policy'],
      policies: {
        bookingAmount: '25% Advance',
        cancellationPolicy: '7 days before - 80% refund',
        alterationPolicy: 'Free alterations included',
        deliveryTime: '2-4 weeks for custom orders'
      },
      reviews: [
        { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning diamond set! The craftsmanship is exceptional and the customer service was outstanding.' },
        { name: 'Anjali Patel', rating: 5, comment: 'Beautiful designs and great quality. The team helped me choose the perfect set for my wedding.' },
        { name: 'Kavita Reddy', rating: 4, comment: 'Lovely collection with reasonable prices. The customization options were exactly what I wanted.' }
      ],
      contact: {
        phone: '+91 98765 43210',
        email: 'diamond@weddingjewels.com',
        address: '123 Jewelry Lane, Delhi - 110001'
      }
    },
    2: {
      id: 2,
      name: 'Gold Bridal Jewellery Collection',
      type: 'jewellery',
      category: 'bridal',
      price: '₹50,000 - ₹5,00,000',
      rating: 4.8,
      images: [
        'https://tse3.mm.bing.net/th/id/OIP.X5WQbbH6QTLNXUNweVz3UwHaJW?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.QcPntkgjuknrnh0tIF6f6gHaHa?pid=Api&P=0&h=180',
        'https://img.freepik.com/premium-photo/traditional-golden-indian-wedding-jewelry-wallpaper-bride-beauty-generative-ai_753390-3395.jpg',
        'https://tse1.mm.bing.net/th/id/OIP.YIgsKEQ3XMQrewv_D0UE6AHaHa?pid=Api&P=0&w=300&h=300'
      ],
      description: 'Traditional gold bridal jewellery with intricate craftsmanship. Features 22K gold pieces with kundan, polki, and meenakari work for timeless bridal beauty.',
      features: ['22K Pure Gold', 'Kundan & Polki Work', 'Traditional Designs', 'BIS Hallmarked', 'Exchange Policy'],
      detailedDescription: 'Our Gold Bridal Collection celebrates India\'s rich heritage of traditional jewelry making. Each piece is crafted with 22K pure gold and adorned with precious kundan, polki, and meenakari work. Our master artisans create timeless designs that have been passed down through generations.',
      amenities: ['Traditional Craftsmanship', 'BIS Hallmarked Gold', 'Custom Designs', 'Exchange Facility', 'Expert Guidance', 'Insurance Options'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '10 days before - 70% refund',
        alterationPolicy: 'Free sizing adjustments',
        deliveryTime: '3-5 weeks for custom orders'
      },
      reviews: [
        { name: 'Meera Gupta', rating: 5, comment: 'Traditional designs with modern appeal. The kundan work is absolutely beautiful!' },
        { name: 'Sneha Joshi', rating: 4, comment: 'Good quality gold jewelry with authentic designs. Staff was very helpful.' },
        { name: 'Divya Nair', rating: 5, comment: 'Perfect traditional look for my wedding. The exchange policy is very flexible.' }
      ],
      contact: {
        phone: '+91 98765 43211',
        email: 'gold@weddingjewels.com',
        address: '456 Heritage Street, Mumbai - 400001'
      }
    },
    3: {
      id: 3,
      name: 'Silver Fashion Jewellery',
      type: 'jewellery',
      category: 'fashion',
      price: '₹5,000 - ₹50,000',
      rating: 4.6,
      images: [
        'https://shop.southindiajewels.com/wp-content/uploads/2023/05/Gold-Plated-Temple-Bridal-Jewellery-Set-01.jpg',
        'https://i.pinimg.com/originals/d1/3e/cf/d13ecfba9a727a3685a8e51e481fed73.jpg',
        'https://i.pinimg.com/736x/b8/f9/72/b8f972d3b219305b4591d26e27a9bce3.jpg',
        'https://tse2.mm.bing.net/th/id/OIP.ypY2kkrz6hzgDLBi9xVL5gHaE8?pid=Api&P=0&h=180'
      ],
      description: 'Elegant silver jewellery perfect for pre-wedding functions. Includes oxidized silver, sterling silver, and silver-plated pieces with contemporary designs.',
      features: ['925 Sterling Silver', 'Oxidized Finish', 'Contemporary Designs', 'Hypoallergenic', 'Affordable Luxury'],
      detailedDescription: 'Our Silver Fashion Collection offers contemporary designs perfect for modern brides who want elegance without the heavy price tag. Crafted from 925 sterling silver with oxidized finishes, these pieces are perfect for mehendi, sangeet, and other pre-wedding functions.',
      amenities: ['Lightweight Designs', 'Hypoallergenic Materials', 'Modern Styles', 'Affordable Pricing', 'Quick Delivery', 'Gift Wrapping'],
      policies: {
        bookingAmount: '20% Advance',
        cancellationPolicy: '5 days before - 90% refund',
        alterationPolicy: 'Free adjustments available',
        deliveryTime: '1-2 weeks for all orders'
      },
      reviews: [
        { name: 'Riya Singh', rating: 4, comment: 'Beautiful designs and very affordable. Perfect for my mehendi function.' },
        { name: 'Aarti Kumar', rating: 5, comment: 'Lightweight and elegant. The quality is excellent for the price.' },
        { name: 'Neha Verma', rating: 4, comment: 'Great collection of modern designs. Quick delivery and good customer service.' }
      ],
      contact: {
        phone: '+91 98765 43212',
        email: 'silver@weddingjewels.com',
        address: '789 Fashion Avenue, Bangalore - 560001'
      }
    },
    4: {
      id: 4,
      name: 'South Indian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹25,000 - ₹75,000',
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1596944924647-513ab86f7b61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1608344757155-ee2086585c61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515372039744-b8e02a3ae846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      description: 'Traditional South Indian bridal makeup featuring bold eyes, defined brows, and classic red lips. Includes saree draping assistance and hair styling.',
      features: ['HD Makeup', 'Waterproof', 'Traditional Look', 'Saree Draping', 'Hair Styling', 'Trial Session'],
      detailedDescription: 'Our South Indian Bridal Makeup service celebrates the rich heritage of South Indian bridal beauty. Our expert makeup artists specialize in creating traditional looks with bold eyes, perfectly defined brows, and classic red lips that complement traditional silk sarees and gold jewelry.',
      amenities: ['Professional Makeup Artists', 'Premium Products', 'Traditional Styling', 'Saree Draping', 'Hair Styling', 'Trial Session'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        trialPolicy: 'Complimentary trial session',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Lakshmi Iyer', rating: 5, comment: 'Perfect traditional South Indian look! The makeup lasted throughout the ceremony.' },
        { name: 'Radhika Nair', rating: 5, comment: 'Expert makeup artist who understands South Indian bridal looks perfectly.' },
        { name: 'Ananya Pillai', rating: 4, comment: 'Beautiful makeup and excellent saree draping service.' }
      ],
      contact: {
        phone: '+91 98765 43213',
        email: 'southindian@bridalmakeup.com',
        address: '321 Temple Road, Chennai - 600001'
      }
    },
    4: {
      id: 4,
      name: 'Fashion Jewellery Set',
      type: 'jewellery',
      category: 'fashion',
      price: '₹8,000 - ₹35,000',
      rating: 4.5,
      images: [
        'http://3.bp.blogspot.com/-IdfomL4SDZE/UgDS2-IJ7bI/AAAAAAAAACM/3yhgNhQI9Zs/s1600/north+indian+bridal+jewellery+kunbdan+set+(1).png',
        'https://i.pinimg.com/originals/c3/09/7a/c3097a7f3eb1390b417e2352301d0d46.jpg',
        'https://tse3.mm.bing.net/th/id/OIP.X5WQbbH6QTLNXUNweVz3UwHaJW?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.QcPntkgjuknrnh0tIF6f6gHaHa?pid=Api&P=0&h=180'
      ],
      description: 'Trendy fashion jewellery sets for mehendi and sangeet functions. Includes American diamond pieces with modern designs and vibrant colors.',
      features: ['American Diamond', 'Lightweight Designs', 'Colorful Stones', 'Affordable Sets', 'Modern Styles'],
      detailedDescription: 'Our Fashion Jewellery Collection offers trendy, contemporary pieces perfect for modern brides who want style without the heavy price tag. Each set features American diamonds and vibrant stones that complement pre-wedding functions.',
      amenities: ['Lightweight Comfort', 'Modern Designs', 'Colorful Options', 'Affordable Pricing', 'Quick Delivery', 'Gift Packaging'],
      policies: {
        bookingAmount: '25% Advance',
        cancellationPolicy: '3 days before - 80% refund',
        exchangePolicy: '7-day exchange available',
        deliveryTime: '1 week for all orders'
      },
      reviews: [
        { name: 'Neha Patel', rating: 4, comment: 'Beautiful designs and very affordable. Perfect for my sangeet function.' },
        { name: 'Anita Singh', rating: 5, comment: 'Lightweight and elegant. The American diamond work is stunning!' },
        { name: 'Rashmi Gupta', rating: 4, comment: 'Great collection of modern designs. Quick delivery and good service.' }
      ],
      contact: {
        phone: '+91 98765 43223',
        email: 'fashion@weddingjewels.com',
        address: '987 Trendy Lane, Delhi - 110001'
      }
    },
    5: {
      id: 5,
      name: 'South Indian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹25,000 - ₹75,000',
      rating: 4.9,
      images: [
        'https://i.pinimg.com/originals/49/ad/38/49ad38a3ec50860b2ea8b3dac6104882.jpg ',
        'https://i.pinimg.com/originals/56/d7/51/56d7517111a2b7027bd86f188c7ac6ab.jpg ',
             'https://i.pinimg.com/originals/14/03/c9/1403c9c979129e8661ad6f395216a4c2.jpg ',
             'https://i.pinimg.com/736x/2a/38/dd/2a38dd7dd5827a2e8b7951c69d9ed87c.jpg'
               
      ],
      description: 'Traditional South Indian bridal makeup featuring bold eyes, defined brows, and classic red lips. Includes saree draping assistance and hair styling.',
      features: ['HD Makeup', 'Waterproof', 'Traditional Look', 'Saree Draping', 'Hair Styling', 'Trial Session'],
      detailedDescription: 'Our South Indian Bridal Makeup service celebrates the rich heritage of South Indian bridal beauty. Our expert makeup artists specialize in creating traditional looks with bold eyes, perfectly defined brows, and classic red lips that complement traditional silk sarees and gold jewelry.',
      amenities: ['Professional Makeup Artists', 'Premium Products', 'Traditional Styling', 'Saree Draping', 'Hair Styling', 'Trial Session'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        trialPolicy: 'Complimentary trial session',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Lakshmi Iyer', rating: 5, comment: 'Perfect traditional South Indian look! The makeup lasted throughout the ceremony.' },
        { name: 'Radhika Nair', rating: 5, comment: 'Expert makeup artist who understands South Indian bridal looks perfectly.' },
        { name: 'Ananya Pillai', rating: 4, comment: 'Beautiful makeup and excellent saree draping service.' }
      ],
      contact: {
        phone: '+91 98765 43213',
        email: 'southindian@bridalmakeup.com',
        address: '321 Temple Road, Chennai - 600001'
      }
    },
    6: {
      id: 6,
      name: 'North Indian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹30,000 - ₹1,00,000',
      rating: 4.8,
      images: [
        'https://preview.redd.it/royal-reception-makeup-look-for-the-bride-graceful-gorgeous-v0-d34t666vtr1b1.jpg?width=1080&crop=smart&auto=webp&s=727e2367f190b2ae10c0ee1559b11f6a8b4c55a6'
        
      ],
      description: 'Modern North Indian bridal makeup with smoky eyes, contoured cheeks, and nude lips. Includes dupatta setting and jewelry assistance.',
      features: ['Airbrush Makeup', 'Contouring', 'Smoky Eyes', 'Dupatta Setting', 'Jewelry Assistance', 'Touch-up Kit'],
      detailedDescription: 'Our North Indian Bridal Makeup service combines traditional elegance with modern techniques. We specialize in creating stunning looks with smoky eyes, perfect contouring, and nude lips that enhance your natural beauty while complementing your bridal attire.',
      amenities: ['Airbrush Technology', 'HD Makeup', 'Contouring Expertise', 'Dupatta Setting', 'Jewelry Coordination', 'Touch-up Kit'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        trialPolicy: 'Complimentary trial session',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Simran Kaur', rating: 5, comment: 'Amazing makeup artist! Created the perfect North Indian bridal look for me.' },
        { name: 'Pooja Sharma', rating: 4, comment: 'Professional service with attention to detail. Loved the dupatta setting assistance.' },
        { name: 'Anjali Gupta', rating: 5, comment: 'Beautiful makeup that lasted all day. The airbrush technique is amazing!' }
      ],
      contact: {
        phone: '+91 98765 43214',
        email: 'northindian@bridalmakeup.com',
        address: '654 Wedding Plaza, Delhi - 110001'
      }
    },
    7: {
      id: 7,
      name: 'Muslim Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹20,000 - ₹60,000',
      rating: 4.7,
      images: [
        'https://stylesatlife.com/wp-content/uploads/2019/06/North-Muslim-Bridal-Makeup.jpg'
      ],
      description: 'Elegant Muslim bridal makeup focusing on natural beauty with defined eyes, soft contouring, and subtle lips. Includes hijab styling assistance.',
      features: ['Natural Look', 'Hijab Styling', 'Long-lasting', 'Premium Products', 'Photography Ready', 'Home Service'],
      detailedDescription: 'Our Muslim Bridal Makeup service focuses on enhancing natural beauty while respecting cultural traditions. We specialize in elegant, modest makeup looks with defined eyes, soft contouring, and subtle lips that complement hijab styling and traditional attire.',
      amenities: ['Natural Enhancement', 'Hijab Styling', 'Premium Products', 'Photography Ready', 'Home Service', 'Trial Session'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '5 days before - 70% refund',
        trialPolicy: 'Complimentary trial session',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Fatima Ali', rating: 5, comment: 'Perfect makeup that respects our traditions while being modern and beautiful.' },
        { name: 'Ayesha Khan', rating: 4, comment: 'Excellent hijab styling and natural makeup. Very professional service.' },
        { name: 'Mariam Sheikh', rating: 5, comment: 'Beautiful makeup that lasted all day. The artist understood exactly what I wanted.' }
      ],
      contact: {
        phone: '+91 98765 43215',
        email: 'muslim@bridalmakeup.com',
        address: '786 Heritage Lane, Hyderabad - 500001'
      }
    },
    8: {
      id: 8,
      name: 'Christian Bridal Makeup',
      type: 'makeup',
      category: 'bridal',
      price: '₹35,000 - ₹80,000',
      rating: 4.8,
      images: [
        'https://i.pinimg.com/originals/c9/8f/21/c98f21fcbcc503258829e2f8ba766364.jpg'
      ],
      description: 'Sophisticated Christian bridal makeup with soft romantic looks, rosy cheeks, and natural lips. Includes veil placement and bouquet coordination.',
      features: ['Romantic Look', 'Veil Placement', 'Bouquet Coordination', 'Premium Brands', 'Multiple Looks', 'Video Ready'],
      detailedDescription: 'Our Christian Bridal Makeup service creates sophisticated, romantic looks perfect for church ceremonies and receptions. We specialize in soft, natural makeup with rosy cheeks and subtle lips that complement white gowns and veils.',
      amenities: ['Romantic Styling', 'Veil Placement', 'Bouquet Coordination', 'Premium Brands', 'Video Ready', 'Touch-up Kit'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '7 days before - 60% refund',
        trialPolicy: 'Complimentary trial session',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Sarah Thomas', rating: 5, comment: 'Perfect romantic makeup for my church wedding! The veil placement was beautiful.' },
        { name: 'Jennifer Dsouza', rating: 4, comment: 'Professional service with attention to detail. Loved the bouquet coordination.' },
        { name: 'Maria Fernandes', rating: 5, comment: 'Beautiful makeup that looked amazing in photos and videos.' }
      ],
      contact: {
        phone: '+91 98765 43216',
        email: 'christian@bridalmakeup.com',
        address: '456 Church Street, Goa - 403001'
      }
    },
    9: {
      id: 9,
      name: 'Sangeet Party Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹8,000 - ₹25,000',
      rating: 4.5,
      images: [
       'https://tse4.mm.bing.net/th/id/OIP.5VfqSfRTBnP1tBMsCR4Y3gHaEK?pid=Api&P=0&h=180'
       
      ],
      description: 'Vibrant makeup for sangeet night with glitter, bold colors, and dance-proof formula. Includes quick touch-up service for multiple outfit changes.',
      features: ['Glitter Makeup', 'Dance-Proof', 'Bold Colors', 'Quick Touch-ups', 'Multiple Looks', 'Waterproof'],
      detailedDescription: 'Our Sangeet Party Makeup service creates vibrant, party-ready looks with glitter and bold colors that last through dancing and celebration. Perfect for the energetic sangeet night with multiple outfit changes.',
      amenities: ['Glitter Application', 'Dance-Proof Formula', 'Bold Color Palette', 'Quick Touch-ups', 'Multiple Outfit Changes', 'Waterproof Finish'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '3 days before - 70% refund',
        trialPolicy: 'Trial session available',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Pooja Mehta', rating: 5, comment: 'Perfect sangeet makeup! The glitter was beautiful and it lasted all night.' },
        { name: 'Anjali Singh', rating: 4, comment: 'Great bold colors and the dance-proof formula really works!' },
        { name: 'Kavita Patel', rating: 5, comment: 'Excellent service with quick touch-ups for outfit changes.' }
      ],
      contact: {
        phone: '+91 98765 43224',
        email: 'sangeet@partymakeup.com',
        address: '555 Party Plaza, Mumbai - 400001'
      }
    },
    10: {
      id: 10,
      name: 'Mehendi Function Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹5,000 - ₹15,000',
      rating: 4.4,
      images: [
       'https://media.weddingz.in/images/d4d1c5c3e15d298ad37c0ab79cfc0bb4/Henna-for-all-5.jpg'
        
      ],
      description: 'Natural, subtle makeup perfect for mehendi ceremonies. Focus on enhancing natural beauty with light, fresh looks.',
      features: ['Natural Look', 'Light Coverage', 'Mehendi-Friendly', 'Long-lasting', 'Subtle Colors', 'Quick Service'],
      detailedDescription: 'Our Mehendi Function Makeup service creates natural, subtle looks that complement the traditional mehendi ceremony. We focus on enhancing your natural beauty with light coverage that won\'t smudge during the mehendi application.',
      amenities: ['Natural Enhancement', 'Light Coverage', 'Mehendi-Friendly Products', 'Long-lasting Formula', 'Subtle Color Palette', 'Quick Service'],
      policies: {
        bookingAmount: '25% Advance',
        cancellationPolicy: '2 days before - 80% refund',
        trialPolicy: 'Trial session available',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Fatima Khan', rating: 4, comment: 'Perfect natural look for my mehendi ceremony. Very subtle and beautiful.' },
        { name: 'Ayesha Sheikh', rating: 5, comment: 'Light and fresh makeup that didn\'t interfere with mehendi application.' },
        { name: 'Mariam Ali', rating: 4, comment: 'Great natural look with excellent service.' }
      ],
      contact: {
        phone: '+91 98765 43225',
        email: 'mehendi@partymakeup.com',
        address: '777 Traditional Lane, Hyderabad - 500001'
      }
    },
    11: {
      id: 11,
      name: 'Reception Party Makeup',
      type: 'makeup',
      category: 'party',
      price: '₹12,000 - ₹35,000',
      rating: 4.6,
      images: [
        'https://i.pinimg.com/736x/02/44/95/02449589da45a0e98ea0c78e1033814b.jpg'
      ],
      description: 'Glamorous reception makeup with evening-appropriate colors and styles. Includes photography-ready finish and touch-up kit.',
      features: ['Evening Glamour', 'Photography Ready', 'Touch-up Kit', 'Long-lasting', 'Elegant Styles', 'Premium Products'],
      detailedDescription: 'Our Reception Party Makeup service creates glamorous, evening-appropriate looks perfect for the wedding reception. We focus on photography-ready finishes with elegant styles that last throughout the celebration.',
      amenities: ['Evening Glamour', 'Photography Ready', 'Touch-up Kit', 'Long-lasting Formula', 'Elegant Styles', 'Premium Products'],
      policies: {
        bookingAmount: '35% Advance',
        cancellationPolicy: '5 days before - 70% refund',
        trialPolicy: 'Trial session available',
        onTimeService: 'Punctual service guaranteed'
      },
      reviews: [
        { name: 'Sarah Johnson', rating: 5, comment: 'Perfect reception makeup! Looked amazing in photos and lasted all night.' },
        { name: 'Emily Williams', rating: 4, comment: 'Glamorous evening look with excellent photography-ready finish.' },
        { name: 'Jessica Brown', rating: 5, comment: 'Professional service with beautiful results. The touch-up kit was very helpful.' }
      ],
      contact: {
        phone: '+91 98765 43226',
        email: 'reception@partymakeup.com',
        address: '888 Reception Hall, Bangalore - 560001'
      }
    },
    12: {
      id: 12,
      name: 'Bridal Lehenga Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹50,000 - ₹5,00,000',
      rating: 4.9,
      images: [
        'https://getethnic.com/wp-content/uploads/2021/08/Maroon-Bridal-Lehenga-6.jpg'
      ],
      description: 'Designer bridal lehengas featuring premium fabrics, intricate embroidery, and modern silhouettes. Includes custom fitting and designer consultation.',
      features: ['Designer Labels', 'Custom Fitting', 'Premium Fabrics', 'Intricate Embroidery', 'Matching Accessories', 'Alterations Included'],
      detailedDescription: 'Our Bridal Lehenga Collection showcases the finest in Indian bridal fashion. Each piece is crafted with premium fabrics, intricate embroidery, and modern silhouettes that blend traditional elegance with contemporary style.',
      amenities: ['Designer Consultation', 'Custom Fitting', 'Premium Fabrics', 'Intricate Embroidery', 'Matching Accessories', 'Alterations Included'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        alterationPolicy: 'Free alterations included',
        deliveryTime: '4-6 weeks for custom orders'
      },
      reviews: [
        { name: 'Priya Sharma', rating: 5, comment: 'Absolutely stunning lehenga! The embroidery work is exquisite and the fit is perfect.' },
        { name: 'Anjali Patel', rating: 5, comment: 'Designer quality at reasonable prices. The consultation was very helpful.' },
        { name: 'Kavita Reddy', rating: 4, comment: 'Beautiful collection with modern designs. The custom fitting service was excellent.' }
      ],
      contact: {
        phone: '+91 98765 43217',
        email: 'lehenga@bridalcostumes.com',
        address: '123 Fashion Street, Delhi - 110001'
      }
    },
    13: {
      id: 13,
      name: 'Bridal Saree Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹25,000 - ₹3,00,000',
      rating: 4.7,
      images: [
        'https://i.pinimg.com/originals/e7/92/bb/e792bb3dbff1f1fe08cbf750558d0a5a.png'
      ],
      description: 'Traditional and modern bridal sarees including Kanjivaram, Banarasi, and designer sarees. Comes with blouse stitching and draping service.',
      features: ['Traditional Weaves', 'Blouse Stitching', 'Draping Service', 'Authentic Silk', 'Contemporary Designs', 'Preservation Tips'],
      detailedDescription: 'Our Bridal Saree Collection celebrates India\'s rich textile heritage with authentic Kanjivaram, Banarasi, and contemporary designer sarees. Each piece comes with expert blouse stitching and professional draping service.',
      amenities: ['Traditional Weaves', 'Blouse Stitching', 'Draping Service', 'Authentic Silk', 'Contemporary Designs', 'Preservation Tips'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '10 days before - 80% refund',
        alterationPolicy: 'Free blouse stitching included',
        deliveryTime: '2-4 weeks for custom orders'
      },
      reviews: [
        { name: 'Meera Gupta', rating: 5, comment: 'Beautiful Kanjivaram saree with perfect blouse stitching. The draping service was excellent.' },
        { name: 'Sneha Joshi', rating: 4, comment: 'Good collection of traditional and modern sarees. Staff was very knowledgeable.' },
        { name: 'Divya Nair', rating: 5, comment: 'Perfect traditional look for my wedding. The preservation tips were very helpful.' }
      ],
      contact: {
        phone: '+91 98765 43218',
        email: 'saree@bridalcostumes.com',
        address: '456 Silk Road, Mumbai - 400001'
      }
    },
    14: {
      id: 14,
      name: 'Bridal Gown Collection',
      type: 'costumes',
      category: 'bride',
      price: '₹30,000 - ₹4,00,000',
      rating: 4.8,
      images: [
        'https://i.pinimg.com/originals/22/70/8a/22708a48beaf07622db9006fe0ffac97.jpg'
      ],
      description: 'Elegant bridal gowns for modern brides. Features international designer collections with custom fitting and luxury fabrics.',
      features: ['Designer Gowns', 'Custom Fitting', 'Luxury Fabrics', 'International Brands', 'Modern Styles', 'Alterations Included'],
      detailedDescription: 'Our Bridal Gown Collection features stunning international designer pieces perfect for modern brides. Each gown is crafted with luxury fabrics and offers custom fitting to ensure the perfect fit for your special day.',
      amenities: ['Designer Consultation', 'Custom Fitting', 'Luxury Fabrics', 'International Brands', 'Modern Styles', 'Alterations Included'],
      policies: {
        bookingAmount: '50% Advance',
        cancellationPolicy: '21 days before - 60% refund',
        alterationPolicy: 'Free alterations included',
        deliveryTime: '6-8 weeks for international orders'
      },
      reviews: [
        { name: 'Sarah Johnson', rating: 5, comment: 'Absolutely gorgeous gown! The custom fitting was perfect and the quality is exceptional.' },
        { name: 'Emily Williams', rating: 4, comment: 'Beautiful international designer collection. The consultation was very professional.' },
        { name: 'Jessica Brown', rating: 5, comment: 'Perfect modern bride look. The gown was exactly what I dreamed of.' }
      ],
      contact: {
        phone: '+91 98765 43219',
        email: 'gowns@bridalcostumes.com',
        address: '789 Designer Avenue, Bangalore - 560001'
      }
    },
    15: {
      id: 15,
      name: 'Groom Sherwani Collection',
      type: 'costumes',
      category: 'groom',
      price: '₹20,000 - ₹2,00,000',
      rating: 4.8,
      images: [
        'https://i.pinimg.com/736x/e1/2c/10/e12c10751c04bc578129763666f87caa.jpg'
      ],
      description: 'Elegant groom sherwanis with premium fabrics, detailed embroidery, and modern cuts. Includes matching accessories and custom tailoring.',
      features: ['Designer Sherwanis', 'Custom Tailoring', 'Matching Accessories', 'Premium Fabrics', 'Modern Cuts', 'Express Delivery'],
      detailedDescription: 'Our Groom Sherwani Collection offers elegant traditional and modern designs crafted with premium fabrics and intricate embroidery. Each piece includes matching accessories and custom tailoring for the perfect fit.',
      amenities: ['Designer Consultation', 'Custom Tailoring', 'Matching Accessories', 'Premium Fabrics', 'Modern Cuts', 'Express Delivery'],
      policies: {
        bookingAmount: '40% Advance',
        cancellationPolicy: '14 days before - 70% refund',
        alterationPolicy: 'Free alterations included',
        deliveryTime: '3-4 weeks for custom orders'
      },
      reviews: [
        { name: 'Rahul Singh', rating: 5, comment: 'Excellent sherwani with perfect fit. The embroidery work is outstanding.' },
        { name: 'Amit Kumar', rating: 4, comment: 'Good collection of traditional and modern designs. Custom tailoring was excellent.' },
        { name: 'Vikram Sharma', rating: 5, comment: 'Perfect groom look for my wedding. The matching accessories were a great touch.' }
      ],
      contact: {
        phone: '+91 98765 43220',
        email: 'sherwani@groomcostumes.com',
        address: '321 Groom Street, Delhi - 110001'
      }
    },
    16: {
      id: 16,
      name: 'Groom Suit Collection',
      type: 'costumes',
      category: 'groom',
      price: '₹15,000 - ₹1,00,000',
      rating: 4.6,
      images: [
       'https://media.gqindia.com/wp-content/uploads/amp-stories/9-stylish-wedding-suits-men/assets/5.jpeg'
      ],
      description: 'Premium groom suits from international brands with custom fitting. Includes tuxedos, three-piece suits, and modern formal wear.',
      features: ['International Brands', 'Custom Fitting', 'Multiple Styles', 'Premium Fabrics', 'Accessories Included', 'Dry Cleaning Service'],
      detailedDescription: 'Our Groom Suit Collection features premium international brands with custom fitting options. From classic tuxedos to modern three-piece suits, we offer sophisticated formal wear for the modern groom.',
      amenities: ['Brand Consultation', 'Custom Fitting', 'Multiple Styles', 'Premium Fabrics', 'Accessories Included', 'Dry Cleaning Service'],
      policies: {
        bookingAmount: '30% Advance',
        cancellationPolicy: '10 days before - 80% refund',
        alterationPolicy: 'Free alterations included',
        deliveryTime: '2-3 weeks for all orders'
      },
      reviews: [
        { name: 'David Wilson', rating: 4, comment: 'Excellent suit with perfect fit. International brand quality at good prices.' },
        { name: 'Michael Brown', rating: 5, comment: 'Professional service with great attention to detail. The accessories were perfect.' },
        { name: 'James Taylor', rating: 4, comment: 'Good collection of modern suits. Custom fitting was excellent.' }
      ],
      contact: {
        phone: '+91 98765 43221',
        email: 'suits@groomcostumes.com',
        address: '654 Formal Wear Plaza, Mumbai - 400001'
      }
    },
    17: {
      id: 17,
      name: 'Groom Traditional Wear',
      type: 'costumes',
      category: 'groom',
      price: '₹10,000 - ₹80,000',
      rating: 4.5,
      images: [
        'https://i.pinimg.com/originals/90/35/2a/90352af340b51ea12a109caaefbd3f20.jpg'
      ],
      description: 'Traditional groom wear including dhotis, kurta sets, and regional attire. Perfect for traditional wedding ceremonies.',
      features: ['Traditional Attire', 'Regional Styles', 'Comfortable Fabrics', 'Custom Stitching', 'Cultural Designs', 'Affordable Options'],
      detailedDescription: 'Our Groom Traditional Wear collection celebrates India\'s diverse cultural heritage with authentic regional attire. From traditional dhotis to elegant kurta sets, each piece reflects the rich traditions of Indian weddings.',
      amenities: ['Regional Styles', 'Comfortable Fabrics', 'Custom Stitching', 'Cultural Designs', 'Affordable Options', 'Quick Delivery'],
      policies: {
        bookingAmount: '25% Advance',
        cancellationPolicy: '7 days before - 75% refund',
        alterationPolicy: 'Free stitching adjustments',
        deliveryTime: '1-2 weeks for all orders'
      },
      reviews: [
        { name: 'Rajesh Kumar', rating: 4, comment: 'Perfect traditional attire for my wedding. The regional designs were authentic.' },
        { name: 'Sanjay Singh', rating: 5, comment: 'Excellent quality and comfortable fabrics. Custom stitching was perfect.' },
        { name: 'Amit Patel', rating: 4, comment: 'Great collection of traditional wear at reasonable prices.' }
      ],
      contact: {
        phone: '+91 98765 43222',
        email: 'traditional@groomcostumes.com',
        address: '999 Cultural Street, Jaipur - 302001'
      }
    }
  }

  // Load service from mock data or vendor services
  const getService = () => {
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
            const service = services.find(s => s.id.toString() === serviceId && s.category === 'accessories-makeup')
            if (service) {
              // Transform vendor service to accessories format
              return {
                id: id,
                name: service.name,
                type: 'vendor',
                category: 'accessories-makeup',
                price: service.price,
                rating: 4.5,
                images: service.images && service.images.length > 0 
                  ? service.images.map(img => img.preview)
                  : [
                      'https://images.unsplash.com/photo-1519223105527-8a72762a52b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                      'https://picsum.photos/seed/accessories1/800/600.jpg',
                      'https://picsum.photos/seed/accessories2/800/600.jpg'
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
                  alterationPolicy: 'Custom alterations available',
                  deliveryTime: 'Available on request'
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
    
    // Return mock service if not found in vendor services
    return serviceDetails[id]
  }

  const service = getService()

  const handleBookNow = (event) => {
    if (!isAuthenticated) {
      alert('Please login to book this service')
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
        const response = await fetch(`http://localhost:3000/api/favourite/remove?venueId=${service.id}`, {
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
          venueId: service.id,
          venueType: 'accessories-makeup',
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
        venueId: service.id,
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

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service not found</h2>
          <Link to="/accessories-makeup" className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-pink-500 hover:to-pink-600">
            Back to Services
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
            onClick={() => navigate('/accessories-makeup')}
            className="mb-6 flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            ← Back to Services
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={service.images[selectedImage]} 
                  alt={service.name}
                  className="w-full h-full object-cover"
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
                    <img 
                      src={image} 
                      alt={`${service.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                    {service.isVendorService ? 'Vendor Service' : (service.type.charAt(0).toUpperCase() + service.type.slice(1))}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-gray-700 ml-1 font-semibold">{service.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
                <p className="text-2xl text-pink-600 font-bold mb-4">{service.price}</p>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features & Services</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(service.features || []).map((feature, index) => (
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {service.name}</h2>
              <p className="text-gray-600 leading-relaxed">{service.detailedDescription}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Included</h2>
              <div className="grid grid-cols-2 gap-4">
                {(service.amenities || []).map((amenity, index) => (
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

          {/* Policies */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Policies</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Amount:</span>
                <span className="text-gray-800 font-semibold">{service.policies?.bookingAmount || '25% Advance'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cancellation:</span>
                <span className="text-gray-800 font-semibold">{service.policies?.cancellationPolicy || '7 days before - 80% refund'}</span>
              </div>
              {service.policies?.trialPolicy && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Trial Policy:</span>
                  <span className="text-gray-800 font-semibold">{service.policies.trialPolicy}</span>
                </div>
              )}
              {service.policies?.alterationPolicy && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Alteration Policy:</span>
                  <span className="text-gray-800 font-semibold">{service.policies.alterationPolicy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📞 Contact Information</h3>
              {service.isVendorService && service.vendorName && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-semibold text-green-800">🏢 Listed by: {service.vendorName}</div>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📞</span>
                  <span className="text-gray-700">{service.contactPhone || service.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">✉️</span>
                  <span className="text-gray-700">{service.contactEmail || service.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">📍</span>
                  <span className="text-gray-700">{service.isVendorService ? service.contact.address : service.contact.address}</span>
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

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          venueId={service.id}
          venueType="accessories-makeup"
          venueName={service.name}
          contactType={contactType}
          onClose={() => setShowContactForm(false)}
          onSuccess={(message) => showNotification(message)}
        />
      )}
    </div>
  )
}

export default ServiceDetail;
