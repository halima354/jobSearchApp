const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmY3YzdiZGQzZmYyMzYxOTIxZjBjZCIsImlhdCI6MTc0MDYwMzI4OCwiZXhwIjoxLjhlKzExN30.oGMEso9QTAdFuvWgySfq7neU0xcmf40mrJfb1uSjaeM';
const message = 'l';
const destId = "67be37ec87ceafb44256630f"
const socket = io('http://localhost:3000', {})
socket.on('connect', () => {
    console.log('Connected to server')
})

socket.emit('sendMessage', { authorization , destId, message });
socket.emit('register', { authorization });
socket.on('disconnection', { authorization });
socket.on('receiveMessage', ({chat, message}) => {
    console.log('Server response:', {chat, message});
});

socket.on('notify Hr', (data) => {
    console.log(data);
})


socket.on("socketError",  (data) => {
    console.log(data);
})







