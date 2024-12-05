// src/App.js
import React from 'react';
import ClientList from './components/ClientList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bienvenue sur notre Application de Pèlerinages</h1>
            </header>
            <ClientList /> {/* Ajout du composant ClientList ici */}
        </div>
    );
}

export default App;
