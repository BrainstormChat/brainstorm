window.app = angular.module('brainstorm', []);

    window.app.controller('input_message', function inputMessage ($scope) {
      $scope.message= "Olá magrão";
      $scope.send = function(){
        console.log($scope.message)
    }
});
