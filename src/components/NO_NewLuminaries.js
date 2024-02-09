// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Asegúrate de tener axios instalado

// const NewLuminaries = () => {
//   const [luminaries, setLuminaries] = useState([]);

// // En NewLuminaries.js

// useEffect(() => {
//     axios.get('http://localhost:9000/new-luminaries') // Asegúrate de que esta ruta coincida con la configuración de tu servidor
//       .then((response) => {
//         setLuminaries(response.data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener los datos de luminarias:', error);
//       });
//   }, []);
  

//   return (
//     <div>
//     <h2>Datos de Nuevas Luminarias</h2>
//     <table>
//       <thead>
//         <tr>
//           <th>ID PTO DE LUZ</th>
//           <th>LUMINARIA ACTUAL</th>
//           <th>Modelo de Luminaria</th>
//           <th>POT FUTURA</th>
//           <th>C.M. Nuevo</th>
//           <th>Soporte</th>
//           <th>Marca de Soporte</th>
//           <th>Vía</th>
//           <th>Calle</th>
//           <th>Altura</th>
//         </tr>
//       </thead>
//       <tbody>
//         {luminaries.map((luminary, index) => (
//           <tr key={index}> {/* Cambiado a index como clave si "ID PTO DE LUZ" es null */}
//             <td>{luminary['ID PTO DE LUZ']}</td>
//             <td>{luminary['LUMINARIA ACTUAL']}</td>
//             <td>{luminary.lum_model}</td>
//             <td>{luminary['POT FUTURA']}</td>
//             <td>{luminary['C.M. Nuevo']}</td>
//             <td>{luminary.SOPORTE}</td>
//             <td>{luminary['MARCA SOPORTE']}</td>
//             <td>{luminary.VIA}</td>
//             <td>{luminary.CALLE}</td>
//             <td>{luminary.ALTURA}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>

//   );
// };

// export default NewLuminaries;
