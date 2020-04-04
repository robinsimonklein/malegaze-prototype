const fs = require('fs');
const app = require('express')();
const http = require('http');
const https = require('https');
const consola = require('consola');
require('dotenv').config()

// Setup server
let server;
const port = process.env.PORT ? process.env.PORT : 3000
if(process.env.HTTPS === "true"){
    server = https.createServer({
        key: fs.readFileSync(`${__dirname}/cert/robin.local+3-key.pem`, 'utf8'),
        cert: fs.readFileSync(`${__dirname}/cert/robin.local+3.pem`, 'utf8')
    }, app)
}else{
    server = http.createServer(app)
}

// Create io
const io = require('socket.io')(server);

// Server listen
server.listen(port);

consola.success({
    message: 'Server listening on port '+port,
    badge: true
})

// io configuration

io.on('connection', function (socket) {
    console.log('new connexion', socket.id)
    socket.on('message', function (data) {
        console.log(data);
    });

    socket.on('join_mobile_room', (data) => {
        if (socket.mobileRoom !== null){
            socket.leave(socket.mobileRoom)
        }
        socket.join(data.mobileId)
        socket.mobileRoom = data.mobileId

        console.log(socket.id + ' joined mobile room : ', data.mobileId)
    })

    socket.on('start_camera', () => {
        console.log('start_camera')
        socket.emit('started_camera')
        socket.in(socket.mobileRoom).emit('started_camera')
    })

    socket.on('camera_position', (position) => {
        console.log(position)
        socket.to(socket.mobileRoom).emit('camera_position', position)
    })
    socket.on('camera_rotation', (rotation) => {
        console.log(rotation)
        socket.to(socket.mobileRoom).emit('camera_rotation', rotation)
    })
    socket.on('camera_effect', (effect) => {
        console.log(effect)
        socket.to(socket.mobileRoom).emit('camera_effect', effect)
    })
});
