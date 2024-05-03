import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  const { name, location } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/serviceproviders/create', {
        name,
        location,
      });
      console.log(res.data); // Handle success response
    } catch (err) {
      console.error(err.response.data); // Handle error response
    }
  };

  return (
    <div>
      <h2>Service Provider Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label> 
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
