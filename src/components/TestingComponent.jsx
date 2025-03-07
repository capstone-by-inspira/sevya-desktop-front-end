import React, { useState } from 'react';
import axios from 'axios';

const Gemini = () => {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Static patient data for testing
  const staticPatientData = {
    name: "John Doe",
    age: 45,
    gender: "Male",
    medicalHistory: [
      "Hypertension",
      "Type 2 Diabetes",
      "High Cholesterol"
    ],
    symptoms: [
      "Chest pain",
      "Shortness of breath",
      "Fatigue"
    ],
    allergies: [
      "Penicillin",
      "Peanuts"
    ],
    medications: [
      "Lisinopril 10mg",
      "Metformin 500mg"
    ],
    familyHistory: [
      "Heart disease",
      "Stroke"
    ],
    lifestyle: {
      smoking: "Yes",
      alcohol: "Occasional",
      exercise: "Minimal"
    },
    vitalSigns: {
      bloodPressure: "145/90",
      heartRate: 88,
      temperature: "98.6°F"
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the API call to your backend
      const response = await axios.post('http://localhost:8800/api/auth/generate-health-plan', {
        patientData: staticPatientData,
      });

      // Assuming the healthcare plan is in the response's text field
      const generatedPlan = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Failed to generate plan';
      
      // Split the plan into bullet points if it's in a text format
      const planArray = generatedPlan.split('\n').filter(line => line.trim() !== '');
      setPlan(planArray);
    } catch (error) {
      setError('Error generating healthcare plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Healthcare Plan Generator</h1>
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: 10,
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

      {plan && (
        <div style={{ marginTop: 20 }}>
          <h2>Generated Healthcare Plan:</h2>
          <ul>
            {plan.map((item, index) => (
              <li key={index} style={{ fontSize: '1.1em', marginBottom: '10px' }}>
                <strong>{item}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Gemini;
