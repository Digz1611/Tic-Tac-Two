// const express = require('express');
// const app = express();

// //socket.io setup
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);
// const port = 3000

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// console.log('server loaded');











const express = require('express');
const app = express();

//socket.io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

// Store game state and player information
const games = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('joinGame', (gameId) => {
    if (!games[gameId]) {
      console.log(`Game with ID ${gameId} does not exist.`);
      socket.emit('gameError', { message: `Game with ID ${gameId} does not exist.` });
      return;
    }

    // Add the player to the game
    const playerId = games[gameId].players.length;
    games[gameId].players.push(socket);

    // Notify other players about the new player
    games[gameId].players.forEach(player => {
      if (player !== socket) {
        player.emit('playerJoined', { playerId });
      }
    });

    // Handle messages from the player
    socket.on('message', message => {
      // Broadcast the message to other players
      games[gameId].players.forEach(player => {
        if (player !== socket) {
          player.emit('message', message);
        }
      });
    });

    // Handle player disconnection
    socket.on('disconnect', () => {
      const index = games[gameId].players.indexOf(socket);
      if (index !== -1) {
        games[gameId].players.splice(index, 1);
      }
      // Notify other players about the disconnected player
      games[gameId].players.forEach(player => {
        if (player !== socket) {
          player.emit('playerLeft', { playerId: index });
        }
      });
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log('server loaded');
