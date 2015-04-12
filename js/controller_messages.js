
var imputMessageInChat = function inputMessageInChat (data)
{
    var li = document.createElement('li');
    li.className = "left clearfix";

    li.innerHTML = '<span class="chat-img pull-left"><img src="http://placehold.it/50/55C1E7/fff&amp;text=' + data.user_initials + '" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">' + data.user + '</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + data.time + '</small></div><p>' + data.message + '</p></div>';

    document.getElementById('chat-wall').appendChild(li);

    $(".panel-body")[0].scrollTop = $(".panel-body")[0].scrollHeight;
}


window.socket.on('newMessage', function(data){
    data.msg = data.msg.replace(/</ig, '&lt;');
    data.msg = data.msg.replace(/>/ig, '&gt;');
    data.user = data.user.replace(/</ig, '&lt;');
    data.user = data.user.replace(/>/ig, '&gt;');

    var received = {};

    received['user'] = data.user;
    received['message'] = data.msg;

    var time = new Date(data.time);
    received['time'] = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

    received['user_initials'] = data.user.substring(0,3).toUpperCase();

    imputMessageInChat(received);
});
