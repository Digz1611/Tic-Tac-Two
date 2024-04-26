// const express = require('express');
// const app = express();

// //socket.io setup
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);
// const port = 3000;

// // Store game state and player information
// const games = {};

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
  
//   socket.on('joinGame', (gameId) => {
//     if (!games[gameId]) {
//       console.log(`Game with ID ${gameId} does not exist.`);
//       socket.emit('gameError', { message: `Game with ID ${gameId} does not exist.` });
//       return;
//     }

//     // Add the player to the game
//     const playerId = games[gameId].players.length;
//     games[gameId].players.push(socket);

//     // Notify other players about the new player
//     games[gameId].players.forEach(player => {
//       if (player !== socket) {
//         player.emit('playerJoined', { playerId });
//       }
//     });

//     // Handle messages from the player
//     socket.on('message', message => {
//       // Broadcast the message to other players
//       games[gameId].players.forEach(player => {
//         if (player !== socket) {
//           player.emit('message', message);
//         }
//       });
//     });

//     // Handle player disconnection
//     socket.on('disconnect', () => {
//       const index = games[gameId].players.indexOf(socket);
//       if (index !== -1) {
//         games[gameId].players.splice(index, 1);
//       }
//       // Notify other players about the disconnected player
//       games[gameId].players.forEach(player => {
//         if (player !== socket) {
//           player.emit('playerLeft', { playerId: index });
//         }
//       });
//     });
//   });
// });

// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// console.log('server loaded');




const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// Map to store game state and player information
const games = {};

// Function to generate a random alphanumeric game code
function generateGameCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Generate a unique game code for this session
  let gameCode;
  do {
    gameCode = generateGameCode();
  } while (games[gameCode]);

  // Store the game state and player information
  games[gameCode] = {
    players: [socket.id], // Store the player's socket ID
    state: 'waiting', // Initial game state
    // Add other game-related data as needed
  };

  // Send the game code to the client
  socket.emit('gameCode', gameCode);

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove the player from the game
    const index = games[gameCode].players.indexOf(socket.id);
    if (index !== -1) {
      games[gameCode].players.splice(index, 1);
    }
    // If no players are left, delete the game
    if (games[gameCode].players.length === 0) {
      delete games[gameCode];
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
