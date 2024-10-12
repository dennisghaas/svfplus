const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./api/userRoutes');
const eventRoutes = require('./api/eventRoutes');
const eventResponseRoutes = require('./api/eventResponseRoutes');
const standingOrdersRoutes = require('./api/standingOrdersRoutes');
const blockedUsersRoutes = require('./api/blockedUserRoutes');

const app = express();

// Middleware, um JSON-Daten zu parsen
app.use(express.json());

// Konfiguriere CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routen verwenden
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-responses', eventResponseRoutes);
app.use('/api/standing-orders', standingOrdersRoutes);
app.use('/api/blocked-users', blockedUsersRoutes);

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Datenbank synchronisiert');

        // Server starten
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('Access-Control-Allow-Origin:', process.env.CORS_ORIGIN);
            console.log(`Server läuft auf Port ${PORT}`);
        });
    })
    .catch(err => console.error('Fehler beim Synchronisieren der Datenbank:', err));

// Exportiere die App für Vercel
module.exports = async (req, res) => {
    await syncDatabase(); // Synchronisiere die DB beim ersten Aufruf
    return app(req, res); // Leitet die Anfrage an die Express-App weiter
};