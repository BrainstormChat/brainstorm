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

        console.log(data);

        var message = {};

        message['user'] = data.user;
        message['message'] = data.msg;
        message['time'] = 'now';
        message['user_initials'] = 'KK';

        $scope.messages.push(message);
    });


});
