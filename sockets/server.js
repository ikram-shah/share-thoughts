'use strict';
const users = require('./read-all-users');
const express = require('express');
const { Server } = require('ws');
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

// server.use(cors());
const wss = new Server({ server });

function updateStatus(id, status) {
    fetch(`${process.env.VUE_APP_API_URL}/update-user/${id}`,
        {
            method: "POST",
            body: JSON.stringify({
                status: status,
                lastUpdated: new Date()
            })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) { console.log(JSON.stringify(data)) })
}

wss.on('connection', (ws, request) => {
    ws.uuid = request.url.replace('/?uuid=', '')
    console.log(ws.uuid)
    console.log('Client connected');
    updateStatus(ws.uuid, 'online')
    ws.on('message', function incoming(message) {
        console.log(JSON.parse(message), `from user ${ws.uuid}`);
    });
    ws.on('close', () => {
        updateStatus(ws.uuid, 'offline')
        console.log('Client disconnected')

    });
}),

setInterval(() => {
    wss.clients.forEach((client) => {
        users.getUsers().then(function (result) {
            client.send(JSON.stringify(result));
        })

    });
}, 1000);