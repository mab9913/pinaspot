import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import axios from 'axios';
import { EditableCell } from './EditableCell';
import './animations.css'; // Asegúrate de que la ruta sea correcta


import CheckIcon from '@mui/icons-material/Check'; 

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.dark,
      textTransform: 'uppercase',
      padding: '12px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    },
    '& tbody td': {
      fontWeight: '400',
      color: theme.palette.text.primary,
      padding: '8px',
      fontSize: '0.875rem',
    },
    '& tbody tr': {
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  button: {
    margin: '10px',
    padding: '6px 12px',
    fontSize: '0.875rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  saveSuccess: {
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    '& .MuiPaginationItem-root': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));








const DataTable = ({ data, updateMyData, isTableVisible,setIsTableVisible }) => {
  const classes = useStyles();
  const [saving, setSaving] = useState({});
  const [saveSuccess, setSaveSuccess] = useState({}); // Inicialmente un objeto vacío




  const columns = useMemo(() => [

    {
      Header: 'Ruta',       //name on dashboard -react app
      accessor: 'ruta_id', // name on postgres table
    },
    {
      Header: 'Sortida',
      accessor: 'sortida', 
    },
    {
      Header: 'Codi Producció',
      accessor: 'codi_producc', 
    },
    {
      Header: 'OK',
      accessor: 'ok',
      // Editable column, so Editable cell
      Cell: (props) => (
        <EditableCell {...props} updateMyData={updateMyData} />
      ),
    },
    {
      Header: 'Observación',
      accessor: 'observacio',
      // Editable column, so Editable cell
      Cell: (props) => (
        <EditableCell {...props} updateMyData={updateMyData} />
      ),
    },
    // if other columns nedeed , add here
  ], [updateMyData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );
  // const handleSave = async (rowId, updatedRowData) => {
  //   setSaving(prev => ({ ...prev, [rowId]: true }));
  //   try {
  //     const response = await axios.put(`http://localhost:9000/api/data/${rowId}`, updatedRowData);
  //     // Actualizar estado de guardado exitoso para la fila específica
  //     setSaveSuccess(prev => ({ ...prev, [rowId]: true }));
  //     setTimeout(() => setSaveSuccess(prev => ({ ...prev, [rowId]: false })), 3000);
  //   } catch (error) {
  //     console.error('Error al guardar los datos:', error);
  //     setSaveSuccess(prev => ({ ...prev, [rowId]: false }));
  //   }
  //   setSaving(prev => ({ ...prev, [rowId]: false }));
  // };
  

  const handleSave = async (rowId, updatedRowData) => {
    setSaving(prev => ({ ...prev, [rowId]: true }));
    try {
      const response = await axios.put(`http://localhost:9000/api/data/${rowId}`, updatedRowData);
      // Actualizar estado de guardado exitoso para la fila específica
      setSaveSuccess(prev => ({ ...prev, [rowId]: true }));
      setTimeout(() => setSaveSuccess(prev => ({ ...prev, [rowId]: false })), 3000);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setSaveSuccess(prev => ({ ...prev, [rowId]: false }));
    }
    setSaving(prev => ({ ...prev, [rowId]: false }));
  };
  
  // Estado para controlar la visibilidad de la tabla
  // const [isTableVisible, setIsTableVisible] = useState(true);

  // // Función para alternar la visibilidad de la tabla
  //  const toggleTableVisibility = () => {
  //  setIsTableVisible(!isTableVisible);
  //  };

   // Estilos para el mapa

// Estilos para la animación de la tabla
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Centra el botón horizontalmente
};

const tableStyle = {
  transform: isTableVisible ? 'translateY(0)' : 'translateY(-100%)',
  opacity: isTableVisible ? 1 : 0,
  transition: 'opacity 300ms ease-out, opacity 300ms ease-out',
  maxHeight: isTableVisible ? '600px' : '0', // Ajusta según sea necesario
  overflow: 'hidden',
  // ... otros estilos que necesites
};

  


  return (

      <>
        <div style={containerStyle}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsTableVisible(!isTableVisible)}
            className={classes.button}
          >
            {isTableVisible ? 'Esconder Tabla' : 'Mostrar Tabla'}
          </Button>
        </div>
        <TableContainer
          component={Paper}
          className={classes.container}
          style={tableStyle}
        >
          <Table {...getTableProps()} className={classes.table}>
            <TableHead>
              {/* ... Código para el encabezado de la tabla */}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                    <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={() => handleSave(row.original.id, row.original)}
                          disabled={!!saving[row.original.id]}
                          className={`${classes.button} ${saveSuccess[row.original.id] ? classes.saveSuccess : ''}`}
                        >
                          {saving[row.original.id] ? 'Guardando...' : 'Guardar'}
                        </Button>

                        {saveSuccess[row.original.id] && (
                          <span style={{ marginLeft: '10px', color: 'green', fontWeight: 'bold' }}>
                            Guardado Exitoso
                          </span>
                        )}
                      </div>




                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.pagination}>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'< Anterior'}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'Siguiente >'}
          </Button>
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>
          </span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };
export default DataTable;
