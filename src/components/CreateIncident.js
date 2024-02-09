import React, { useState, useEffect } from 'react';

const CreateIncident = ({ onLocationSelect, location }) => {
  const [puntos, setPuntos] = useState([]);

  // Actualiza la lista de puntos cuando se selecciona una ubicación en el mapa
  useEffect(() => {
    if (location) {
      setPuntos(puntosActuales => [...puntosActuales, location]);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar los puntos a un servidor o manejarlos internamente
    console.log("Puntos a enviar:", puntos);
  };

  return (
    <div>
      <h2>Agregar Puntos</h2>
      <button onClick={handleSubmit}>Enviar Puntos</button>
      {puntos.length > 0 && (
        <div>
          <h3>Puntos Agregados:</h3>
          <table>
            <thead>
              <tr>
                <th>Latitud</th>
                <th>Longitud</th>
              </tr>
            </thead>
            <tbody>
              {puntos.map((punto, index) => (
                <tr key={index}>
                  <td>{punto.lat.toFixed(3)}</td>
                  <td>{punto.lng.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CreateIncident;
