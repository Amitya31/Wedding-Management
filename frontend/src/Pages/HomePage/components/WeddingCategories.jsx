import React from 'react'
import { useNavigate } from 'react-router-dom'

const WeddingCategories = () => {
  const navigate = useNavigate()
  
  const categories = [
    {
      name: "Traditional Wedding",
      icon: "👰‍♀️",
      description: "Classic Indian wedding ceremonies",

    },
    {
      name: "Destination Wedding",
      icon: "✈️",
      description: "Exotic locations for your special day",
      
    },
    {
      name: "Royal Wedding",
      icon: "👑",
      description: "Luxurious palace weddings",
      
    },
    {
      name: "Traditional Decorators",
      icon: "🏛️",
      description: "Authentic cultural wedding decoration",
      
    },
    {
      name: "Modern Wedding Planners",
      icon: "🎨",
      description: "Contemporary wedding design concepts",

    },
    {
      name: "Floral Paradise Decorators",
      icon: "💐",
      description: "Beautiful floral arrangements and themes",
      
    },
    {
      name: "Cultural Heritage Decor",
      icon: "🏺",
      description: "Traditional Indian heritage decoration",
      
    },
    {
      name: "Luxury Wedding Designers",
      icon: "💎",
      description: "Ultra-luxury wedding experiences",
      
    }
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Plan Your Dream Wedding</h2>
            <p className="text-gray-600">Choose from our exclusive wedding categories</p>
          </div>
         
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
              <div className="text-4xl mb-4 text-center">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3 text-center">{category.description}</p>
              <p className="text-sm font-medium text-pink-600 text-center">{category.count}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/decorators')}
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors duration-200 font-medium"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  )
}

export default WeddingCategories
