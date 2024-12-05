import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    // Déclarations des hooks pour l'état des clients, le chargement, et les erreurs
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect pour récupérer les données des clients depuis l'API
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/clients');
                setClients(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des clients:', err);
                setError('Erreur lors de la récupération des clients');
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div>Chargement des données...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <div>
                <h1>Liste des Clients</h1>
                <ul>
                    {clients.map((client) => (
                        <li key={client.id}>
                            {client.titre} {client.nom} {client.prenom}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;

