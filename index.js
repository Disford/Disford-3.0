// npm i express socket.io
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static('public'));

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + "/chat/index.html");
});

app.get('/chat/school123', (req, res) => {
  fs.readFile(__dirname + '/chat/1.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/chat/db1.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

app.get('/chat/nont', (req, res) => {
  fs.readFile(__dirname + '/chat/2.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/chat/db2.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

app.get('/chat/main_gc', (req, res) => {
  fs.readFile(__dirname + '/chat/3.html', (err, data) => {
    if (err) throw err;
    res.write(data);

    fs.readFile(__dirname + '/chat/db3.txt', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });
});

io.on('connection', (socket) => {
    socket.on('chat message 1', (msg) => {
      fs.appendFileSync(__dirname + '/chat/db1.txt', `<script>a({name:'${msg.name}',message:'${msg.message}',date:'${msg.date}'});</script>`); // Puts Message In File
      console.log(msg);
      io.emit('chat message 1', msg);
    });

    socket.on('image 1', (image) => {
      fs.appendFileSync(__dirname + '/chat/db1.txt', `<script>i(\'${image}\');</script>`);
      io.emit('image 1', image);
    });

    socket.on('chat message 2', (msg) => {
      fs.appendFileSync(__dirname + '/chat/db2.txt', `<script>a({name:'${msg.name}',message:'${msg.message}',date:'${msg.date}'});</script>`); // Puts Message In File
      console.log(msg);
      io.emit('chat message 2', msg);
    });

    socket.on('image 2', (image) => {
      fs.appendFileSync(__dirname + '/chat/db2.txt', `<script>i(\'${image}\');</script>`);
      io.emit('image 2', image);
    });

    socket.on('chat message 3', (msg) => {
      fs.appendFileSync(__dirname + '/chat/db3.txt', `<script>a({name:'${msg.name}',message:'${msg.message}',date:'${msg.date}'});</script>`); // Puts Message In File
      console.log(msg);
      io.emit('chat message 3', msg);
    });

    socket.on('image 3', (image) => {
      fs.appendFileSync(__dirname + '/chat/db3.txt', `<script>i(\'${image}\');</script>`);
      io.emit('image 3', image);
    });
});

app.get('*', function(req, res){
  res.status(404).send('404 Not Found <a href=\"/\">Disford home</a>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});