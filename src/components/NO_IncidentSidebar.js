import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateIncident from './CreateIncident';
import PendingIncidents from './PendingIncidents'; // Asumiendo que tienes este componente
import ResolvedIncidents from './ResolvedIncidents'; // Asumiendo que tienes este componente
import './SidebarMenu.css'; // Asegúrate de tener los estilos correctos para el menú

const IncidentSidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <h2>Incidencias</h2>
        <ul>
          <li>
            <Link to="/nueva-incidencia">Nueva Incidencia</Link>
          </li>
          <li>
            <Link to="/incidencias-pendientes">Incidencias pendientes</Link>
          </li>
          <li>
            <Link to="/incidencias-desestimadas">Incidencias desestimadas</Link>
          </li>
          <li>
            <Link to="/incidencias-solucionadas">Incidencias solucionadas / Partes</Link>
          </li>
          {/* ...otros enlaces del menú... */}
        </ul>
      </div>
      <div className="sidebar-content">
        <Routes>
          <Route path="/nueva-incidencia" element={<CreateIncident />} />
          <Route path="/incidencias-pendientes" element={<PendingIncidents />} />
          <Route path="/incidencias-desestimadas" element={<div>Incidencias desestimadas</div>} />
          <Route path="/incidencias-solucionadas" element={<ResolvedIncidents />} />
          {/* ...otras rutas para los componentes correspondientes... */}
        </Routes>
      </div>
    </div>
  );
};

export default IncidentSidebar;
