// module.exports = (req, res, next) => {
//   if (req.session.userId && req.session.userRole) {
//     console.log('Acceso autorizado para el usuario:', req.session.userId);
//     next();
//   } else {
//     console.log('Acceso denegado. No hay sesión o falta información de la sesión.');
//     res.status(401).json({ error: 'No autorizado' });
//   }
// };


module.exports = (req, res, next) => {
   console.log('Sesión:', req.session); // Esto te mostrará los detalles de la sesión
   if (req.session.userId) {
     next();
   } else {
     res.status(401).json({ error: 'No autorizado' });
   }
 };
