import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Función para crear un icono de marcador personalizado con un símbolo y una etiqueta
const createCustomMarkerIcon = (labelText) => {
  return L.divIcon({
    html: `
      <div style="position: relative; text-align: center;">
        <div style="color: black; position: absolute; width: 100%; top: -25px; left: 0;">${labelText}</div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="fill: #3388ff; width: 24px; height: 24px;">
          <circle cx="50" cy="50" r="40"/>
        </svg>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: L.point(30, 42),
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
        luminary.latitud !== null && luminary.longitud !== null ? (
          <Marker 
            key={index} 
            position={[luminary.latitud, luminary.longitud]} 
            icon={createCustomMarkerIcon(luminary.id.toString())} // Usa la función modificada para el marcador
          >
            <Popup>
              Latitud: {luminary.latitud}<br />
              Longitud: {luminary.longitud}
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapView;



