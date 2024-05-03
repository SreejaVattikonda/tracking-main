import React, { useState } from 'react';
import axios from 'axios';

const FindNearbyServiceProviders = () => {
  const [userLocation, setUserLocation] = useState('');
  const [nearbyProviders, setNearbyProviders] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/serviceproviders/${userLocation}`);
      setNearbyProviders(res.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Find Nearby Service Providers</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userLocation">Enter Your Location:</label>
        <input
          type="text"
          id="userLocation"
          value={userLocation}
          onChange={handleChange}
          required
        />
        <button type="submit">Find Providers</button>
      </form>
      {error && <p>{error}</p>}
      {nearbyProviders.length > 0 && (
        <div>
          <h3>Nearby Service Providers:</h3>
          <ul>
            {nearbyProviders.map((provider) => (
              <li key={provider._id}>
                {provider.name} - {provider.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindNearbyServiceProviders;
