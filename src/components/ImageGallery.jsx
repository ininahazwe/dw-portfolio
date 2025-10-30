import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  return (
    <>
      {/* Grille d'images */}
      <div className="image-gallery-grid">
        {images.map((image, index) => (
          <Motion.div
            key={image.id}
            className="gallery-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.4
            }}
            viewport={{ once: false, amount: 0.2 }}
            onClick={() => handleImageClick(image)}
          >
            <div className="gallery-image-container">
              <img
                src={image.thumbnail}
                alt={image.title}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <h4 className="overlay-title">{image.title}</h4>
                  <p className="overlay-category">{image.category}</p>
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <>
            {/* Backdrop */}
            <Motion.div
              className="gallery-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleClose}
            />

            {/* Modal Content */}
            <Motion.div
              className="gallery-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <Motion.button
                className="gallery-close-button"
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} />
              </Motion.button>

              {/* Image Container */}
              <div className="gallery-modal-content">
                <Motion.img
                  key={selectedImage.id}
                  src={selectedImage.fullsize}
                  alt={selectedImage.title}
                  className="gallery-modal-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Image Info */}
                <div className="gallery-modal-info">
                  <h3 className="modal-title">{selectedImage.title}</h3>
                  <p className="modal-description">{selectedImage.description}</p>
                  <span className="modal-category">{selectedImage.category}</span>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="gallery-navigation">
                <Motion.button
                  className="nav-button nav-previous"
                  onClick={handlePrevious}
                  disabled={images.findIndex(img => img.id === selectedImage.id) === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ←
                </Motion.button>

                <span className="nav-counter">
                  {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
                </span>

                <Motion.button
                  className="nav-button nav-next"
                  onClick={handleNext}
                  disabled={images.findIndex(img => img.id === selectedImage.id) === images.length - 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  →
                </Motion.button>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;