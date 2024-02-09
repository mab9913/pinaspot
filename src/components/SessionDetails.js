// SessionDetails.js
import React from 'react';


const SessionDetails = ({ username, loginTime }) => {
  return (
    <div className="session-details">
      <p>Usuario: {username}</p>
      <p>Hora de Inicio: {loginTime}</p>
    </div>
  );
};

export default SessionDetails;
