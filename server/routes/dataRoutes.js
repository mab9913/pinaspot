// // server/routes/dataRoutes.js

// const express = require('express');
// const { Pool } = require('pg');
// const router = express.Router();

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   searchPath:['rutas_test'],
// });

// router.get('/data', async (req, res) => {
//   try {
//     const queryResult = await pool.query('SELECT quadre_maniobrea, utm_x, utm_y, sortida, model_proposat_replantejament, codi_producc, inclinacio, ok, observacio, ruta, geom, id FROM rutas_test.users');
//     res.json(queryResult.rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
