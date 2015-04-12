window.bs = {};
window.socket = io('http://brainstorm.app.hackinpoa.tsuru.io');

//função que retorna um número hexadecimal aleatório entre 0 e 255 (FF):
function Hx() { return parseInt((Math.random() * 255)).toString(16); }

//Função para retornar o código completo da cor, com 3 números aleatórios:
function CorAleat() { return "#" + Hx() + Hx() + Hx(); }

//Testando a função:
localStorage.setItem("color", CorAleat());
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
  console.log('joao disse:');
  console.log(data);
});
