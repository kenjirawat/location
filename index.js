var express = require('express')
var app = express()

app.use(express.static('public'))

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

var io = require('socket.io').listen(server)
io.on('connection', function (socket) { // เมื่อมี client เข้ามาเชื่อมต่อให้ทำอะไร?
  console.log('a user connected') // แสดงข้อความ "a user connected" ออกมาทาง console
})

io.on('connection', function (socket) {
  // เมื่อได้รับข้อมูลจากท่อ "chat" ให้ทำอะไร?
  socket.on('chat', function (message) {
    io.emit('chat', message.User)
    console.log(message.User)
  })
})
