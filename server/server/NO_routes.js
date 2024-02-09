const express = require('express');
const dataController = require('../controllers/dataController');
const authController = require('../controllers/authController');
const router = express.Router();

// Middleware para verificar la autenticación
const isAuthenticated = (req, res, next) => {
    if (req.session.userId && req.session.userSchemaName) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Ruta de login
router.post('/login', authController.login);

// Rutas protegidas por autenticación
router.use(isAuthenticated);

// Obtener luminarias nuevas sin coordenadas
router.get('/new-luminaries', dataController.getNewLuminaries);

// Actualizar la ubicación de una luminaria
router.put('/update-luminaries/:id', dataController.updateLuminary);

// ... otras definiciones de rutas ...

module.exports = router;
