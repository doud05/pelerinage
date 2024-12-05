require('dotenv').config();  // Charger les variables d'environnement
const { Pool } = require('pg');  // Importer le Pool de pg

const pool = new Pool({
  user: process.env.DB_USER,         // Utilisateur de la base de données
  host: process.env.DB_HOST,         // Hôte de la base de données
  database: process.env.DB_NAME,     // Nom de la base de données
  password: process.env.DB_PASSWORD, // Mot de passe de la base de données
  port: process.env.DB_PORT,         // Port de la base de données
  ssl: { rejectUnauthorized: false } // Ajouter cette ligne si SSL est nécessaire
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
