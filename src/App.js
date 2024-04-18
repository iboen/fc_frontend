import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling (create this file in the same directory)

const App = () => {
const [imageUrl, setImageUrl] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const apiUrl = 'https://api.fastcampus-id-test.link/get-image'; // Replace this with your API endpoint

const fetchImage = () => {
    setIsLoading(true);
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        return response.json();
      })
      .then(data => {
        setImageUrl(data.data); // Assuming your API returns the image URL in the 'url' field
      })
      .catch(error => {
        setError('Error fetching image');
        console.error('Error fetching image:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

return (
    <div className="image-container">
      <h1 className="web-title">Image Viewer</h1>
      <button className="fetch-button" onClick={fetchImage} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Image'}
      </button>
      {error && <div className="error-message">{error}</div>}
      {imageUrl && !isLoading && <img className="fetched-image" src={imageUrl} alt="Fetched Image" />}
    </div>
  );
};

export default App;