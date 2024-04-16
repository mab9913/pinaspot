import React from 'react';
import MapView from './MapView';

const MapAndEdit = ({ isMapOpen, onLocationSelect, data, selectedRows, handleOpenMapClick, handleCloseMap, handleUpdateData }) => {
  return (
    <div>
      <div className="map-container">
        <MapView 
          isMapOpen={isMapOpen}
          onLocationSelect={onLocationSelect}
          data={data}
          selectedRows={selectedRows}
          style={{width: '100%', height: '300px', border: '1px solid #ccc' }}
        />
        <button onClick={handleOpenMapClick}>Abrir Edición</button>
        <button onClick={handleCloseMap}>Cerrar Edición</button>
        <button onClick={handleUpdateData}>Actualizar Datos</button>
      </div>
    </div>
  );
};

export default MapAndEdit;
