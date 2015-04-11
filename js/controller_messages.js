window.app.controller('messages', function messages ($scope) {

    $scope.messages = [{
        user: "colocado na mão",
        message: "mensagem amarrada no código fonte",
        time: "7 minutes ago",
        user_initials: "CNM"
      },{
          user: "colocado na mão",
          message: "mensagem amarrada no código fonte",
          time: "7 minutes ago",
          user_initials: "CNM"
      },{
          user: "colocado na mão",
          message: "mensagem amarrada no código fonte",
          time: "7 minutes ago",
          user_initials: "CNM"
    }]


    window.socket.on('newMessage', function(data){

        console.log('#####');
        console.log(data);
        console.log('#####');

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

        $scope.messages.push(received);
    });


});
