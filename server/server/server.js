const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // Ya lo tenías para manejar rutas de archivos
const authController = require('../controllers/authController');
const dataController = require('../controllers/dataController');

const app = express();
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://165.227.226.111:9000", "https://pinaspot.com"], // Asegúrate de agregar aquí todas las URLs externas que tu aplicación necesita contactar
        imgSrc: ["'self'", "data:", "*.tile.openstreetmap.org"],
        // Agrega aquí otras directivas según sea necesario
      },
    })
  );
  

// app.use(helmet());

const allowedOrigins = ['http://165.227.226.111:3000', 'http://localhost:3000'];
app.use(cors({
    origin:'*',
    credentials:true,
}))
// app.use(cors({
//     credentials: true,
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Origen no permitido por CORS'));
//         }
//     }
// }));


app.use(express.json());

// Configuración de express-session
app.use(session({
    secret: 'Bonica10_01', // Reemplaza 'tuSecreto' con una cadena secreta fuerte
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

// Middleware isAuthenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        console.log('Usuario no autorizado'); // Agrega un registro de depuración
        res.status(401).json({ error: 'No autorizado' });
    }
};

// Rutas de la API
app.post('/login', authController.login);
app.get('/new-luminaries', isAuthenticated, dataController.getNewLuminaries);
app.put('/update-luminaries/:id', isAuthenticated, dataController.updateLuminary);

// Ajuste para la ruta de la carpeta build
// Cambio clave: Asume que `server.js` se ejecuta desde el subdirectorio 'server/server' y que la carpeta 'build' está dos niveles arriba
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

// Ruta para manejar solicitudes de cliente de React (SPA)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// // server.js
// const express = require('express');
// const session = require('express-session');
// const cors = require('cors');
// const helmet = require('helmet');
// const authController = require('../controllers/authController');
// const dataController = require('../controllers/dataController');

// const app = express();

// app.use(helmet());

// const allowedOrigins = ['http://139.59.180.29:3000', 'http://localhost:3000'];

// app.use(cors({
//     credentials: true,
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Origen no permitido por CORS'));
//         }
//     }
// }));

  

// app.use(express.json());

// // Configuración de express-session
// app.use(session({
//     secret: 'Bonica10_01', // Reemplaza 'tuSecreto' con una cadena secreta fuerte
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true
//     }
// }));

// // Middleware isAuthenticated
// const isAuthenticated = (req, res, next) => {
//     if (req.session.userId) {
//         next();
//     } else {
//         console.log('Usuario no autorizado'); // Agrega un registro de depuración
//         res.status(401).json({ error: 'No autorizado' });
//     }
// };


// // Rutas
// app.post('/login', authController.login);
// app.get('/new-luminaries', isAuthenticated, dataController.getNewLuminaries);
// app.put('/update-luminaries/:id', isAuthenticated, dataController.updateLuminary);

// // ... otras rutas y configuraciones ...

// const PORT = process.env.PORT || 80;
// app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

