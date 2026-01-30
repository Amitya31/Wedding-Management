import React, { useState, useRef } from 'react';

const SimpleImageUpload = ({ 
  onImageUpload, 
  existingImage = null, 
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = '',
  showPreview = true,
  buttonText = 'Upload Image',
  multiple = false,
  maxImages = 1
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(existingImage);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    // Validate file count
    if (multiple && files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate each file
    for (const file of files) {
      if (file.size > maxSize) {
        setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
        return;
      }
      
      if (!acceptedFormats.includes(file.type)) {
        setError('Invalid file format. Please upload JPEG, PNG, GIF, or WebP images.');
        return;
      }
    }

    setError('');
    setUploading(true);

    try {
      // Create object URLs for local preview
      const fileUrls = files.map(file => URL.createObjectURL(file));
      
      if (multiple) {
        onImageUpload(files);
        setPreview(fileUrls);
      } else {
        onImageUpload(files[0]);
        setPreview(fileUrls[0]);
      }
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-upload ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        onChange={handleFileSelect}
        multiple={multiple}
        className="hidden"
      />
      
      {/* Preview area */}
      {showPreview && preview && (
        <div className="mb-4">
          {multiple ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(Array.isArray(preview) ? preview : [preview]).map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={uploading}
        className={`w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-pink-400 transition-colors ${
          uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500 mb-2"></div>
            <span className="text-sm text-gray-600">Processing...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-gray-600">{buttonText}</span>
            <span className="text-xs text-gray-400 mt-1">
              Max size: {maxSize / (1024 * 1024)}MB
            </span>
          </div>
        )}
      </button>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default SimpleImageUpload;
