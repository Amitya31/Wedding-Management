import React, { useState } from 'react';

const SimpleImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 800, 
  height = 600,
  loading = 'lazy',
  onClick,
  style = {},
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
  };

  // Fallback image
  const fallbackSrc = 'https://via.placeholder.com/' + width + 'x' + height + '/f0f0f0/999999?text=Image+Not+Available';

  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height, ...style }}
        {...props}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Main image */}
      <img
        src={src || fallbackSrc}
        alt={alt || ''}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ 
          width, 
          height, 
          objectFit: 'cover',
          ...style 
        }}
        {...props}
      />
    </div>
  );
};

export default SimpleImage;
