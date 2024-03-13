import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuración del icono del marcador
const markerIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34], // Asegúrate de que la posición del pop-up sea correcta
  shadowSize: [41, 41]
});

// Función para crear un marcador personalizado con una etiqueta permanente
const createCustomMarkerIcon = (labelText) => {
  return L.divIcon({
    html: `<div style="background-color: white; padding: 5px; border-radius: 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.5);">${labelText}</div>`,
    className: 'custom-div-icon',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};

const MapView = ({ isMapOpen, onLocationSelect, luminariesData }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      if (!isMapOpen) return;

      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    };

    map.on('click', handleClick);
    return () => map.off('click', handleClick);
  }, [map, onLocationSelect, isMapOpen]);

  return (
    <MapContainer 
      center={[39.2666978950, -2.602043151]} 
      zoom={13} 
      style={{ height: '500px', width: '100%' }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {luminariesData.map((luminary, index) => (
        luminary.latitud !== null && luminary.longitud !== null && (
          <Marker 
            key={index} 
            position={[luminary.latitud, luminary.longitud]} 
            icon={createCustomMarkerIcon(luminary.id.toString())} // Utiliza la función para crear un icono personalizado con el ID
          >
            <Popup>
              {/* Aquí puedes personalizar el contenido del pop-up para mostrar toda la información de la fila */}
              ID: {luminary.id}<br />
              Ubicación: {luminary.ubicacion || 'No disponible'}<br />
              {/* Añade más campos según sea necesario */}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;

