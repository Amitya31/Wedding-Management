import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ isOpen, onClose, venue, buttonPosition }) => {
  console.log('BookingModal render - isOpen:', isOpen, 'venue:', venue);
  const { isAuthenticated, user } = useAuth();
  const modalRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate modal position based on button position
  useEffect(() => {
    if (isOpen && buttonPosition) {
      setIsAnimating(true);
      
      // Center the modal on screen instead of positioning near button
      const modalWidth = 600; // More compact width
      const modalHeight = window.innerHeight * 0.7; // More compact height
      
      const left = (window.innerWidth - modalWidth) / 2;
      const top = (window.innerHeight - modalHeight) / 2;
      
      setModalPosition({ top, left });
      
      // Trigger animation
      setTimeout(() => setIsAnimating(false), 50);
    }
  }, [isOpen, buttonPosition]);
  
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
    eventType: 'wedding',
    eventDate: '',
    guestCount: '',
    budget: '',
    specialRequests: '',
    contactPhone: user?.email ? '' : '',
    contactEmail: user?.email || '',
    // Artist specific fields
    performanceDuration: '',
    musicPreferences: '',
    equipmentNeeded: '',
    // Dance choreographer fields
    danceStyle: '',
    numberOfDancers: '',
    practiceSessions: '',
    // Mehendi artist fields
    mehendiType: '',
    mehendiDesign: '',
    handsToCover: '',
    // Photographer fields
    photographyPackage: '',
    photographyStyle: '',
    deliveryTime: '',
    // Accessories & Makeup specific fields
    serviceType: '',
    trialDate: '',
    customizationNeeds: '',
    deliveryDate: ''
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
      const venueType = getVenueType();
      
      // Validate required fields
      const baseRequiredFields = ['eventType', 'eventDate', 'budget', 'contactPhone', 'contactEmail'];
      const isVenueOrCaterer = venueType === 'venue' || venueType === 'caterer';
      const requiredFields = isVenueOrCaterer ? [...baseRequiredFields, 'guestCount'] : baseRequiredFields;
      
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
      
      if (missingFields.length > 0) {
        setIsLoading(false);
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      // Only include guestCount for venues and caterers
      const requestData = {
        venueId: venue._id || venue.id,  // Handle both _id and id
        venueType: venueType,
        ...formData
      };
      
      // Remove guestCount for artists and accessories-makeup
      if (venueType === 'artist' || venueType === 'accessories-makeup') {
        delete requestData.guestCount;
      }
      
      console.log('Sending booking data:', requestData);
      console.log('Venue object:', venue);
      console.log('Venue ID:', venue._id || venue.id);
      console.log('Venue Type:', venueType);
      
      const response = await fetch('http://localhost:3000/api/booking/create', {
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
        alert(`Booking request submitted successfully! The ${serviceType} will contact you soon.`);
        onClose();
        setFormData({
          eventType: 'wedding',
          eventDate: '',
          guestCount: '',
          budget: '',
          specialRequests: '',
          contactPhone: '',
          contactEmail: user?.email || '',
          // Reset service-specific fields
          performanceDuration: '',
          musicPreferences: '',
          equipmentNeeded: '',
          // Dance choreographer fields
          danceStyle: '',
          numberOfDancers: '',
          practiceSessions: '',
          // Mehendi artist fields
          mehendiType: '',
          mehendiDesign: '',
          handsToCover: '',
          // Photographer fields
          photographyPackage: '',
          photographyStyle: '',
          deliveryTime: '',
          // Accessories & Makeup fields
          serviceType: '',
          trialDate: '',
          customizationNeeds: '',
          deliveryDate: ''
        });
      } else {
        alert(data.message || 'Failed to submit booking request');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to submit booking request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect - no black background */}
      <div 
        className="fixed inset-0 backdrop-blur-md z-40 transition-all duration-300"
        onClick={onClose}
        style={{
          opacity: isAnimating ? 0 : 1,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Very subtle white overlay
        }}
      />
      
      {/* Modal centered on screen */}
      <div
        ref={modalRef}
        className="fixed bg-white rounded-xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl z-50 transition-all duration-300"
        style={{
          top: `${modalPosition.top}px`,
          left: `${modalPosition.left}px`,
          transform: isAnimating ? 'scale(0.95) translateY(-5px)' : 'scale(1) translateY(0)',
          opacity: isAnimating ? 0 : 1,
        }}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              {getVenueType() === 'artist' ? `Book ${getVenueName()}` : 
               getVenueType() === 'accessories-makeup' ? `Book ${getVenueName()}` : 
               `Book ${getVenueName()}`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            {getVenueType() === 'artist' ? 'Fill in the details below to book this artist for your event' :
             getVenueType() === 'accessories-makeup' ? 'Fill in the details below to book this service for your wedding' :
             'Fill in the details below to submit your booking request'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                required
              >
                <option value="wedding">Wedding</option>
                <option value="reception">Reception</option>
                <option value="engagement">Engagement</option>
                <option value="sangeet">Sangeet</option>
                <option value="mehndi">Mehndi</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Show guest count only for venues */}
            {getVenueType() === 'venue' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  placeholder="e.g., 200"
                  required
                  min="1"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget (₹) *
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                placeholder="e.g., 100000"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Artist Specific Fields */}
          {getVenueType() === 'artist' && (
            <div className="bg-purple-50 p-3 rounded-lg space-y-3">
              <h3 className="font-semibold text-purple-800 mb-2 text-sm">Artist Specific Details</h3>
              
              {/* Dance Choreographer Specific Fields */}
              {(venue.type === 'dance-choreographer' || venue.type === 'dance') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dance Style *
                      </label>
                      <select
                        name="danceStyle"
                        value={formData.danceStyle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select dance style</option>
                        <option value="bollywood">Bollywood</option>
                        <option value="classical">Classical</option>
                        <option value="contemporary">Contemporary</option>
                        <option value="folk">Folk</option>
                        <option value="fusion">Fusion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Dancers *
                      </label>
                      <input
                        type="number"
                        name="numberOfDancers"
                        value={formData.numberOfDancers}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                        placeholder="e.g., 5"
                        required
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Practice Sessions *
                      </label>
                      <select
                        name="practiceSessions"
                        value={formData.practiceSessions}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select sessions</option>
                        <option value="5">5 sessions</option>
                        <option value="10">10 sessions</option>
                        <option value="15">15 sessions</option>
                        <option value="20">20 sessions</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Mehendi Artist Specific Fields */}
              {(venue.type === 'mehendi-artist' || venue.type === 'mehendi') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mehendi Type *
                      </label>
                      <select
                        name="mehendiType"
                        value={formData.mehendiType || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hands to Cover *
                      </label>
                      <select
                        name="handsToCover"
                        value={formData.handsToCover || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select Coverage</option>
                        <option value="both-hands">Both Hands</option>
                        <option value="one-hand">One Hand Only</option>
                        <option value="both-hands-feet">Both Hands & Feet</option>
                        <option value="bride-special">Bride Special (Full)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Design Preferences
                    </label>
                    <textarea
                      name="mehendiDesign"
                      value={formData.mehendiDesign || ''}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Describe your preferred mehendi design..."
                    />
                  </div>
                </div>
              )}

              {/* Photographer Specific Fields */}
              {venue.type === 'photographer' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photography Package *
                      </label>
                      <select
                        name="photographyPackage"
                        value={formData.photographyPackage || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select Package</option>
                        <option value="basic">Basic (6 hours)</option>
                        <option value="standard">Standard (10 hours)</option>
                        <option value="premium">Premium (Full Day)</option>
                        <option value="luxury">Luxury (Multi-Day)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photography Style *
                      </label>
                      <select
                        name="photographyStyle"
                        value={formData.photographyStyle || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select Style</option>
                        <option value="traditional">Traditional</option>
                        <option value="candid">Candid</option>
                        <option value="cinematic">Cinematic</option>
                        <option value="documentary">Documentary</option>
                        <option value="artistic">Artistic</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Time *
                      </label>
                      <select
                        name="deliveryTime"
                        value={formData.deliveryTime || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select Delivery</option>
                        <option value="7-days">7 Days</option>
                        <option value="15-days">15 Days</option>
                        <option value="30-days">30 Days</option>
                        <option value="express">Express (3 Days)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Special Equipment Needed
                      </label>
                      <textarea
                        name="equipmentNeeded"
                        value={formData.equipmentNeeded || ''}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="e.g., Drone, additional lighting, special lenses"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Default Artist Fields for DJ, Musician, Videographer */}
              {(venue.type === 'dj' || venue.type === 'musician' || venue.type === 'videographer') && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Performance Duration *
                      </label>
                      <select
                        name="performanceDuration"
                        value={formData.performanceDuration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select Duration</option>
                        <option value="2-hours">2 Hours</option>
                        <option value="3-hours">3 Hours</option>
                        <option value="4-hours">4 Hours</option>
                        <option value="6-hours">6 Hours</option>
                        <option value="full-day">Full Day</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Music Preferences
                      </label>
                      <input
                        type="text"
                        name="musicPreferences"
                        value={formData.musicPreferences}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        placeholder="e.g., Bollywood, Sufi, EDM"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Equipment Needed
                    </label>
                    <textarea
                      name="equipmentNeeded"
                      value={formData.equipmentNeeded}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="e.g., Additional speakers, lighting equipment, stage setup"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Accessories & Makeup Specific Fields */}
          {getVenueType() === 'accessories-makeup' && (
            <div className="bg-pink-50 p-3 rounded-lg space-y-3">
              <h3 className="font-semibold text-pink-800 mb-2 text-sm">Service Specific Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    required
                  >
                    <option value="">Select Service</option>
                    {(venue.type === 'jewellery' || (venue.vendorType === 'accessories' && venue.details?.category === 'Jewellery')) && (
                      <>
                        <option value="bridal-set">Complete Bridal Set</option>
                        <option value="necklace">Necklace Only</option>
                        <option value="earrings">Earrings Only</option>
                        <option value="custom-design">Custom Design</option>
                      </>
                    )}
                    {(venue.type === 'makeup' || (venue.vendorType === 'accessories' && venue.details?.category === 'Makeup')) && (
                      <>
                        <option value="bridal-makeup">Bridal Makeup</option>
                        <option value="party-makeup">Party Makeup</option>
                        <option value="family-makeup">Family Makeup</option>
                        <option value="trial-session">Trial Session</option>
                      </>
                    )}
                    {(venue.type === 'costumes' || (venue.vendorType === 'accessories' && venue.details?.category === 'Costume')) && (
                      <>
                        <option value="bridal-lehenga">Bridal Lehenga</option>
                        <option value="groom-sherwani">Groom Sherwani</option>
                        <option value="saree">Saree</option>
                        <option value="indo-western">Indo-Western</option>
                      </>
                    )}
                    {/* Fallback for other vendor services */}
                    {venue.vendorType === 'accessories' && !venue.details?.category && (
                      <>
                        <option value="consultation">Consultation</option>
                        <option value="custom-service">Custom Service</option>
                        <option value="rental">Rental Service</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Trial Date
                  </label>
                  <input
                    type="date"
                    name="trialDate"
                    value={formData.trialDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customization Needs
                  </label>
                  <textarea
                    name="customizationNeeds"
                    value={formData.customizationNeeds}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    placeholder="e.g., Size adjustments, color changes, design modifications"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Delivery Date *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              placeholder="Any special requirements or preferences..."
            />
          </div>

          <div className="bg-pink-50 p-3 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
              {getVenueType() === 'artist' ? 'Artist Details' :
               getVenueType() === 'accessories-makeup' ? 'Service Details' :
               'Venue Details'}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {getVenueName()}<br />
              <strong>Price Range:</strong> {venue.price}<br />
              {getVenueType() === 'artist' && (
                <>
                  <strong>Category:</strong> {venue.category}<br />
                  <strong>Services:</strong> {venue.features?.slice(0, 3).join(', ')}
                </>
              )}
              {getVenueType() === 'accessories-makeup' && (
                <>
                  <strong>Category:</strong> {venue.category}<br />
                  <strong>Features:</strong> {venue.features?.slice(0, 3).join(', ')}
                </>
              )}
              {venue.capacity && <><strong>Capacity:</strong> {venue.capacity}</>}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookingModal;
