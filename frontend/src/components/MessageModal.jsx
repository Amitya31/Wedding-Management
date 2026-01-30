import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MessageModal = ({ isOpen, onClose, venue }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Determine venue type based on the venue object
  const getVenueType = () => {
    // Handle service objects (vendor services)
    if (venue.vendorType) {
      switch (venue.vendorType) {
        case 'venue':
          return 'venue';
        case 'decorator':
          return 'decorator';
        case 'accessories':
          return 'accessories-makeup';
        default:
          return 'venue';
      }
    }
    
    // Handle existing venue objects
    if (venue.type === 'dj' || venue.type === 'photographer' || venue.type === 'videographer' || 
        venue.type === 'musician' || venue.type === 'dance-choreographer' || venue.type === 'mehendi-artist' ||
        venue.type === 'dance' || venue.type === 'mehendi') {
      return 'artist';
    } else if (venue.type === 'jewellery' || venue.type === 'makeup' || venue.type === 'costumes') {
      return 'accessories-makeup';
    } else if (venue.type === 'decorator') {
      return 'decorator';
    } else if (venue.type === 'caterer') {
      return 'caterer';
    } else {
      return 'venue';
    }
  };

  // Get venue/service name
  const getVenueName = () => {
    return venue.name || '';
  };
  
  const [formData, setFormData] = useState({
    message: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    inquiryType: '',
    // Service specific fields
    eventType: '',
    eventDate: '',
    budget: '',
    // Dance choreographer fields
    danceStyle: '',
    numberOfDancers: '',
    // Mehendi artist fields
    mehendiType: '',
    handsToCover: '',
    // Photographer fields
    photographyPackage: '',
    photographyStyle: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const requestData = {
        venueId: venue._id || venue.id,  // Handle both _id and id
        venueType: getVenueType(), // Include venue type
        contactType: 'message',
        ...formData
      };
      
      console.log('Sending message data:', requestData);
      console.log('Venue object:', venue);
      console.log('Venue ID:', venue._id || venue.id);
      console.log('Venue Type:', getVenueType());
      
      const response = await fetch('http://localhost:3000/api/contact/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (response.ok) {
        const serviceType = getVenueType() === 'artist' ? 'artist' : 
                           getVenueType() === 'accessories-makeup' ? 'service' : 'venue';
        alert(`Message sent successfully! The ${serviceType} will get back to you soon.`);
        onClose();
        setFormData({
          message: '',
          contactEmail: user?.email || '',
          contactPhone: '',
          inquiryType: '',
          eventType: '',
          eventDate: '',
          budget: '',
          // Dance choreographer fields
          danceStyle: '',
          numberOfDancers: '',
          // Mehendi artist fields
          mehendiType: '',
          handsToCover: '',
          // Photographer fields
          photographyPackage: '',
          photographyStyle: ''
        });
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Message error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 backdrop-blur-md z-40 transition-all duration-300"
        onClick={onClose}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      
      {/* Modal centered on screen */}
      <div className="fixed bg-white rounded-xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Send Message to {getVenueName()}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            {getVenueType() === 'artist' ? 'Send your inquiry and the artist will respond to you' :
             getVenueType() === 'accessories-makeup' ? 'Send your inquiry and the service provider will respond to you' :
             'Send your inquiry and the venue will respond to you'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Service Specific Inquiry Options */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm">
              {getVenueType() === 'artist' ? 'Artist Inquiry' :
               getVenueType() === 'accessories-makeup' ? 'Service Inquiry' :
               'Venue Inquiry'}
            </h3>
            
            {getVenueType() === 'artist' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    {(venue.type === 'dance-choreographer' || venue.type === 'dance') && (
                      <>
                        <option value="choreography">Choreography Services</option>
                        <option value="performance">Performance Booking</option>
                        <option value="workshop">Dance Workshop</option>
                        <option value="custom">Custom Choreography</option>
                        <option value="group">Group Performance</option>
                      </>
                    )}
                    {(venue.type === 'mehendi-artist' || venue.type === 'mehendi') && (
                      <>
                        <option value="mehendi-design">Mehendi Design Catalogue</option>
                        <option value="trial">Trial Session</option>
                        <option value="bridal">Bridal Mehendi Package</option>
                        <option value="group">Group Mehendi</option>
                        <option value="custom">Custom Design</option>
                      </>
                    )}
                    {venue.type === 'photographer' && (
                      <>
                        <option value="portfolio">Portfolio Request</option>
                        <option value="packages">Photography Packages</option>
                        <option value="wedding">Wedding Coverage</option>
                        <option value="pre-wedding">Pre-Wedding Shoot</option>
                        <option value="equipment">Equipment Details</option>
                      </>
                    )}
                    {(venue.type === 'dj' || venue.type === 'musician' || venue.type === 'videographer') && (
                      <>
                        <option value="availability">Check Availability</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="services">Service Details</option>
                        <option value="equipment">Equipment Requirements</option>
                        <option value="custom">Custom Request</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="reception">Reception</option>
                      <option value="sangeet">Sangeet</option>
                      <option value="mehndi">Mehndi</option>
                      <option value="engagement">Engagement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                {/* Dance Choreographer Specific Fields */}
                {(venue.type === 'dance-choreographer' || venue.type === 'dance') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dance Style Interest
                      </label>
                      <select
                        name="danceStyle"
                        value={formData.danceStyle || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Style</option>
                        <option value="bollywood">Bollywood</option>
                        <option value="classical">Classical</option>
                        <option value="contemporary">Contemporary</option>
                        <option value="folk">Folk</option>
                        <option value="western">Western</option>
                        <option value="fusion">Fusion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Performers
                      </label>
                      <input
                        type="number"
                        name="numberOfDancers"
                        value={formData.numberOfDancers || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 5"
                        min="1"
                      />
                    </div>
                  </div>
                )}
                {/* Mehendi Artist Specific Fields */}
                {(venue.type === 'mehendi-artist' || venue.type === 'mehendi') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mehendi Type Interest
                      </label>
                      <select
                        name="mehendiType"
                        value={formData.mehendiType || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Type</option>
                        <option value="traditional">Traditional Indian</option>
                        <option value="arabic">Arabic</option>
                        <option value="rajasthani">Rajasthani</option>
                        <option value="indo-arabic">Indo-Arabic</option>
                        <option value="modern">Modern/Contemporary</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coverage Needed
                      </label>
                      <select
                        name="handsToCover"
                        value={formData.handsToCover || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Coverage</option>
                        <option value="both-hands">Both Hands</option>
                        <option value="one-hand">One Hand Only</option>
                        <option value="both-hands-feet">Both Hands & Feet</option>
                        <option value="bride-special">Bride Special (Full)</option>
                      </select>
                    </div>
                  </div>
                )}
                {/* Photographer Specific Fields */}
                {venue.type === 'photographer' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photography Style Interest
                      </label>
                      <select
                        name="photographyStyle"
                        value={formData.photographyStyle || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Style</option>
                        <option value="traditional">Traditional</option>
                        <option value="candid">Candid</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="documentary">Documentary</option>
                        <option value="artistic">Artistic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package Duration
                      </label>
                      <select
                        name="photographyPackage"
                        value={formData.photographyPackage || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Package</option>
                        <option value="basic">Basic (6 hours)</option>
                        <option value="standard">Standard (10 hours)</option>
                        <option value="premium">Premium (Full Day)</option>
                        <option value="luxury">Luxury (Multi-Day)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {getVenueType() === 'accessories-makeup' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    {venue.type === 'jewellery' && (
                      <>
                        <option value="catalogue">Request Catalogue</option>
                        <option value="customization">Custom Design</option>
                        <option value="trial">Trial Appointment</option>
                        <option value="pricing">Pricing Details</option>
                      </>
                    )}
                    {venue.type === 'makeup' && (
                      <>
                        <option value="trial">Trial Session</option>
                        <option value="packages">Service Packages</option>
                        <option value="portfolio">Portfolio Request</option>
                        <option value="group">Group Booking</option>
                      </>
                    )}
                    {venue.type === 'costumes' && (
                      <>
                        <option value="catalogue">Collection Catalogue</option>
                        <option value="customization">Custom Tailoring</option>
                        <option value="trial">Fitting Appointment</option>
                        <option value="rental">Rental Options</option>
                      </>
                    )}
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Approximate Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ₹50,000 - ₹1,00,000"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder="Type your message here..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contact Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-5 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">
              {getVenueType() === 'artist' ? 'Artist Details' :
               getVenueType() === 'accessories-makeup' ? 'Service Details' :
               'Venue Details'}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {getVenueName()}</p>
              <p><strong>Price Range:</strong> {venue.price}</p>
              {getVenueType() === 'artist' && (
                <>
                  <p><strong>Category:</strong> {venue.category}</p>
                  <p><strong>Services:</strong> {venue.features?.slice(0, 3).join(', ')}</p>
                </>
              )}
              {getVenueType() === 'accessories-makeup' && (
                <>
                  <p><strong>Category:</strong> {venue.category}</p>
                  <p><strong>Features:</strong> {venue.features?.slice(0, 3).join(', ')}</p>
                </>
              )}
              {venue.city && <p><strong>Location:</strong> {venue.city}</p>}
              {venue.contact?.phone && <p><strong>Contact:</strong> {venue.contact.phone}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageModal;
