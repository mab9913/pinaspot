import { Polygon } from 'react-leaflet';
// import L from 'leaflet';
import React from 'react';

const PolygonLayer = ({ polygons }) => {
  if (!polygons || polygons.length === 0) {
    return null;
  }

  return (
    <>
      {polygons.map((polygon, index) => (
        <Polygon
          key={index}
          pathOptions={{ color: 'blue' }} // Configura el color y estilo del polígono
          positions={polygon.coordinates}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
