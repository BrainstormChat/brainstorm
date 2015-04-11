window.app = angular.module('brainstorm', []);
window.socket = io('http://brainstorm.app.hackinpoa.tsuru.io');

$(document).ready(function(){

    $("#usernameModal").modal({backdrop:"static"});
    $("#enter").bind("click", function(){
        localStorage.setItem("username", $("#username").val());
        $("#usernameModal").modal('hide');
        $(".container-fluid.fade").addClass("in");
    })

});
