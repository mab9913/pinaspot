// MapView.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const markerIcon = new L.Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView = ({ isMapOpen, onLocationSelect, luminariesData }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      if (!isMapOpen) return; // Ignorar clics si la edición está cerrada

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
            icon={markerIcon} 
          />
        )
      ))}
    </MapContainer>
  );
};

export default MapView;
