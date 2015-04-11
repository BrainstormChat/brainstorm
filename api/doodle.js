(function(){

	var io = require('socket.io')(8080);

	io.on('connetion',function(socket){
		socket.on('sendMessage',function(mensagem){
			socket.broadcast('newMessage',mensagem);
		});
	});

})();