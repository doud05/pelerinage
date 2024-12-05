const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Route pour récupérer tous les clients
router.get('/', clientController.getAllClients);

module.exports = router;

// Route pour obtenir un client par ID
router.get('/:id', clientController.getClientById);

// Route pour ajouter un nouveau client
router.post('/', clientController.createClient);

// Route pour mettre à jour un client par ID
router.put('/:id', clientController.updateClient);

// Route pour supprimer un client par ID
router.delete('/:id', clientController.deleteClient);

module.exports = router;
