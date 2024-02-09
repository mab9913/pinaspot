const { Pool } = require('pg');

// Crear una instancia de Pool con tus credenciales de base de datos
const pool = new Pool({
  user: 'tu_usuario',
  host: 'tu_host',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

// Controlador para obtener las luminarias
const getLuminarias = async (req, res) => {
  try {
    const queryResult = await pool.query('SELECT * FROM nuevas_luminarias.Villarobledo_nuevas_no_coordenadas');
    res.json(queryResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos de la base de datos');
  }
};

module.exports = {
  getLuminarias,
};
