var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8888;
var db = require("./chatdatabase");

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
		io.emit('newMessage',mensagem);
        try{
            db.gravaMsg(mensagem.room, mensagem.msg, mensagem.user, function(){
              console.log("inseriu msg no banco!")
            });
        } catch(err){}
		if(mensagem.msg.indexOf('#') != -1){
			io.emit('newCitation',helper.formatCitation(mensagem,"#"));
            db.gravaCitation(mensagem.user, mensagem.room, "#", mensagem.msg);
		}
		if(mensagem.msg.indexOf("@") != -1){
			io.emit('newCitation',helper.formatCitation(mensagem,"@"));
            db.gravaCitation(mensagem.user, mensagem.room, "@", mensagem.msg);
		}
		if(mensagem.msg.indexOf('$') != -1){
			io.emit('newCitation',helper.formatCitation(mensagem,"$"));
            db.gravaCitation(mensagem.user, mensagem.room, "$", mensagem.msg);
		}
	});
    socket.on('identuser', function(mensagem){
        db.gravaUsr(mensagem.user, mensagem.email);
        io.emit('newMessage', {"msg":mensagem.user + " Entrou na sala!", "time": new Date().getTime(), "user": mensagem.user});
    });
    socket.on('disconnect', function(){
        io.emit("newMessage", {"msg":"Alguém sai da sala!", "time": new Date().getTime(), "user": ""});
    });
    socket.on('joao', function(){
        db.getAllCitationTags(function(tags_list){
            io.emit('tiojoao', {'tags':tags_list});
        });

    });
});

