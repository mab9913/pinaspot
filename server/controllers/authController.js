const pool = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Se requieren nombre de usuario y contraseña.' });
  }

  try {
    const userResult = await pool.query(
      'SELECT username, user_id, password FROM nuevas_luminarias.users WHERE username = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Establecer la propiedad userId en la sesión después de la autenticación exitosa
    req.session.userId = user.user_id;

    res.json({
      success: true,
      message: 'Login exitoso.',
      user: {
        id: user.user_id,
        username: user.username,
      }
    });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
