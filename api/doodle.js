var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var SockUser = {};
var socks = {};

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

    var _tags = citation.match(re);
    var tags = [];

    for (var i = _tags.length - 1; i >= 0; i--) {
        if(_tags[i].substring(0,1) === type){
            tags[tags.length] = _tags[i];
        }
    };

    return tags;
}

io.on('connection',function(socket){
	console.info('+1 conectado '+ socket.id);
    //socks[socket.id] = socket;
    SockUser[socket.id] = {};
	socket.on('sendMessage',function(mensagem){
	    console.info('recebeu sendMessagem:' + mensagem.msg);
		io.emit('newMessage',mensagem);
        try{
            db.gravaMsg(mensagem, function(ret){
              console.log("inseriu msg no banco!");
            });
        } catch(err){}
		if(mensagem.msg.indexOf('#') != -1){
            // console.log(">>>>>>>>>>>>"+mensagem.msg);
            tags = helper.extractTags(mensagem.msg, "#");
            // console.log(">>>>>>>>>>>>"+tags);
            msg = mensagem.msg;
            // console.log(">>>>>>>>>>>>"+msg);
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                // console.log(">>>>>>>>>>>>>>>>>"+mensagem.msg);
                io.emit('newCitation',helper.formatCitation(mensagem,"#"));
            };
            // console.log(">>>>>>>>>>>>"+mensagem.msg+"="+msg);
            // console.log(">>>>>>>>>>>>"+tags);
            db.gravaCitation(mensagem.user, mensagem.room, "#", msg, tags );
		}
		if(mensagem.msg.indexOf("@") != -1){
            tags = helper.extractTags(mensagem.msg, "@");
            msg = mensagem.msg;
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                io.emit('newCitation',helper.formatCitation(mensagem,"@"));
            };
            db.gravaCitation(mensagem.user, mensagem.room, "@", msg, tags);
		}
		if(mensagem.msg.indexOf('$') != -1){
            tags = helper.extractTags(mensagem.msg, "$");
            msg = mensagem.msg;
            for (var i = 0; i < tags.length; i++) {
                mensagem.msg = tags[i];
                io.emit('newCitation',helper.formatCitation(mensagem,"$"));
            };
            db.gravaCitation(mensagem.user, mensagem.room, "$", msg, tags);
		}
	});
    socket.on('identuser', function(mensagem){
        console.log("Recebendo o user,"+mensagem.user+", é o socket:"+socket.id);
        SockUser[socket.id] = {
            name:mensagem.user,
            mail:mensagem.email
        };
        db.gravaUsr(mensagem.user, mensagem.email);
        io.emit('newMessage', {"msg":mensagem.user + " Entrou na sala!", "time": new Date().getTime(), "user": mensagem.user});
    });
    socket.on('disconnect', function(){
        console.log("Disconnected socket: "+ socket.id);
        socket.broadcast.emit("newMessage", {"msg":SockUser[socket.id].name+' saiu da sala!', "time": new Date().getTime(), "user": ""});
        delete SockUser[socket.id];
    });
    socket.on('joao', function(){
        db.getAllCitationTags(function(return_data){
            socket.emit('tiojoao', return_data );
        });
    });
    socket.on('ze', function(){
        db.getAllCitationsOfTag(function(return_data){
            socket.emit("tioze", return_data);
        })
    })
});

