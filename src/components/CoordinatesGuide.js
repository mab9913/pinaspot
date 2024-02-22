import React from 'react';

const CoordinatesGuide = () => {
  return (
    <div className="coordinates-guide">
      <h2>Guía de Asignación de Coordenadas</h2>
      <p>Este manual ofrece una guía paso a paso para asignar y modificar las coordenadas de las luminarias en el Dashboard de Nuevos Puntos Villarobledo.</p>
      
      <h3>Asignación de Coordenadas</h3>
      <ol>
        <li><strong>Selección de Filas:</strong> Marque las casillas en las filas de la tabla para seleccionar las luminarias que desea actualizar. Puede seleccionar una o varias filas.</li>
        <li><strong>Apertura del Mapa:</strong> Haga clic en el botón "Abrir Edición" para mostrar el mapa. En este mapa, podrá seleccionar las coordenadas para las luminarias.</li>
        <li><strong>Elegir Coordenadas en el Mapa:</strong> Haga clic en el mapa para seleccionar la ubicación deseada. Las coordenadas de latitud y longitud de esta ubicación se asignarán a la primera luminaria seleccionada.</li>
        <li><strong>Asignación Sucesiva:</strong> Si seleccionó múltiples luminarias, la aplicación asignará las coordenadas de manera sucesiva a cada una de ellas, en el orden en que fueron seleccionadas.</li>
      </ol>

      <h3>Modificación de Coordenadas</h3>
      <ol>
        <li><strong>Selección Individual:</strong> Para modificar las coordenadas de una luminaria específica, seleccione únicamente esa fila en la tabla.</li>
        <li><strong>Modificación en el Mapa:</strong> Con la fila seleccionada, abra el mapa y elija la nueva ubicación. Esto actualizará las coordenadas de la luminaria seleccionada.</li>
      </ol>

      <p>Recuerde que es importante seleccionar correctamente las luminarias antes de proceder a la asignación o modificación de las coordenadas para garantizar la precisión de los datos en su Dashboard.</p>
    </div>
  );
};

export default CoordinatesGuide;
