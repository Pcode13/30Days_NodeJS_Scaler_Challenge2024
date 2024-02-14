const WebSocket = require('ws');

function setupWebSocket(server) {
  
  const wss = new WebSocket.Server({ server });


  wss.on('connection', (ws) => {
    console.log('Client connected');


    ws.on('message', (message) => {
      console.log('Received message:', message);
      
     
      ws.send(message);
    });

   
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = setupWebSocket;
