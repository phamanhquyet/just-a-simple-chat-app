const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//gửi một file html lên client trong nodejs
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');
  //emit: gửi một gói tin tới toàn bộ những người dùng khác với thông tin là data, kênh là user-chat
  socket.on('on-chat', (data) => io.emit('user-chat', data));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('server is running');
});
