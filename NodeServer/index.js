// Node server which will handle socket io connections.
// new-user-joined, New User, user-joined, send, receive etc are the names which are user-defined, You can set name as per your choice.
// ` `(tilt) below of the tab button , the use of this tilt is that you can use variable inside of tilt. Ex:- `${name} joined`.

const io = require("socket.io")(8000);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New User", name);
        users[socket.id] = name;  // This will add user in users = {} array and socket.id will automatically generated whenever user Joined the chat.
        socket.broadcast.emit('user-joined', name);  // This line will occur when user joined
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})