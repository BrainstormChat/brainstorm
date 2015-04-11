(function(){

    var databaseuri = "mongodb://db:db@ds041160.mongolab.com:41160/brainstormchat"
    var collections = ["teams", "tokens", "users", "chatsession"]
    var db = require('mongojs').connect(databaseuri, collections)

	var io = require('socket.io')(8080);

    var gravaMsg = function(text, owner, sessionid){
        db.chatsession.find({"identifier": sessionid})
    }

	io.on('helloworld',function(socket){
		console.log(socket);
		io.emit('hellotoyou',{
			msg: 'Ho ho ho',
			usr: 'DOODLE'
		});
	});


})();
