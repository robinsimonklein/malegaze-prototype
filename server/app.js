const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const consola = require('consola');

const port = 3000

server.listen(port);

consola.success({
    message: 'Server listening on port :'+port,
    badge: true
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

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
