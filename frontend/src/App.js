import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // Déclaration des états pour les clients, le chargement, et les erreurs
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Utilisation de useEffect pour faire l'appel API lors du montage du composant
    useEffect(() => {
        console.log('Tentative de récupération des clients...');
        
        // Utilisation de fetch ou axios pour faire la requête GET
        fetch('http://localhost:5000/api/clients')
            .then((response) => {
                console.log('Réponse reçue:', response);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des clients');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Données reçues:', data);
                setClients(data); // Mise à jour de l'état clients avec les données reçues
                setLoading(false); // Arrêt du chargement
            })
            .catch((error) => {
                console.error('Erreur :', error);
                setError('Erreur lors de la récupération des clients');
                setLoading(false);
            });
    }, []);

    // Affichage pendant le chargement
    if (loading) {
        return <div>Chargement des données...</div>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <div>{error}</div>;
    }

    // Affichage des données des clients lorsque tout est prêt
    return (
        <div className="App">
            <h1>Liste des Clients</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.titre} {client.nom} {client.prenom}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

