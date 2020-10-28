// ` `(tilt) below of the tab button , the use of this tilt is that you can use variable inside of tilt. Ex:- `${name} joined`.

const socket = io('http://localhost:8000');  // Our server will run in localhost:8000 or localhost/Chat App.

const form = document.getElementById('sendContainer');  // This will fetch the value of sendContainer from index.html.
const messageInput = document.getElementById('messageInp');  // This will fetch the value of messageInp from index.html.
const messageContainer = document.querySelector(".container");  // .container is for message-box either left or right , querySelector will fetch string, number etc and store it in messageContainer variable.
var audio = new Audio('ding.mp3');  // This is for audio.

form.addEventListener('submit', (e) => {
    e.preventDefault();  // This will stop reloading your page.
    const message = messageInput.value;  // This will capture the value of message.
    append(`You : ${message}`, 'right');  // This will append message in right position.
    socket.emit('send', message);  // This will call send event while emitting it.
    messageInput.value = '';  // This will clear textbox after sending the message.
})

const name = prompt("Enter Your Name to Join : ");
socket.emit('new-user-joined', name);  // As soon as you enter your name inside prompt in browser this line will emit "new-user-joined" event.

/* Below is append funciton which contains message and position as a parameter */

const append = (message,position) => {
    const messageElement = document.createElement('div');  // This will create div element.
    messageElement.innerText = message;  // This will set text in messageElement.
    messageElement.classList.add('message');  // classList will return attribute present in a particular element.
    messageElement.classList.add(position);
    messageContainer.append(messageElement);  //  This line will append messageElement value inside  messageContainer which is in line 5.

    if(position == 'left') {
        audio.play();
    }
}

socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right')
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`,'left')
});

socket.on('left', name => {
    append(`${name} left the chat`,'left')
});