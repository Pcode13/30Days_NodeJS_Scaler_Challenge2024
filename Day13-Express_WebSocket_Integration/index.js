const express = require('express');
const http = require('http');
const setupWebSocket = require('./setupWebSocket');


const app = express();


app.use(express.static('public'));

const server = http.createServer(app);


setupWebSocket(server);


server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});