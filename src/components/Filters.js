import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Filters = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    ok: '',
    observacio: '',
    // ere we add the field for filter
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
      <FormControl variant="outlined">
        <InputLabel id="filter-ok-label">OK</InputLabel>
        <Select
          labelId="filter-ok-label"
          name="ok"
          value={localFilters.ok}
          onChange={handleChange}
          label="OK"
        >
          <MenuItem value=""><em>Ninguno</em></MenuItem>
          <MenuItem value="Si">Sí</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name="observacio"
        label="Observación"
        variant="outlined"
        value={localFilters.observacio}
        onChange={handleChange}
      />

      {/* Agrega aquí más controles de filtro para otras columnas si es necesario */}

      <Button variant="contained" onClick={applyFilters}>
        Aplicar Filtros
      </Button>
    </Box>
  );
};

export default Filters;
