import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const blogDetails = {
    1: {
      id: 1,
      title: 'Royal Indian Wedding in Jaipur - A Dream Come True',
      category: 'wedding',
      author: 'Priya & Rahul',
      date: '2024-01-15',
      location: 'Jaipur, Rajasthan',
      images: [
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our royal Indian wedding in Jaipur was made magical with WedEase decorators and caterers. The traditional setup exceeded our dreams.',
      content: `Our royal Indian wedding in Jaipur was a fairytale come true. WedEase helped us book the most amazing traditional decorators who transformed the venue into a palace.

The wedding venue was decorated with authentic Rajasthani themes, featuring traditional mandap with royal colors, intricate floral arrangements, and traditional lighting that created a magical atmosphere. The decorators understood every aspect of Indian wedding traditions and incorporated them beautifully.

The catering was exceptional - Royal Indian Caterers served authentic Rajasthani cuisine that our guests still talk about. From dal baati churma to gatte ki sabzi, every dish was prepared with traditional recipes and presented with royal elegance.

The mehendi ceremony was handled by expert artists who created intricate designs that told our love story. The sangeet night featured traditional dancers and musicians who kept everyone entertained.

WedEase made everything seamless - from coordinating with multiple vendors to ensuring every detail was perfect. Our guests flew in from around the world and were blown away by the seamless organization and authentic Indian experience.`,
      services: ['Royal Wedding Decorators', 'Royal Indian Caterers', 'Traditional Mehendi Artist', 'Dance Choreographer'],
      rating: 5,
      tags: ['Royal Wedding', 'Indian Wedding', 'Jaipur', 'Traditional', 'Rajasthani Cuisine'],
      authorBio: 'Priya & Rahul, a software engineer and architect couple from Bangalore, chose Jaipur for their royal Indian wedding experience.'
    },
    2: {
      id: 2,
      title: 'Beach Destination Wedding in Goa - Paradise Found',
      category: 'destination',
      author: 'Sarah & Mike',
      date: '2024-02-20',
      location: 'Goa',
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our beach destination wedding in Goa was absolutely perfect. The destination decorators and caterers created an unforgettable experience.',
      content: `Getting married on the beaches of Goa was always our dream. WedEase connected us with amazing destination wedding planners who handled everything from the beach setup to the reception.

The ceremony took place at sunset on a pristine Goan beach, with a beautiful bamboo arch decorated with tropical flowers and seashells. The destination decorators created a magical pathway lined with tiki torches and fairy lights that led to our altar.

The reception was held at a beachside resort where Mediterranean caterers served fresh seafood, grilled specialties, and exotic tropical fruits. The mezze bar and olive bar were huge hits with our guests.

Our guests flew in from around the world and were blown away by the seamless organization. WedEase handled all travel arrangements, accommodation bookings, and local transportation. The DJ played a perfect mix of international music that kept everyone dancing on the sand.

The wedding was a perfect blend of natural beauty and elegant celebration. From the sound of waves during our vows to the beach party that lasted till dawn, every moment was magical.`,
      services: ['Destination Wedding Planners', 'Mediterranean Paradise', 'DJ Artist'],
      rating: 5,
      tags: ['Beach Wedding', 'Destination Wedding', 'Goa', 'Mediterranean', 'Tropical'],
      authorBio: 'Sarah & Mike, a travel writer and photographer couple from London, chose Goa for their dream beach destination wedding.'
    },
    3: {
      id: 3,
      title: 'Modern Mumbai Wedding - Contemporary Elegance',
      category: 'modern',
      author: 'Neha & Arjun',
      date: '2024-03-10',
      location: 'Mumbai, Maharashtra',
      images: [
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our contemporary Mumbai wedding was sleek and stylish. Modern decorators and continental caterers created the perfect urban celebration.',
      content: `We wanted a modern, sophisticated wedding in Mumbai and WedEase delivered exactly that. Our wedding was a celebration of contemporary elegance with sleek designs and international flavors.

The venue was transformed by modern decorators who created stunning minimalist designs with LED lighting, clean aesthetics, and contemporary themes. The stage design featured geometric patterns and modern art installations that were Instagram-worthy.

Continental caterers served international cuisine that impressed our diverse guest list. The live grills, salad bar, cheese counter, and wine pairing station were huge hits. Every dish was presented with fine dining elegance.

The DJ kept the dance floor packed all night with his amazing music selection. From Bollywood to international hits, he understood the crowd perfectly and created an electric atmosphere.

WedEase coordinated everything seamlessly - from venue selection to vendor management. Our urban wedding was the perfect blend of modern sophistication and warm celebration that Mumbai is known for.`,
      services: ['Modern Wedding Planners', 'Continental Delights', 'DJ Artist'],
      rating: 4,
      tags: ['Modern Wedding', 'Contemporary', 'Mumbai', 'International Cuisine', 'LED Lighting'],
      authorBio: 'Neha & Arjun, a fashion designer and investment banker couple from Mumbai, wanted a contemporary urban celebration.'
    },
    4: {
      id: 4,
      title: 'Traditional South Indian Wedding in Bangalore',
      category: 'traditional',
      author: 'Anita & Suresh',
      date: '2024-04-05',
      location: 'Bangalore, Karnataka',
      images: [
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our traditional South Indian wedding in Bangalore was beautiful and authentic. Cultural decorators and Indian caterers honored our heritage perfectly.',
      content: `Our traditional South Indian wedding in Bangalore was a beautiful celebration of our culture. WedEase helped us find cultural heritage decorators who understood every ritual and tradition.

The wedding venue was decorated with authentic South Indian themes, featuring traditional flowers, banana leaf arrangements, and cultural elements that honored our heritage. The decorators paid attention to every detail from the entrance to the dining area.

The Indian caterers served authentic South Indian cuisine that reminded everyone of home. From dosa and idli to traditional curries and sweets, every dish was prepared with traditional recipes and served with cultural significance.

The mehendi ceremony was handled by expert artists who created intricate designs that incorporated traditional South Indian patterns. The wedding rituals were performed with proper cultural understanding.

WedEase made everything seamless - from coordinating with multiple vendors to ensuring every cultural aspect was respected. Our guests appreciated the authentic experience and beautiful traditions.`,
      services: ['Cultural Heritage Decor', 'Royal Indian Caterers', 'Traditional Mehendi Artist'],
      rating: 5,
      tags: ['South Indian Wedding', 'Traditional', 'Bangalore', 'Cultural Heritage', 'Authentic Cuisine'],
      authorBio: 'Anita & Suresh, a IT professional couple from Bangalore, wanted to honor their South Indian heritage.'
    },
    5: {
      id: 5,
      title: 'Luxury Palace Wedding in Udaipur',
      category: 'luxury',
      author: 'Ishita & Aditya',
      date: '2024-05-12',
      location: 'Udaipur, Rajasthan',
      images: [
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our luxury palace wedding in Udaipur was beyond imagination. Premium decorators and luxury caterers created an unforgettable royal experience.',
      content: `Our luxury palace wedding in Udaipur was stuff of dreams. WedEase connected us with luxury wedding designers who transformed a historic palace into a magical wonderland.

The palace was decorated with premium materials, featuring crystal chandeliers, gold accents, and exotic flowers that created an atmosphere of pure royalty. Every corner was designed with meticulous attention to detail and elegance.

The luxury caterers served gourmet cuisine that matched the royal setting. From international delicacies to fusion dishes, every item was prepared by master chefs and presented with artistic flair. The wine selection and dessert bar were extraordinary.

WedEase provided VIP service throughout - from personal concierge to coordinating with palace staff. Our guests felt like true royalty from arrival to departure. The attention to detail was beyond anything we could have imagined.`,
      services: ['Luxury Wedding Designers', 'Continental Delights', 'Floral Paradise Decorators'],
      rating: 5,
      tags: ['Luxury Wedding', 'Palace Wedding', 'Udaipur', 'Royal Experience', 'VIP Service'],
      authorBio: 'Ishita & Aditya, a business entrepreneur couple from Delhi, chose Udaipur for their luxury palace wedding experience.'
    },
    6: {
      id: 6,
      title: 'Garden Wedding in Pune - Natural Beauty',
      category: 'outdoor',
      author: 'Rachel & Tom',
      date: '2024-06-18',
      location: 'Pune, Maharashtra',
      images: [
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our outdoor garden wedding in Pune was magical. The outdoor decorators and floral specialists created a natural paradise.',
      content: `Our garden wedding in Pune was surrounded by natural beauty. WedEase helped us find outdoor garden decorators who created stunning floral arches and garden themes.

The outdoor venue was transformed into a natural paradise with beautiful floral arrangements, garden lighting, and natural elements that complemented the surroundings. The decorators created perfect spaces for both ceremony and reception.

The floral paradise decorators added exotic flowers and creative arrangements that enhanced the garden setting. From centerpieces to pathway decorations, every floral element was thoughtfully designed.

Mediterranean caterers served fresh, healthy cuisine that perfectly complemented our outdoor setting. The grilled specialties and fresh ingredients were perfect for the garden atmosphere.

WedEase handled all outdoor logistics - from weather backup plans to ensuring every natural element was highlighted. Our guests loved the blend of nature and celebration.`,
      services: ['Outdoor Garden Decorators', 'Floral Paradise Decorators', 'Mediterranean Paradise'],
      rating: 4,
      tags: ['Garden Wedding', 'Outdoor Wedding', 'Pune', 'Natural Beauty', 'Floral'],
      authorBio: 'Rachel & Tom, a landscape architect and teacher couple from Pune, wanted to celebrate amidst natural beauty.'
    },
    7: {
      id: 7,
      title: 'Chinese Theme Wedding in Delhi - Fusion Celebration',
      category: 'international',
      author: 'Emma & David',
      date: '2024-07-22',
      location: 'Delhi NCR',
      images: [
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our Chinese theme wedding in Delhi was unique and exciting. Chinese caterers and modern decorators created a perfect fusion.',
      content: `We wanted something different for our Delhi wedding and chose a Chinese theme. WedEase found us amazing Chinese caterers who set up live noodle bars and dim sum stations.

The venue was decorated with a beautiful fusion of Chinese and contemporary elements. Modern decorators created red and gold color schemes with Chinese lanterns, cherry blossoms, and modern lighting that created an exotic atmosphere.

The Chinese caterers served authentic cuisine that was a huge hit with our guests. The live noodle bar, dim sum station, and tea ceremony added interactive elements that everyone enjoyed.

The DJ played a perfect mix of Chinese and international music that kept everyone entertained. From traditional Chinese melodies to modern beats, he created a unique cultural experience.

WedEase coordinated everything seamlessly - from theme development to ensuring cultural authenticity. Our guests loved the unique concept and delicious food.`,
      services: ['Chinese Dragon Catering', 'Modern Wedding Planners', 'DJ Artist'],
      rating: 4,
      tags: ['Chinese Wedding', 'Theme Wedding', 'Delhi', 'Fusion', 'Live Cooking'],
      authorBio: 'Emma & David, a chef and software developer couple from Delhi, wanted a unique cultural fusion wedding.'
    },
    8: {
      id: 8,
      title: 'Italian Romance Wedding in Chennai',
      category: 'international',
      author: 'Meera & Rahul',
      date: '2024-08-30',
      location: 'Chennai, Tamil Nadu',
      images: [
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our Italian-themed wedding in Chennai was romantic and delicious. Italian caterers and floral decorators created a Mediterranean dream.',
      content: `Our Italian-themed wedding in Chennai was pure romance. WedEase connected us with Italian caterers who set up live pasta stations and wood-fired pizza.

The venue was decorated with beautiful Mediterranean-inspired arrangements. Floral paradise decorators created stunning displays with Italian flowers, rustic elements, and romantic lighting that transported guests to Italy.

The Italian caterers served authentic cuisine that everyone loved. From fresh pasta to wood-fired pizza, every dish was prepared with traditional recipes and served with Italian hospitality.

The dance choreographer created beautiful performances that blended Italian romance with Indian traditions. The couple dance and group performances were highlights of the evening.

WedEase coordinated everything perfectly - from theme development to ensuring cultural fusion. Our guests enjoyed the romantic atmosphere and delicious Italian cuisine.`,
      services: ['Italian Bella Vista', 'Floral Paradise Decorators', 'Dance Choreographer'],
      rating: 5,
      tags: ['Italian Wedding', 'Mediterranean', 'Chennai', 'Romance', 'Live Pasta'],
      authorBio: 'Meera & Rahul, a architect and marketing couple from Chennai, wanted a romantic Italian celebration.'
    },
    9: {
      id: 9,
      title: 'Mehendi Ceremony Special - Traditional Art',
      category: 'ceremony',
      author: 'Divya & Amit',
      date: '2024-09-14',
      location: 'Jaipur, Rajasthan',
      images: [
        'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
        'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180'
      ],
      excerpt: 'Our mehendi ceremony was a beautiful traditional celebration. Luxury mehendi artists created intricate designs that told our story.',
      content: `The mehendi ceremony was one of the most special parts of our wedding. WedEase helped us find luxury mehendi artists who created the most intricate designs we had ever seen.

The ceremony venue was decorated with traditional elements and beautiful lighting. Royal wedding decorators set up a perfect mandap and created an atmosphere that honored the cultural significance of mehendi.

The luxury mehendi artists created breathtaking designs that incorporated our love story, cultural symbols, and traditional patterns. The dark, rich color and attention to detail were exceptional.

Indian caterers served delicious traditional snacks and sweets that complemented the ceremony. From chai to traditional mithai, every item was authentic and beautifully presented.

WedEase coordinated everything seamlessly - from timing the ceremony to ensuring all traditional elements were included. Our families were touched by the beautiful cultural experience.`,
      services: ['Luxury Mehendi Artists', 'Royal Wedding Decorators', 'Royal Indian Caterers'],
      rating: 5,
      tags: ['Mehendi Ceremony', 'Traditional Art', 'Jaipur', 'Luxury Service', 'Cultural'],
      authorBio: 'Divya & Amit, a doctor and lawyer couple from Jaipur, wanted to honor traditional mehendi ceremony.'
    }
  }

  const blog = blogDetails[id]

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
          <Link to="/blogs" className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate('/blogs')} className="mb-6 text-pink-600 hover:text-pink-700">
          ← Back to Wedding Stories
        </button>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-gray-600 ml-1">{blog.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="font-medium">{blog.author}</span>
                <span>•</span>
                <span>{blog.date}</span>
                <span>•</span>
                <span className="text-pink-600 font-medium">📍 {blog.location}</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              {blog.images.map((image, index) => (
                <div key={index} className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={image} 
                    alt={`${blog.title} ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{blog.content}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">WedEase Services Used</h3>
                <div className="space-y-3">
                  {blog.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                      <span className="text-pink-500">💑</span>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About the Couple</h3>
                <p className="text-gray-600">{blog.authorBio}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Share Your Wedding Story</h3>
            <p className="text-gray-600 mb-4">
              Did you use WedEase for your wedding? Share your experience and inspire other couples!
            </p>
            <div className="flex space-x-4">
              <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                Submit Your Story
              </button>
              <button className="border-2 border-pink-400 text-pink-600 px-6 py-2 rounded-lg hover:bg-pink-50 transition-colors">
                Contact WedEase
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogDetail
