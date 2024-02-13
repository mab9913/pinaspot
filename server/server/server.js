const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

const app = express();

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: [
                "'self'",
                "https://pinaspot.com",
                "https://www.pinaspot.com", // Permite el dominio con y sin www.
                "wss://pinaspot.com",
                "wss://www.pinaspot.com",
                "https://www.pinaspot.com:9000", // Permite conexiones al puerto 9000
                "https://www.pinaspot.com/login", // Esta línea es redundante si ya permites todo el dominio con la línea de "https://www.pinaspot.com"
            ],
            imgSrc: ["'self'", "data:", "*.tile.openstreetmap.org"],
        },
    })
);


const allowedOrigins = ['https://pinaspot.com', 'http://165.227.226.111:3000', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'La política de CORS para este sitio no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use(express.json());

// Configuración de express-session
app.use(session({
    secret: 'Bonica10_01',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Asegúrate de que las cookies solo se transmitan sobre HTTPS.
        httpOnly: true // Minimiza el riesgo de ataques XSS.
    }
}));

// Middleware isAuthenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        console.log('Usuario no autorizado');
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Rutas de la API
app.post('/login', authController.login);
app.get('/new-luminaries', isAuthenticated, dataController.getNewLuminaries);
app.put('/update-luminaries/:id', isAuthenticated, dataController.updateLuminary);

// Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

// Ruta para manejar solicitudes del cliente de React (SPA)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
