import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CiShop } from "react-icons/ci";
import { MdKeyboardArrowDown, MdLocationOn, MdSearch } from "react-icons/md";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const navigate = useNavigate()

  const categories = [
    { value: 'all', label: 'All Vendors' },
    { value: 'venues', label: 'Venues' },
    { value: 'accessories-makeup', label: 'Accessories & Makeup' },
    { value: 'artists', label: 'Artists' },
    { value: 'decorators', label: 'Decorators' },
    { value: 'caterers', label: 'Caterers' }
  ]

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'goa', label: 'Goa' },
    { value: 'udaipur', label: 'Udaipur' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chandigarh', label: 'Chandigarh' }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    
    // Build search parameters
    const params = new URLSearchParams()
    if (selectedLocation !== 'all') {
      params.append('location', selectedLocation)
    }
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim())
    }
    
    // Determine which page to navigate to based on category
    let route = '/'
    switch (selectedCategory) {
      case 'venues':
        route = '/venues'
        break
      case 'accessories-makeup':
        route = '/accessories-makeup'
        break
      case 'artists':
        route = '/artists'
        break
      case 'decorators':
        route = '/decorators'
        break
      case 'caterers':
        route = '/caterers'
        break
      case 'all':
      default:
      
        route = '/accessories-makeup'
        break
    }
    
    // Navigate with search parameters
    const queryString = params.toString()
    navigate(`${route}${queryString ? '?' + queryString : ''}`)
  }

  return (
    <>
      <section  className='min-h-[60vh] bg-center bg-[url(https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/delhi_bg.jpeg)] flex flex-col items-center justify-center '>
        <div className="container mx-auto px-4">
          <h1 className="text-center text-white text-4xl md:text-5xl font-[ArialBold] mb-8">Plan Your Dream Wedding</h1>
          <p className="text-center text-pink-200 text-lg md:text-xl mb-8 font-semibold italic drop-shadow-lg">"Traditions, trends, and timeless love — planned with ease."</p>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent" 
                      placeholder='Find Vendors, Services, or Locations...'
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  
                  <div className="relative">
                    <select 
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    >
                      {locations.map(location => (
                        <option key={location.value} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                    <MdLocationOn className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <CiShop className="text-xl" />
                    Search
                  </button>
                </div>
              </div>
              
            
            </form>
          </div>
        </div>
      </section>

      {/* Popular Wedding Venues Section */}
      <section className="py-12 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Wedding Venues</h2>
            <button 
              onClick={() => navigate('/venues')}
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2 transition-colors"
            >
              View All Venues
              <MdKeyboardArrowDown className="rotate-270" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sunset Villa Estate - 4.9 rating */}
            <div 
              onClick={() => navigate('/venues/2')}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src="https://tse4.mm.bing.net/th/id/OIP.Z9xC1GBFLEzeFHrjC9E6YwHaDe?pid=Api&P=0&h=180" 
                  alt="Sunset Villa Estate"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-pink-600 font-semibold text-xs">
                  4.9⭐
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Sunset Villa Estate</h3>
                <p className="text-sm text-gray-600 mb-2">Goa • 200-500 guests</p>
                <p className="text-pink-600 font-semibold">₹80,000 - ₹3,00,000</p>
              </div>
            </div>

            {/* Royal Farm Estate - 4.9 rating */}
            <div 
              onClick={() => navigate('/venues/7')}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src="https://tse3.mm.bing.net/th/id/OIP.rEHhL0woFTdVZkln-NVXPQHaD3?pid=Api&P=0&h=180" 
                  alt="Royal Farm Estate"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-pink-600 font-semibold text-xs">
                  4.9⭐
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Royal Farm Estate</h3>
                <p className="text-sm text-gray-600 mb-2">Udaipur • 350-900 guests</p>
                <p className="text-pink-600 font-semibold">₹70,000 - ₹2,80,000</p>
              </div>
            </div>

            {/* Grand Royal Palace - 4.8 rating */}
            <div 
              onClick={() => navigate('/venues/1')}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src="https://media-api.xogrp.com/images/a46789ba-034f-4da5-9cb4-22c940a86632" 
                  alt="Grand Royal Palace"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-pink-600 font-semibold text-xs">
                  4.8⭐
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Grand Royal Palace</h3>
                <p className="text-sm text-gray-600 mb-2">Delhi • 500-1000 guests</p>
                <p className="text-pink-600 font-semibold">₹50,000 - ₹2,00,000</p>
              </div>
            </div>

            {/* Luxury Garden Resort - 4.8 rating */}
            <div 
              onClick={() => navigate('/venues/6')}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src="https://tse3.mm.bing.net/th/id/OIP.9V09noDMgcgRdXU9Sk4-ZQHaFj?pid=Api&P=0&h=180" 
                  alt="Luxury Garden Resort"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-pink-600 font-semibold text-xs">
                  4.8⭐
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">Luxury Garden Resort</h3>
                <p className="text-sm text-gray-600 mb-2">Bangalore • 250-700 guests</p>
                <p className="text-pink-600 font-semibold">₹45,000 - ₹1,80,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero