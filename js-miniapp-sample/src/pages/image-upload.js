import React, { useState } from 'react';
import MiniApp from 'js-miniapp-sdk';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectFromGallery = () => {
    MiniApp.galleryManager
      .getImageFromGallery()
      .then((blob) => {
        setSelectedImage(blob);
      })
      .catch((error) => {
        console.error('Error selecting image from gallery:', error);
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <button onClick={handleSelectFromGallery}>Select from Gallery</button>
      {selectedImage && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
