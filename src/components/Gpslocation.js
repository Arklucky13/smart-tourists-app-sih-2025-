import React, { useEffect, useState } from 'react';

const LiveLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Send location data to your API
          fetch(`https://your-api-endpoint.com/update-location?lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => console.log('Location updated:', data))
            .catch(error => console.error('Error updating location:', error));
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h3>Live Location</h3>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LiveLocation;
