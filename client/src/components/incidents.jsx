import React, { useState } from 'react';
import axios from 'axios';

const Incident = () => {
  const [formData, setFormData] = useState({
    location: '',
    vehicleType: '',
    description: ''
  });

  const { location, vehicleType, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/incidents/create', {
        location,
        vehicleType,
        description
      });
      console.log(res.data); // Handle success response
      // You can perform additional actions upon successful incident creation
    } catch (err) {
      console.error(err.response.data); // Handle error response
    }
  };

  return (
    <div>
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={vehicleType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Incident;
