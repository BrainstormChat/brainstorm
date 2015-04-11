window.app.controller('messages', function messages ($scope) {

    $scope.chat = [{
        user: "colocado na mão",
        message: "mensagem amarrada no código fonte",
        time: "7 minutes ago",
        user_initials: "CNM",
        counter: 1
      },{
          user: "colocado na mão",
          message: "mensagem amarrada no código fonte",
          time: "7 minutes ago",
          user_initials: "CNM",
          counter: 2
      },{
          user: "colocado na mão",
          message: "mensagem amarrada no código fonte",
          time: "7 minutes ago",
          user_initials: "CNM",
          counter: 3
    }]


    window.socket.on('newMessage', function(data){

        var received = {};

        received['user'] = data.user;
        received['message'] = data.msg;

        var time = new Date(data.time);
        received['time'] = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

        var name = data.user.split(' '),
            initials = '';
        for (var i=0; i<name.length; ++i) {
          initials += name[i].substring(0,1);
        }
        received['user_initials'] = initials;
        received['counter'] = data.time;

        $scope.chat.push(received);

        console.log('#####');
        console.log(data);
        console.log('#####');
    });


});
