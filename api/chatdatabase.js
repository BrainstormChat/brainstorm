function Database(){

    var databaseuri = "mongodb://db:db@ds041160.mongolab.com:41160/brainstormchat"
    var collections = ["teams", "tokens", "users", "chatsession"]
    var db = require('mongojs').connect(databaseuri, collections)


    var gravaUsr = function(userid, useremail, callback){
        db.users.findOne({'userid':userid}, function(err, user){
            if(err || !user){
                db.user.save({"userid": userid, "email": useremail});
            }else{
                if(user.email != email)
                    db.update({"userid":userid},{"email":useremail});
            }
        })
    }

    var gravaMsg = function(text, owner, sessionid, callback){
        db.chatsession.findOne({"identifier": sessionid}, function(err, session){
            if(err || !session){
                //Se não tem o chat ainda cria-o
                db.chatsession.save({"identifier": sessionid,"history":[
                    {
                        "message": text,
                        "owner"   : owner
                    }
                ]})
            }else{
                db.chatsession.update({"identifier": sessionid},{
                    $addToSet: {
                        "history": {
                            "message": text,
                            "owner"   : owner
                        }
                    }
                }, callback);
            };
        }); //findOne
    };

};
module.exports = Database;
