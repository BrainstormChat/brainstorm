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

helper.extractTags = function(citation, type){
    re = /[\#\$\@][\d\w]+/ig

    var _tags = citation.match(re)
    var tags = []

    for (var i = _tags.length - 1; i >= 0; i--) {
        if(_tags[i].substring(0,1) === type){
            tags[tags.length] = _tags[i];
        }
    };

    return tags;
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
            tags = helper.extractTags(mensagem.msg, "#");
            msg = mensagem.msg;
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                io.emit('newCitation',helper.formatCitation(mensagem,"#"));
            };
            db.gravaCitation(mensagem.user, mensagem.room, "#", tags, msg);
		}
		if(mensagem.msg.indexOf("@") != -1){
            tags = helper.extractTags(mensagem.msg, "#");
            msg = mensagem.msg;
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                io.emit('newCitation',helper.formatCitation(mensagem,"@"));
            };
            db.gravaCitation(mensagem.user, mensagem.room, "@", tags, msg);
		}
		if(mensagem.msg.indexOf('$') != -1){
            tags = helper.extractTags(mensagem.msg, "#");
            msg = mensagem.msg;
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                io.emit('newCitation',helper.formatCitation(mensagem,"$"));
            };
            db.gravaCitation(mensagem.user, mensagem.room, "$", tags, msg);
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

