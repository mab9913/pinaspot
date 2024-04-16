import React from 'react';

const DataTable = ({ data, selectedRows, handleRowSelect }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Seleccionar</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Instagram</th>
          <th>Ocupación</th>
          {/* Agrega aquí el resto de las columnas */}
        </tr>
      </thead>
      <tbody>
        {data.map((person, index) => (
          <tr key={person.id} className={selectedRows.includes(index) ? 'selected-row' : ''}>
            <td>
              <input
                type="checkbox"
                onChange={() => handleRowSelect(index)}
                checked={selectedRows.includes(index)}
              />
            </td>
            <td>{person.id}</td>
            <td>{person.nombre}</td>
            <td>{person.apellido}</td>
            <td>{person.instagram}</td>
            <td>{person.ocupacion}</td>
            {/* Agrega aquí el resto de las columnas */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
