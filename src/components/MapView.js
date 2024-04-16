import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Función para crear un icono de marcador personalizado con un símbolo de globo de marcador
const createCustomMarkerIcon = () => {
  return L.divIcon({
    html: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="fill: #3388ff; width: 30px; height: 42px;">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
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
            icon={createCustomMarkerIcon()} // Usando el icono personalizado sin etiqueta
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
