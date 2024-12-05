// Importation des modules nécessaires
require('dotenv').config();  // Charger les variables d'environnement
const express = require('express');  // Framework Express pour Node.js
const cors = require('cors');  // Middleware pour gérer CORS
const app = express();  // Création de l'application Express

// Déclaration des options CORS
const corsOptions = {
    origin: 'http://localhost:3000', // URL de ton frontend
    methods: ['GET', 'POST'], // Méthodes que tu veux autoriser
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

// Utilisation du middleware CORS avec les options définies
app.use(cors(corsOptions));

// Middleware pour analyser le JSON dans les requêtes
app.use(express.json());

// Importer les routes du fichier clients
const clientRoutes = require('./routes/clients');
app.use('/api/clients', clientRoutes);

// Définir une route pour la page d'accueil du backend
app.get('/', (req, res) => {
    res.send('Serveur backend fonctionnel !');
});

// Lancer le serveur sur le port spécifié dans le fichier .env ou le port 5000 par défaut
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
