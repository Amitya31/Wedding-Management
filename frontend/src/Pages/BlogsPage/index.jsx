import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogs = [
    {
      id: 1,
      title: 'Royal Indian Wedding in Jaipur - A Dream Come True',
      category: 'wedding',
      author: 'Priya & Rahul',
      date: '2024-01-15',
      location: 'Jaipur, Rajasthan',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      excerpt: 'Our royal Indian wedding in Jaipur was made magical with WedEase decorators and caterers. The traditional setup exceeded our dreams.',
      content: 'Our royal Indian wedding in Jaipur was a fairytale come true. WedEase helped us book the most amazing traditional decorators who transformed the venue into a palace. The Indian caterers served authentic Rajasthani cuisine that our guests still talk about. From the mehendi ceremony to the reception, every detail was perfect.',
      services: ['Royal Wedding Decorators', 'Indian Caterers', 'Traditional Mehendi Artist'],
      rating: 5
    },
    {
      id: 2,
      title: 'Beach Destination Wedding in Goa - Paradise Found',
      category: 'destination',
      author: 'Sarah & Mike',
      date: '2024-02-20',
      location: 'Goa',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      excerpt: 'Our beach destination wedding in Goa was absolutely perfect. The destination decorators and caterers created an unforgettable experience.',
      content: 'Getting married on the beaches of Goa was always our dream. WedEase connected us with amazing destination wedding planners who handled everything from the beach setup to the reception. The Mediterranean caterers added a unique touch to our coastal celebration. Our guests flew in from around the world and were blown away by the seamless organization.',
      services: ['Destination Wedding Planners', 'Mediterranean Paradise', 'DJ Artist'],
      rating: 5
    },
    {
      id: 3,
      title: 'Modern Mumbai Wedding - Contemporary Elegance',
      category: 'modern',
      author: 'Neha & Arjun',
      date: '2024-03-10',
      location: 'Mumbai, Maharashtra',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      excerpt: 'Our contemporary Mumbai wedding was sleek and stylish. Modern decorators and continental caterers created the perfect urban celebration.',
      content: 'We wanted a modern, sophisticated wedding in Mumbai and WedEase delivered exactly that. The modern decorators created stunning minimalist designs with LED lighting that transformed our venue. Continental caterers served international cuisine that impressed our diverse guest list. The DJ kept the dance floor packed all night with his amazing music selection.',
      services: ['Modern Wedding Planners', 'Continental Delights', 'DJ Artist'],
      rating: 4
    },
    {
      id: 4,
      title: 'Traditional South Indian Wedding in Bangalore',
      category: 'traditional',
      author: 'Anita & Suresh',
      date: '2024-04-05',
      location: 'Bangalore, Karnataka',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      excerpt: 'Our traditional South Indian wedding was beautiful and authentic. Cultural decorators and Indian caterers honored our heritage perfectly.',
      content: 'Our traditional South Indian wedding in Bangalore was a beautiful celebration of our culture. WedEase helped us find cultural heritage decorators who understood every ritual and tradition. The Indian caterers served authentic South Indian cuisine that reminded everyone of home. The mehendi artist created intricate designs that were the talk of the town.',
      services: ['Cultural Heritage Decor', 'Royal Indian Caterers', 'Traditional Mehendi Artist'],
      rating: 5
    },
    {
      id: 5,
      title: 'Luxury Palace Wedding in Udaipur',
      category: 'luxury',
      author: 'Ishita & Aditya',
      date: '2024-05-12',
      location: 'Udaipur, Rajasthan',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      excerpt: 'Our luxury palace wedding in Udaipur was beyond imagination. Premium decorators and luxury caterers created an unforgettable royal experience.',
      content: 'Our luxury palace wedding in Udaipur was the stuff of dreams. WedEase connected us with luxury wedding designers who transformed the palace into a magical wonderland. The luxury caterers served gourmet cuisine that matched the royal setting. Every detail was handled with VIP service that made us feel like true royalty.',
      services: ['Luxury Wedding Designers', 'Continental Delights', 'Floral Paradise Decorators'],
      rating: 5
    },
    {
      id: 6,
      title: 'Garden Wedding in Pune - Natural Beauty',
      category: 'outdoor',
      author: 'Rachel & Tom',
      date: '2024-06-18',
      location: 'Pune, Maharashtra',
      image: 'https://tse2.mm.bing.net/th/id/OIP.nDHq28eAKhO19SXtx16YNwHaEJ?pid=Api&P=0&h=180',
      excerpt: 'Our outdoor garden wedding in Pune was magical. The outdoor decorators and floral specialists created a natural paradise.',
      content: 'Our garden wedding in Pune was surrounded by natural beauty. WedEase helped us find outdoor garden decorators who created stunning floral arches and garden themes. The floral paradise decorators added exotic flowers that made everything magical. Mediterranean caterers served fresh, healthy cuisine that perfectly complemented our outdoor setting.',
      services: ['Outdoor Garden Decorators', 'Floral Paradise Decorators', 'Mediterranean Paradise'],
      rating: 4
    },
    {
      id: 7,
      title: 'Chinese Theme Wedding in Delhi - Fusion Celebration',
      category: 'international',
      author: 'Emma & David',
      date: '2024-07-22',
      location: 'Delhi NCR',
      image: 'https://tse3.mm.bing.net/th/id/OIP._ek4X7FuJqixT2QWGPH4NgHaE7?pid=Api&P=0&h=180',
      excerpt: 'Our Chinese theme wedding in Delhi was unique and exciting. Chinese caterers and modern decorators created the perfect fusion.',
      content: 'We wanted something different for our Delhi wedding and chose a Chinese theme. WedEase found us amazing Chinese caterers who set up live noodle bars and dim sum stations. The modern decorators created a beautiful fusion of Chinese and contemporary elements. Our guests loved the unique concept and delicious food.',
      services: ['Chinese Dragon Catering', 'Modern Wedding Planners', 'DJ Artist'],
      rating: 4
    },
    {
      id: 8,
      title: 'Italian Romance Wedding in Chennai',
      category: 'international',
      author: 'Meera & Rahul',
      date: '2024-08-30',
      location: 'Chennai, Tamil Nadu',
      image: 'https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180',
      excerpt: 'Our Italian-themed wedding in Chennai was romantic and delicious. Italian caterers and floral decorators created a Mediterranean dream.',
      content: 'Our Italian-themed wedding in Chennai was pure romance. WedEase connected us with Italian caterers who set up live pasta stations and wood-fired pizza. The floral paradise decorators created beautiful Mediterranean-inspired arrangements. The combination of Italian cuisine and floral beauty made our day unforgettable.',
      services: ['Italian Bella Vista', 'Floral Paradise Decorators', 'Dance Choreographer'],
      rating: 5
    },
    {
      id: 9,
      title: 'Mehendi Ceremony Special - Traditional Art',
      category: 'ceremony',
      author: 'Divya & Amit',
      date: '2024-09-14',
      location: 'Jaipur, Rajasthan',
      image: 'https://tse1.mm.bing.net/th/id/OIP.H1lKjZ8f7Q9Xk2m3n4p5XwHaE8?pid=Api&P=0&h=180',
      excerpt: 'Our mehendi ceremony was a beautiful traditional celebration. Luxury mehendi artists created intricate designs that told our story.',
      content: 'The mehendi ceremony was one of the most special parts of our wedding. WedEase helped us find luxury mehendi artists who created the most intricate designs we had ever seen. The traditional decorators set up a beautiful mandap and the Indian caterers served delicious traditional snacks. It was a perfect blend of art and tradition.',
      services: ['Luxury Mehendi Artists', 'Royal Wedding Decorators', 'Royal Indian Caterers'],
      rating: 5
    }
  ]

  const categories = ['all', 'wedding', 'destination', 'modern', 'traditional', 'luxury', 'outdoor', 'international', 'ceremony']

  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Wedding Stories & Experiences</h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Real wedding experiences from couples who used WedEase services. Discover how we helped make their special day unforgettable.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-100'
              }`}
            >
              {category === 'all' ? 'All Stories' : 
               category === 'wedding' ? 'Weddings' :
               category === 'destination' ? 'Destination' :
               category === 'modern' ? 'Modern' :
               category === 'traditional' ? 'Traditional' :
               category === 'luxury' ? 'Luxury' :
               category === 'outdoor' ? 'Outdoor' :
               category === 'international' ? 'International' :
               'Ceremonies'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
                    {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-600 ml-1">{blog.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{blog.author}</span> • {blog.date}
                  </div>
                  <div className="text-sm text-pink-600 font-medium">
                    📍 {blog.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.services.slice(0, 2).map((service, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/blogs/${blog.id}`}
                  className="w-full block text-center bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-600 transition-all"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No stories found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogsPage
