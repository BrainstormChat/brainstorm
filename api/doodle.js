(function(){
    var db = require('./database');

	var io = require('socket.io')(8888);

	io.on('connetion',function(socket){
		console.info('conectado');
		socket.on('sendMessage',function(mensagem){
			console.info('recebeu sendMessage');
			socket.broadcast('newMessage',mensagem);
		});
	});

})();
