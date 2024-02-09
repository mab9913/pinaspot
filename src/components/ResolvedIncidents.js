import React, { useState, useEffect } from 'react';

const ResolvedIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState('resuelta'); // Asumiendo que este filtro se usará en el futuro

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Asegúrate de que la URL coincida con el endpoint de tu servidor para incidencias resueltas
        const response = await fetch('http://localhost:9000/data'); 

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error("Error al cargar las incidencias:", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    fetchIncidents();
  }, [filter]);

  return (
    <div>
      <h2>Incidencias Resueltas</h2>
      {/* Aquí puedes implementar controles de filtrado basados en 'filter', si es necesario */}
      {incidents.map((incident) => (
        <div key={incident.id}>
          <p>{incident.descripcion}</p>
          {/* Aquí puedes añadir más detalles de cada incidencia */}
        </div>
      ))}
    </div>
  );
};

export default ResolvedIncidents;
