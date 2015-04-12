
databaseuri = "mongodb://db:db@ds041160.mongolab.com:41160/brainstormchat";
collections = ["citations", "tokens", "users", "chatsession", "messages"];
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

    for (var i = 0; i < tags.length; i++) {
        db.citations.save({
            "user": owner,
            "sessionid": sessionid,
            "type":type,
            "citation":citation,
            "tags": tags[i]
        });
    };
};

exports.getAllCitationsOfTag = function(tagname, callback){
    db.citations.find({"tags":tagname}, function(err, citations){
        if (citations){
            callback(citations);
        }
    })
}

exports.gravaMsg = function(msgobj, callback){
    text      = msgobj.msg;
    owner     = msgobj.user;
    sessionid = msgobj.room;
    time      = msgobj.time;
    db.messages.save({
        "session": sessionid,
        "message": text,
        "user"   : owner,
        "time"   : time
    }, function(err, o){
        callback(o);
    });

};

exports.getAllCitationTags = function(callback){

    db.citations.group({
        "key": {
            "tags":1,
            "type":1,
            "count":1
        },
        reduce: function(cur, result){
            result.count += 1
        },
        initial: {
            count: 0
        } },
    function(err, retorno){

        db.messages.find().sort({"_id":-1}).limit(10, function(err, cits){
            callback( {'citations':retorno, "last_10": cits} );
        })


    });

};
