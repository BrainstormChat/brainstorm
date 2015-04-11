(function(){
    var db = require('./database');

	var io = require('socket.io')(8888);

	io.on('connetion',function(socket){
		socket.on('sendMessage',function(mensagem){
			socket.broadcast('newMessage',mensagem);
		});
	});

})();
