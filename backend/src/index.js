require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const clientRoutes = require('./routes/clients');
app.use('/api/clients', clientRoutes);

app.get('/', (req, res) => {
    res.send('Serveur backend fonctionnel !');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
