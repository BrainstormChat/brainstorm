    window.app.controller('input_message', function inputMessage ($scope) {
      $scope.send = function(){

        if ($scope.message) {

            socket.emit('sendMessage',{
                "room" : "dsv",
                "user" : localStorage.getItem('username'),
                "msg" : $scope.message,
                "time" : new Date().getTime()
            });

        }

    }
});
