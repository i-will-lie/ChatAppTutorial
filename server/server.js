const path = require("path");
const express = require("express");
const http = require("http")
const sockerIO = require("socket.io");


// path to access public directory
const publicPath = path.join(__dirname, "/../public");

// use given port otherwise 3000
const port = process.env.PORT || 3000;
let app = express();
//create server instance
let server = http.createServer(app);

// create bi-directional communication channel
let io = sockerIO(server);

// callback when client makes connection
io.on("connection", (socket) => {
    console.log("New user has connected");
    
    // callback when client is disconnected 
    socket.on("disconnect", () => { console.log("disconnected from server") });
});



// server index.html from public path
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})