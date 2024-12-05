const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER, // Par exemple : 'doud'
    host: process.env.DB_HOST, // Par exemple : 'le455538-001.eu.clouddb.ovh.net'
    database: process.env.DB_NAME, // Par exemple : 'pelerinages-db'
    password: process.env.DB_PASSWORD, // Mot de passe de l'utilisateur PostgreSQL
    port: process.env.DB_PORT, // Par exemple : 35439
    ssl: { rejectUnauthorized: false } // Ajouter cette ligne si SSL est nécessaire
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
