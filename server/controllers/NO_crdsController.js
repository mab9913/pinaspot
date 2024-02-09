// Controlador para actualizar coordenadas
exports.updateCoordinates = async (req, res) => {
    const { latitud, longitud } = req.body;
    const query = 'UPDATE nuevas_luminarias.villarobledo_nuevas_no_coordenadas SET ubicacion = ST_SetSRID(ST_MakePoint($1, $2), 4326) WHERE id = $1 RETURNING *';
    const values = [parseFloat(longitud), parseFloat(latitud), req.params.id]; // Asegúrate de pasar el ID adecuado desde la solicitud
  
    try {
      // Ejecuta la consulta SQL para actualizar las coordenadas como geometría
      const result = await pool.query(query, values);
      console.log("Coordenadas actualizadas en la base de datos:", result.rows[0]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar coordenadas en la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  