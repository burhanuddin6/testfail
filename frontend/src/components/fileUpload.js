import React, { useState, useEffect } from 'react';
import '../styles/components/FileUpload.css'; // Import the CSS file

const FileUpload = ({ onFilesChange }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    onFilesChange(images);
  }, [images, onFilesChange]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept="image/*"  // Restrict input to images only
        multiple
        onChange={handleFileChange}
        className="file-upload-input"
      />

      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected ${index}`}
              className="preview-image"
            />
            <button
              type="button"
              className="remove-image-button"
              onClick={() => removeImage(index)}
            >
              ✗
            </button>
          </div>
        ))}
      </div>
      <div className="file-upload-icon" />
      <p className="file-upload-text">
        Drop files here to attach, or click on "+" to browse
      </p>
    </div>
  );
};

export default FileUpload;