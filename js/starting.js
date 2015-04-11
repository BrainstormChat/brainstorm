window.socket = io('http://brainstorm.app.hackinpoa.tsuru.io');

$(document).ready(function(){

    $("#usernameModal").modal({backdrop:"static"});
    if(localStorage){
        if(localStorage.getItem("username") !== ""){
            $("#username").val(localStorage.getItem("username"));
        }
    }
    
    $('#usernameModal').on('shown.bs.modal', function (e) {
        $("#username").focus();
    })
    
    $("#enter").bind("click", function(){
        localStorage.setItem("username", $("#username").val());
        $("#usernameModal").modal('hide');
        $(".container-fluid.fade").addClass("in");
    })
    
    
    $('#username').keypress(function(e) {
       if(e.which == 13) {
         $('#enter').click();
      }
    });

});
