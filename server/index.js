const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");


app.use(cors());

const server = http.createServer(app); 

const PORT = process.env.PORT || 30001;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`user connecxted:${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id:${socket.id} joined room ${data}`);
    })
    socket.on("send_message", data => {
        socket.to(data.room).emit("receive_message", data);
    })
    socket.on("disconnect", () => {
        console.log("user Disconnect", socket.id);;
    })

})







server.listen(PORT, () => {
    console.log("server running");
})


