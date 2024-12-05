// src/components/ClientList.js
import React, { useEffect, useState } from 'react';

const ClientList = () => {
    const [clients, setClients] = useState([]); // État pour stocker les clients

    useEffect(() => {
        console.log('Tentative de récupération des clients...');
        fetch('http://localhost:5000/api/clients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log('Réponse reçue:', response);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des clients');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Données reçues:', data);
            setClients(data); // Mise à jour de l’état avec les données reçues
        })
        .catch((error) => {
            console.error('Erreur :', error);
        });
    }, []); // Le tableau vide [] indique que cet effet ne doit être exécuté qu'une seule fois, après le premier rendu

    return (
        <div>
            <h1>Liste des Clients</h1>
            {clients.length === 0 ? (
                <p>Aucun client trouvé.</p>
            ) : (
                <ul>
                    {clients.map((client) => (
                        <li key={client.id}>
                            {client.titre} {client.nom} {client.prenom}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClientList;
