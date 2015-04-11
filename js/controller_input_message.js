window.app.controller('controllerInputMessage', function controllerInputMessage ($scope, $rootScope, loadContent) {

    console.log($scope.message);

    $scope.click = function () {
      console.log($scope.message);
      alert('da-lhe');
    }

});
