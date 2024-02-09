import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: require('./map-marker-svgrepo-com.svg'), // Asegúrate de que la ruta sea correcta
  iconRetinaUrl: require('./map-marker-svgrepo-com.svg'),
  shadowUrl: require('./map-marker-svgrepo-com.svg'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default markerIcon;

