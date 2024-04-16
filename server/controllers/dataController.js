const pool = require('../config/dbConfig');

// Obtener todos los datos personales
exports.getAllPersonalData = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    console.log("Conexión a la base de datos establecida.");
    const queryText = `
      SELECT *
      FROM argentincas_sc.datos_personales;
    `;

    console.log("Ejecutando consulta:", queryText);
    const result = await client.query(queryText);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los datos personales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (client) client.release();
  }
};

// Actualizar datos personales por ID
exports.updatePersonalDataById = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const {
      foto,
      nombre,
      apellido,
      instagram,
      ocupacion,
      linkedin,
      edad,
      fecha_nacimiento,
      llegada_sant_cugat,
      ciudad_previa,
      localidad_argentina,
      hobbies,
      marido_nombre,
      marido_ocupacion,
      marido_interes,
      hijo1_nombre,
      hijo1_edad,
      hijo1_colegio,
      hijo2_nombre,
      hijo2_edad,
      hijo2_colegio,
      hijo3_nombre,
      hijo3_edad,
      hijo3_colegio,
      hijo4_nombre,
      hijo4_edad,
      hijo4_colegio
    } = req.body;

    const updateQuery = `
      UPDATE argentincas_sc.datos_personales
      SET 
        foto = $1,
        nombre = $2,
        apellido = $3,
        instagram = $4,
        ocupacion = $5,
        linkedin = $6,
        edad = $7,
        fecha_nacimiento = $8,
        llegada_sant_cugat = $9,
        ciudad_previa = $10,
        localidad_argentina = $11,
        hobbies = $12,
        marido_nombre = $13,
        marido_ocupacion = $14,
        marido_interes = $15,
        hijo1_nombre = $16,
        hijo1_edad = $17,
        hijo1_colegio = $18,
        hijo2_nombre = $19,
        hijo2_edad = $20,
        hijo2_colegio = $21,
        hijo3_nombre = $22,
        hijo3_edad = $23,
        hijo3_colegio = $24,
        hijo4_nombre = $25,
        hijo4_edad = $26,
        hijo4_colegio = $27
      WHERE id = $28
      RETURNING *;
    `;

    const values = [
      foto,
      nombre,
      apellido,
      instagram,
      ocupacion,
      linkedin,
      edad,
      fecha_nacimiento,
      llegada_sant_cugat,
      ciudad_previa,
      localidad_argentina,
      hobbies,
      marido_nombre,
      marido_ocupacion,
      marido_interes,
      hijo1_nombre,
      hijo1_edad,
      hijo1_colegio,
      hijo2_nombre,
      hijo2_edad,
      hijo2_colegio,
      hijo3_nombre,
      hijo3_edad,
      hijo3_colegio,
      hijo4_nombre,
      hijo4_edad,
      hijo4_colegio,
      id
    ];

    const result = await client.query(updateQuery, values);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Datos personales no encontrados' });
    }
  } catch (error) {
    console.error('Error al actualizar los datos personales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (client) client.release();
  }
};
