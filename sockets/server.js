'use strict';

const express = require('express');
const { Server } = require('ws');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

// server.use(cors());
const wss = new Server({ server });

wss.on('connection', (ws, request) => {
    ws.uuid = request.url.replace('/?uuid=', '')
    console.log(ws.uuid)

    console.log('Client connected');
    ws.on('message', function incoming(message) {
        console.log(JSON.parse(message), `from user ${userId}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected')
        fetch(`http://localhost:9000/.netlify/functions/update-user/${ws.uuid}`,
            {
                method: "POST",
                body: JSON.stringify({
                    status: 'inactive'
                })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) { console.log(JSON.stringify(data)) })
    });
});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);