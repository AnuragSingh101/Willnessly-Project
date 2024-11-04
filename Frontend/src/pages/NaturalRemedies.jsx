import React, { useState } from 'react';

const NaturalRemedies = () => {
  const [symptom, setSymptom] = useState('');
  const [remedies, setRemedies] = useState([]);

  // Sample remedies data
  const remediesData = {
    headache: ['Drink plenty of water', 'Rest in a dark room', 'Apply a cold compress'],
    cold: ['Drink warm fluids', 'Use steam inhalation', 'Ginger tea with honey'],
    stomachache: ['Peppermint tea', 'Ginger ale', 'Warm compress'],
    fatigue: ['Stay hydrated', 'Take short breaks', 'Get a good night’s sleep'],
  };

  const handleSearch = () => {
    const foundRemedies = remediesData[symptom.toLowerCase()] || [];
    setRemedies(foundRemedies);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Natural Remedies</h2>
      <input
        type="text"
        placeholder="Enter your symptom"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Find Remedies</button>

      <p id="symptom-text" style={styles.symptomText}>
        {symptom ? `Remedies for: ${symptom}` : ''}
      </p>

      <div id="remedies-output">
        {remedies.map((remedy, index) => (
          <div key={index} className="remedy-box" style={styles.remedyBox}>
            {remedy}
          </div>
        ))}
        {remedies.length === 0 && symptom && (
          <div className="remedy-box" style={styles.remedyBox}>
            No remedies found for {symptom}.
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
  },
  input: {
    fontSize: '16px',
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  symptomText: {
    fontSize: '18px',
    color: '#555',
    marginTop: '15px',
  },
  remedyBox: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default NaturalRemedies;
