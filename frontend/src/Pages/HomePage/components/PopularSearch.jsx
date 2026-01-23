import React from 'react'
import { useNavigate } from 'react-router-dom'

const PopularSearch = () => {
  const navigate = useNavigate()
  
  const popularSearches = [
    { name: 'Wedding Venues', route: '/venues' },
    { name: 'Photographers', route: '/artists?type=photographer' },
    { name: 'Catering Services', route: '/caterers' },
    { name: 'Bridal Makeup', route: '/accessories-makeup' },
    { name: 'Wedding Jewellery', route: '/accessories-makeup' },
    { name: 'Wedding Decor', route: '/decorators' },
    { name: 'Mehendi Artists', route: '/artists?type=mehendi' },
    { name: 'DJ Services', route: '/artists?type=dj' }
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Services</h2>
            <p className="text-gray-600">Explore all our services exclusively handpicked for you</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularSearches.map((service, index) => (
            <button
              key={index}
              onClick={() => navigate(service.route)}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 text-left"
            >
              <div className="flex items-center justify-center h-12">
                <span className="text-gray-800 font-medium text-center">{service.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularSearch
