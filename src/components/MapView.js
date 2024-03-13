import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa Popup
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

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

const MapView = ({ isMapOpen, onLocationSelect, luminariesData }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      if (!isMapOpen) return; // Ignora clics si la edición está cerrada

      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng); // Callback para manejar la selección de ubicación
    };

    map.on('click', handleClick); // Escucha clics en el mapa
    return () => map.off('click', handleClick); // Limpia el evento al desmontar
  }, [map, onLocationSelect, isMapOpen]);

  return (
    <MapContainer 
      center={[39.2666978950, -2.602043151]} 
      zoom={13} 
      style={{ height: '500px', width: '100%' }}
      whenCreated={setMap} // Establece el objeto mapa en el estado
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
          >
            <Popup>
              {/* Personaliza aquí con la información que quieras mostrar */}
              {`Nombre: ${luminary.name || 'No disponible'}\nID: ${luminary.id || 'No disponible'}`}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;
