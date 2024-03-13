import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// No es necesario definir markerIcon si se usará únicamente createCustomMarkerIcon para todos los marcadores

// Función para crear un marcador personalizado con una etiqueta permanente que muestra el ID
const createCustomMarkerIcon = (labelText) => {
  return L.divIcon({
    html: `<div style="background-color: white; padding: 5px; border-radius: 5px; box-shadow: 1px 1px 5px rgba(0,0,0,0.5);">${labelText}</div>`,
    className: 'custom-div-icon',
    iconSize: [30, 42], // Ajusta el tamaño según sea necesario
    iconAnchor: [15, 42], // Asegura que el icono se ancle correctamente
    popupAnchor: [0, -42], // Ajusta la posición del popup si es necesario
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
            icon={createCustomMarkerIcon(luminary.id.toString())} // Usa la función para el ID como etiqueta permanente
          >
            <Popup>
              {/* Personaliza el contenido del pop-up para mostrar la latitud y longitud */}
              Latitud: {luminary.latitud}<br />
              Longitud: {luminary.longitud}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;


