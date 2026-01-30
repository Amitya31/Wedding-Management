import React, { useState } from 'react';
import { contactAPI } from '../services/api';

const ContactForm = ({ venueId, venueType, venueName, contactType, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    venueId,
    venueType,
    contactType,
    message: '',
    contactPhone: '',
    contactEmail: ''
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

    // Validate required fields
    if (!formData.message || formData.message.trim() === '') {
      setError('Message is required');
      setLoading(false);
      return;
    }

    if (contactType === 'message' && (!formData.contactEmail || formData.contactEmail.trim() === '')) {
      setError('Email is required for message requests');
      setLoading(false);
      return;
    }

    if (contactType === 'call' && (!formData.contactPhone || formData.contactPhone.trim() === '')) {
      setError('Phone number is required for call requests');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending contact data:', formData);
      const response = await contactAPI.createContact(formData);
      onSuccess(response.message);
      onClose();
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const getFormTitle = () => {
    if (contactType === 'call') return `Request Call from ${venueName || venueType}`;
    return `Send Message to ${venueName || venueType}`;
  };

  const getServiceSpecificPlaceholder = () => {
    if (venueType === 'decorator') {
      return 'I would like to inquire about decoration services for my upcoming event. Please provide information about available themes and pricing.';
    }
    if (venueType === 'caterer') {
      return 'I would like to inquire about catering services for my upcoming event. Please provide menu options and pricing details.';
    }
    return 'I would like to inquire about your services for my upcoming event. Please provide more information.';
  };

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
      <div className="fixed bg-white rounded-xl max-w-lg w-full max-h-[70vh] overflow-y-auto shadow-2xl z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {getFormTitle()}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              {contactType === 'call' ? 'Your Phone Number' : 'Your Email'}
            </label>
            {contactType === 'call' ? (
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                required
              />
            ) : (
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                required
              />
            )}
          </div>

          {contactType === 'message' && (
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={getServiceSpecificPlaceholder()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm resize-none"
                rows="3"
                required
              />
            </div>
          )}

          {contactType === 'call' && (
            <div>
              <label className="block text-gray-700 mb-1 text-sm font-medium">Preferred Call Time (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="When would you prefer to receive a call? (e.g., Weekdays after 6 PM)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm resize-none"
                rows="2"
              />
            </div>
          )}

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-600 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Sending...' : (contactType === 'call' ? 'Request Call' : 'Send Message')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
