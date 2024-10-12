const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Lädt Umgebungsvariablen aus der .env-Datei
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routen aus dem API-Verzeichnis einfügen
app.use('/api', require('./api/index'));

// Exportiere die App für Vercel
module.exports = app;