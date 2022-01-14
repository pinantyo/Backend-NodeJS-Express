require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path")
const http = require('http');
const { Server } = require("socket.io");
require("./config/database").connect();

// Making HTTP server
const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
  transports:['polling'],
  cors:{
    origin: 'http://localhost:3000',
  }
});

io.on('connection', (socket) => {
  console.log('A user is connected');
  socket.on('message', (message) => {
    console.log(`message from ${socket.id}`);
  });
  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  });
})
module.exports = {io};


app.use("/public", express.static(__dirname + '/public')); // Pembuatan global folder
app.set("views",path.join(__dirname,"views"));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 


//List api:
app.use('/api/', require('./routes'));


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));