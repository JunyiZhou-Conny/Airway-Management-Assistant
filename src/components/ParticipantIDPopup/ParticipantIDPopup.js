import React, { useState, useEffect } from 'react';

const ParticipantIDPopup = ({ onSubmit, onClose }) => {
  const [participantID, setParticipantID] = useState('');
  const [error, setError] = useState('');

  // Check sessionStorage to avoid showing the popup unnecessarily
  useEffect(() => {
    const storedParticipantID = sessionStorage.getItem('participantID');
    if (storedParticipantID) {
      onSubmit(storedParticipantID); // Automatically submit the stored ID
    }
  }, [onSubmit]);

  const handleSubmit = () => {
    if (participantID.trim()) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/set-participant-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participantID: participantID }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Handle success
          sessionStorage.setItem('participantID', participantID); // Save to sessionStorage
          onSubmit(participantID); // Notify parent component
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setError('Participant ID cannot be empty.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="popup-content">
          <h2>Enter Participant ID</h2>
          <input
            type="text"
            value={participantID}
            onChange={(e) => setParticipantID(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSubmit(); // Allow submitting with Enter key
            }}
          />
          <button onClick={handleSubmit}>Submit</button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ParticipantIDPopup;