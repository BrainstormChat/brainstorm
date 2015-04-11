(function(){

	var io = require('socket.io')(8080);

	io.on('helloworld',function(socket){
		console.log(socket);
		io.emit('hellotoyou',{
			msg: 'Ho ho ho',
			usr: 'DOODLE'
		});
	});


})();