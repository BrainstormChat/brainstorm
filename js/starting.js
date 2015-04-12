window.bs = {};

window.socket = io('http://brainstorm.app.hackinpoa.tsuru.io');
//window.socket = io('http://172.16.5.179:8888');

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

        window.socket.emit('identuser',{
            'user': $("#username").val(), //string
            'email': 'email.do.usuario@server.com', //string
        });
    })


    $('#username').keypress(function(e) {
       if(e.which == 13) {
         $('#enter').click();
      }
    });

});

//getting init data
window.socket.emit('joao');
window.socket.once('tiojoao', function(data){

  if (data.citations) {
    for(var i=0; i<data.citations.length; ++i) {
        window.bs.insertCitation(data.citations[i].type, data.citations[i].tags, data.citations[i].count);
    }
  }

  if (data.last_10) {
    data.last_10.reverse();
    for(var i=0; i<data.last_10.length; ++i) {
      if (data.last_10[i].user) {
        imputMessagePrepare({
          msg : data.last_10[i].message,
          user : data.last_10[i].user,
          time: data.last_10[i].time
        });
      }
    }
  }

});
