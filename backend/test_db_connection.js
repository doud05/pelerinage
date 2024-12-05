require('dotenv').config();  // Charger les variables d'environnement
const { Pool } = require('pg');  // Importer Pool depuis pg

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }  // SSL optionnel
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erreur de connexion à la base de données', err.stack);
  } else {
    console.log('Connexion à la base de données réussie');
  }
  if (release) release();
  pool.end(); // Ferme le pool après le test
});
