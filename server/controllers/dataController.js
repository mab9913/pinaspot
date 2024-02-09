const pool = require('../config/dbConfig');


// Obtener todos los datos de luminarias sin importar las coordenadas
exports.getNewLuminaries = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    console.log("Conexión a la base de datos establecida.");
    const queryText = `
      SELECT id, "ID PTO DE LUZ", "LUMINARIA ACTUAL", lum_model, "POT FUTURA", "C.M. Nuevo", "SOPORTE", "MARCA SOPORTE", "VIA", "CALLE", "ALTURA", latitud, longitud
      FROM nuevas_luminarias.villarobledo_nuevas_no_coordenadas;
    `;

    console.log("Ejecutando consulta:", queryText);
    const result = await client.query(queryText);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los datos de luminarias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (client) client.release();
  }
};


exports.updateLuminary = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const { latitud, longitud } = req.body;

    // Validación de la entrada
    if (typeof latitud !== 'number' || typeof longitud !== 'number') {
      return res.status(400).json({ error: 'Datos de ubicación inválidos o faltantes' });
    }

    const updateQuery = `
  UPDATE nuevas_luminarias.villarobledo_nuevas_no_coordenadas
  SET latitud = $1::double precision, longitud = $2::double precision, ubicacion = ST_SetSRID(ST_MakePoint($2::double precision, $1::double precision), 4326)
  WHERE id = $3
  RETURNING *
  `;

    const values = [latitud, longitud, id];
    
    const result = await client.query(updateQuery, values);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Luminaria no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar los datos de la luminaria:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (client) client.release();
  }
};
