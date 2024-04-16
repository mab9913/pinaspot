import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import DataTable from './DataTable';
import MapAndEdit from '.MapandEdit';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [personalData, setPersonalData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/all-personal-data`, { withCredentials: true })
      .then(response => {
        setPersonalData(response.data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);
  
  const handleRowSelect = (rowIndex) => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter(i => i !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };

  const handleLocationSelect = (lat, lng) => {
    if (selectedRows.length === 0) {
      alert("Por favor, selecciona al menos una fila antes de elegir una ubicación.");
      return;
    }

    const updatedData = [...personalData];
    const currentRow = selectedRows[currentLocationIndex];
    updatedData[currentRow] = { ...updatedData[currentRow], latitud: lat, longitud: lng };
    setPersonalData(updatedData);

    if (currentLocationIndex < selectedRows.length - 1) {
      setCurrentLocationIndex(currentLocationIndex + 1);
    } else {
      setCurrentLocationIndex(0);
    }
  };

  const handleOpenMapClick = () => {
    setIsMapOpen(true);
  };
  
  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  const handleUpdateData = async () => {
    if (selectedRows.length === 0) {
      alert("No hay registros seleccionados para actualizar.");
      return;
    }

    try {
      await Promise.all(selectedRows.map(async (rowIndex) => {
        const person = personalData[rowIndex];
        console.log('Enviando datos para actualizar:', person);

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/update-personal-data/${person.id}`, {
          latitud: person.latitud,
          longitud: person.longitud
        }, { withCredentials: true });

        if (response.status !== 200) {
          throw new Error(`Error al actualizar el registro con ID ${person.id}`);
        }
      }));

      alert("Los registros seleccionados han sido actualizados exitosamente.");
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar los datos. Verifica la consola para más detalles.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const displayedData = personalData;

  return (
    <div className="dashboard">
      <div className='dashboard-header'>
<<<<<<< HEAD
        <h1>Datos Personales</h1>
        <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <DataTable 
        data={displayedData}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
      />

      <MapAndEdit 
        isMapOpen={isMapOpen}
        onLocationSelect={handleLocationSelect}
        data={personalData}
        selectedRows={selectedRows}
        handleOpenMapClick={handleOpenMapClick}
        handleCloseMap={handleCloseMap}
        handleUpdateData={handleUpdateData}
      />
=======
        <h1>Pin a Spot</h1>
        <h1>Make data geospatial </h1>
        <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="map-container">
        <MapView 
          isMapOpen={isMapOpen}
          onLocationSelect={handleLocationSelect}
          luminariesData={luminariesData}
          selectedRows={selectedRows}
          style={{width: '100%', height: '300px', border: '1px solid #ccc' }}
        />
        <button onClick={handleOpenMapClick}>Edit mode</button>
        <button onClick={handleCloseMap}>End edit mode</button>
        <button onClick={handleUpdateData}>Send</button>
        {/* <button onClick={toggleShowAll}>{showAll ? 'Mostrar solo pendientes' : 'Mostrar todos'}</button> */}
      </div>
      {/* <button className='guide-button' onClick={toggleGuide}>Guía de Coordenadas</button> */}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>id</th>
            <th>inv_ref</th>
            <th>Point objetc</th>
            <th>Modelo</th>
            <th>layer</th>
            <th>project</th>
            <th>level</th>
            <th>type</th>
            <th>street</th>
          
            <th>lat</th>
            <th>long</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((luminary, index) => (
            <tr key={luminary.id} className={selectedRows.includes(index) ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleRowSelect(index)}
                  checked={selectedRows.includes(index)}
                />
              </td>
              <td>{luminary.id}</td>
              <td>{luminary['ID PTO DE LUZ']}</td>
              <td>{luminary['LUMINARIA ACTUAL']}</td>
              <td>{luminary.lum_model}</td>
              <td>{luminary['POT FUTURA']}</td>
              <td>{luminary['C.M. Nuevo']}</td>
              <td>{luminary.SOPORTE}</td>
              <td>{luminary.CALLE}</td>
              <td>{luminary.ALTURA}</td>
              <td>{luminary.latitud}</td>
              <td>{luminary.longitud}</td>
            </tr>
          ))}
        </tbody>
      </table>
>>>>>>> 495fe28535303067123d666d29334eb5ed833306
    </div>
  );
};

export default Dashboard;
