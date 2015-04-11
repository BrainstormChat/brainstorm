var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8888;
var db = require("./chatdatabase")

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var helper = {};
helper.formatCitation = function(_msg,_signal){
	_msg.type = _signal;
	return _msg;
}

io.on('connection',function(socket){
	console.info('+1 conectado');
	socket.on('sendMessage',function(mensagem){
        console.info('recebeu sendMessagem:' + mensagem.msg);
		socket.emit('newMessage',mensagem);
        db.gravaMsg(mensagem.room, mensagem.msg, mensagem.user, function(){
            console.log("inseriu msg no banco!");
        })
		if(mensagem.msg.indexOf('#') != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"#"));
            db.gravaCitation(mensagem.user, mensagem.room, "#", mensagem.msg);
		}
		if(mensagem.msg.indexOf("@") != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"@"));
            db.gravaCitation(mensagem.user, mensagem.room, "@", mensagem.msg);
		}
		if(mensagem.msg.indexOf('$') != -1){
			socket.emit('newCitation',helper.formatCitation(mensagem,"$"));
            db.gravaCitation(mensagem.user, mensagem.room, "$", mensagem.msg);
		}
	});
    socket.on('identuser', function(mensagem){
        db.gravaUsr(userid, useremail);
    });
});
