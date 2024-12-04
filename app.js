// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de PostgreSQL (variables d'environnement)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json()); // Pour traiter les requêtes avec du JSON

// Test de connexion à la base de données
pool.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données', err);
  } else {
    console.log('Connecté à la base de données PostgreSQL');
  }
});

// Route de base pour vérifier l'état de l'API
app.get('/', (req, res) => {
  res.send('Bienvenue sur Pelerinage!');
});

// Exemple d'API pour enregistrer un nouvel utilisateur
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hachage du mot de passe avant l'insertion dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).send('Erreur du serveur');
  }
});

// Exemple d'API pour authentifier un utilisateur
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Génération d'un token JWT pour authentification
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } else {
      res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    res.status(500).send('Erreur du serveur');
  }
});

// Serveur en écoute sur le port configuré
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
