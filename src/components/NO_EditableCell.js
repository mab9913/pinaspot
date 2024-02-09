import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

export const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  options = {}
}) => {
  // Estado inicial basado en si initialValue está en las opciones
  const [value, setValue] = useState('');

  useEffect(() => {
    // Establecer el valor inicial si está en las opciones, si no, usa un valor vacío
    const validValue = options[id] && options[id].includes(initialValue) ? initialValue : '';
    setValue(validValue);
  }, [initialValue, options, id]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    if (value !== initialValue) {
      updateMyData(index, id, value);
    }
  };

  if (!options[id]) {
    console.error(`Options for '${id}' not provided`);
    return <div>Error: No options provided for this cell.</div>; // Fallback UI
  }

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        displayEmpty
      >
        {options[id].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

EditableCell.propTypes = {
  options: PropTypes.object
};

EditableCell.defaultProps = {
  options: {
    ok: [' ','Si', 'No'],
    observacio: ['','Pendiente', 'Columna Rota', 'Pdll inexistente']
  }
};


// import React, { useState, useEffect } from 'react';
// import { FormControl, Select, MenuItem } from '@mui/material';
// import PropTypes from 'prop-types';

// export const EditableCell = ({
//   value: initialValue,
//   row: { index },
//   column: { id },
//   updateMyData,
//   options = {}, // Default value assignment
// }) => {
//   const [value, setValue] = useState(initialValue != null ? initialValue : '');

//   useEffect(() => {
//     setValue(initialValue != null ? initialValue : '');
//   }, [initialValue]);

//   const onChange = (event) => {
//     setValue(event.target.value);
//   };

//   const onBlur = () => {
//     if (value !== initialValue) {
//       updateMyData(index, id, value);
//     }
//   };

//   if (!options[id]) {
//     console.error(`Options for '${id}' not provided`);
//     return <div>Error: No options provided for this cell.</div>; // Fallback UI
//   }

//   return (
//     <FormControl fullWidth>
//       <Select
//         value={value}
//         onChange={onChange}
//         onBlur={onBlur}
//         displayEmpty
//       >
//         {options[id].map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// EditableCell.propTypes = {
//   options: PropTypes.object
// };

// // This sets the default props for the component
// EditableCell.defaultProps = {
//   options: {
//     ok: ['Si', 'No',''],
//     observacio: ['Pendiente', 'Columna Rota', 'Pdll inexistente','']
//   }
// };
