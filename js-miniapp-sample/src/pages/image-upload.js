import React, { useState } from 'react';
import MiniApp from 'js-miniapp-sdk';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(''); // Add state for message

  const handleSelectFromGallery = () => {
    MiniApp.galleryManager
      .getImageFromGallery()
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setSelectedImage(imageUrl);
        setMessage('Image selected successfully!'); // Set success message
      })
      .catch((error) => {
        console.error('Error selecting image from gallery:', error);
        setMessage(
          `Error selecting image from gallery: ${error.name} - ${error.message}`
        ); // Set error message
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <button onClick={handleSelectFromGallery}>Select from Gallery</button>
      {message && <p>{message}</p>} {/* Display message */}
      {selectedImage && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
