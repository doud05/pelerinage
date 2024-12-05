// server.js

const http = require('http');
const { exec } = require('child_process'); // Pour exécuter des commandes systèmes

const PORT = 4000; // Nouveau port choisi pour éviter le conflit avec 3000

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/github-webhook') {
        let body = '';

        // Collecter les données de la requête
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Une fois toutes les données collectées
        req.on('end', () => {
            console.log('Webhook reçu, synchronisation du dépôt...');
            
            // Commande pour effectuer le git pull dans le bon dossier
            exec('cd /var/www/pelerinage && git pull origin main', (err, stdout, stderr) => {
                if (err) {
                    // En cas d'erreur pendant l'exécution de git pull
                    console.error(`Erreur lors de git pull : ${err}`);
                    res.writeHead(500);
                    res.end('Erreur lors de git pull');
                    return;
                }

                // Afficher la sortie de la commande
                console.log(`Sortie stdout : ${stdout}`);
                console.error(`Sortie stderr : ${stderr}`);
                
                res.writeHead(200);
                res.end('Mise à jour réussie');
            });
        });
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
