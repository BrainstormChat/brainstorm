
databaseuri = "mongodb://db:db@ds041160.mongolab.com:41160/brainstormchat";
collections = ["citations", "tokens", "users", "chatsession"];
db = require('mongojs').connect(databaseuri, collections);

exports.gravaUsr = function(userid, useremail, callback){
    db.users.findOne({'userid':userid}, function(err, user){
        if(err || !user){
            db.users.save({"userid": userid, "email": useremail});
        }else{
            if(user.email != useremail)
                db.users.update({"userid":userid},{"email":useremail});
        }
    })
};

exports.gravaCitation = function(owner, sessionid, type, citation, tags, callback){

    db.citations.save({
        "owner": owner,
        "sessionid": sessionid,
        "type":type,
        "citation":citation,
        "tags": tags
    });

};

exports.gravaMsg = function(msgobj, callback){
    text      = msgobj.msg;
    owner     = msgobj.user;
    sessionid = msgobj.room;
    time      = msgobj.time;
    db.chatsession.findOne({"identifier": sessionid}, function(err, session){
        if(err || !session){
            //Se não tem o chat ainda cria-o
            db.chatsession.save({"identifier": sessionid,"history":[
                {
                    "message": text,
                    "owner"  : owner,
                    "time"   : time
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

exports.getAllCitationTags = function(callback){

    if(callback)
        callback( ["#tag1","#tag2","#tag3"] );

};
