import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackAssistanceRequest = () => {
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssistanceRequests = async () => {
      try {
        const res = await axios.get('/api/assistance-requests');
        setAssistanceRequests(res.data);
      } catch (err) {
        setError('Error fetching assistance requests');
      }
    };

    fetchAssistanceRequests();
  }, []);

  return (
    <div>
      <h2>Track Assistance Requests</h2>
      {error && <p>{error}</p>}
      <ul>
        {assistanceRequests.map((request) => (
          <li key={request._id}>
            <strong>Status:</strong> {request.status}<br />
            <strong>Breakdown Incident:</strong> {request.breakdownIncident}<br />
            <strong>Service Provider:</strong> {request.serviceProvider}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackAssistanceRequest;
