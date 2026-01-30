import React, { useState } from 'react';
import { bookingAPI } from '../services/api';

const BookingForm = ({ venueId, venueType, venueName, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    venueId,
    venueType,
    eventType: 'wedding',
    eventDate: '',
    guestCount: '',
    budget: '',
    specialRequests: '',
    contactPhone: '',
    contactEmail: '',
    // Decorator specific fields
    decorationTheme: '',
    venueLocation: '',
    setupTime: '',
    // Caterer specific fields
    cuisinePreference: '',
    dietaryRestrictions: '',
    menuType: '',
    serviceStyle: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await bookingAPI.createBooking(formData);
      onSuccess(response.message);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const renderServiceSpecificFields = () => {
    if (venueType === 'decorator') {
      return (
        <>
          <div>
            <label className="block text-gray-700 mb-2">Decoration Theme</label>
            <select
              name="decorationTheme"
              value={formData.decorationTheme}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Theme</option>
              <option value="traditional">Traditional</option>
              <option value="modern">Modern</option>
              <option value="floral">Floral</option>
              <option value="luxury">Luxury</option>
              <option value="outdoor">Outdoor</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Venue Location</label>
            <input
              type="text"
              name="venueLocation"
              value={formData.venueLocation}
              onChange={handleChange}
              placeholder="Event venue location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Setup Time Required</label>
            <select
              name="setupTime"
              value={formData.setupTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Setup Time</option>
              <option value="1 day before">1 Day Before</option>
              <option value="2 days before">2 Days Before</option>
              <option value="3 days before">3 Days Before</option>
              <option value="same day">Same Day</option>
            </select>
          </div>
        </>
      );
    }

    if (venueType === 'caterer') {
      return (
        <>
          <div>
            <label className="block text-gray-700 mb-2">Cuisine Preference</label>
            <select
              name="cuisinePreference"
              value={formData.cuisinePreference}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Cuisine</option>
              <option value="indian">Indian</option>
              <option value="continental">Continental</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="japanese">Japanese</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="thai">Thai</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Dietary Restrictions</label>
            <input
              type="text"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              placeholder="e.g., Vegetarian, Vegan, Gluten-free"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Menu Type</label>
            <select
              name="menuType"
              value={formData.menuType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Menu Type</option>
              <option value="buffet">Buffet</option>
              <option value="plated">Plated Service</option>
              <option value="family-style">Family Style</option>
              <option value="cocktail">Cocktail Reception</option>
              <option value="food-stations">Food Stations</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Service Style</label>
            <select
              name="serviceStyle"
              value={formData.serviceStyle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Service Style</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="semi-formal">Semi-Formal</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Book {venueName || venueType}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              <label className="block text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Number of Guests</label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Expected number of guests"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Budget (₹)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Your budget"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
          </div>

          {/* Service-specific fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderServiceSpecificFields()}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requirements or preferences"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows="3"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-50"
            >
              {loading ? 'Creating Booking...' : 'Confirm Booking'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
