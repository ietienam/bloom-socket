var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var port = 3000;

io.on("connection", function (socket) {
  console.log("new connection made");

  socket.on("disconnect", function () {
    console.log("connection disconnected");
  });

  socket.on("send-message", function (msg) {
    console.log("message: " + msg);

    //broadcast message to everyone in port:3000 except yourself.
    socket.broadcast.emit("received", { message: msg });
  });
});

server.listen(port, function () {
  console.log("Listening on port " + port);
});
