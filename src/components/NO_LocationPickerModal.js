import React, { useRef, useEffect } from 'react';
import { Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationPickerModal = ({ onClose, onLocationSelect }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;

      const handleClick = (e) => {
        // Obtener la latitud y longitud por separado
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        // Llamar a la función con latitud y longitud separados
        onLocationSelect(lat, lng);
      };

      map.on('click', handleClick);

      return () => {
        map.off('click', handleClick);
      };
    }
  }, [onLocationSelect]);

  return (
    <div className="modal">
      <Map ref={mapRef} center={[39.26389, -2.60266]} zoom={13} style={{ height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default LocationPickerModal;
