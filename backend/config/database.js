const { Sequelize } = require('sequelize');

// SQLite-Verbindung einrichten
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite'
});

module.exports = sequelize;