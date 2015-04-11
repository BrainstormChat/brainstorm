function Database(){

    var databaseuri = "mongodb://db:db@ds041160.mongolab.com:41160/brainstormchat"
    var collections = ["teams", "tokens", "users", "chatsession"]
    var db = require('mongojs').connect(databaseuri, collections)


    var gravaMsg = function(text, owner, sessionid){
        db.chatsession.find({"identifier": sessionid})
    }

};
module.exports = Database;
