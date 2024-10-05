import React from 'react';
import { useDocumentInfo } from 'payload/components/utilities';

const CustomErrorDisplay: React.FC = () => {
  const { errors } = useDocumentInfo();

  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div style={{ 
      backgroundColor: '#ffebee', 
      border: '1px solid #ef5350', 
      borderRadius: '4px', 
      padding: '10px', 
      margin: '10px 0' 
    }}>
      <h3 style={{ color: '#c62828', marginTop: 0 }}>Please correct the following errors:</h3>
      <ul style={{ color: '#c62828', marginBottom: 0 }}>
        {Object.entries(errors).map(([key, value]) => (
          <li key={key}>{value as React.ReactNode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomErrorDisplay;