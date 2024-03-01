const express = require('express');
const http = require('http');
const WebSocket = require('ws');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    const clients = new Set();

    wss.on('connection', (ws) => {
        clients.add(ws);
        
        ws.on('message', (message) => {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            clients.delete(ws);
        });
    });
}

// Create Express app
const app = express();

// Create HTTP server using Express app
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
