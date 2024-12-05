const db = require('../config/db');

// Obtenir tous les clients
const getAllClients = async (req, res) => {
  try {
    console.log("Tentative de récupération des clients...");
    const result = await db.query('SELECT * FROM clients');
    console.log("Récupération réussie : ", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des clients : ", err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Obtenir un client par ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Client non trouvé');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Créer un nouveau client
const createClient = async (req, res) => {
  try {
    const { nom, prenom, mail, telephone_portable } = req.body;
    const result = await db.query(
      `INSERT INTO clients (nom, prenom, mail, telephone_portable) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nom, prenom, mail, telephone_portable]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Mettre à jour un client par ID
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, mail, telephone_portable } = req.body;
    const result = await db.query(
      `UPDATE clients 
       SET nom = $1, prenom = $2, mail = $3, telephone_portable = $4 
       WHERE id = $5 RETURNING *`,
      [nom, prenom, mail, telephone_portable, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Client non trouvé');
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Supprimer un client par ID
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Client non trouvé');
    }
    res.status(200).send('Client supprimé avec succès');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
