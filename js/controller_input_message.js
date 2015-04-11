$('#btn-send').on('click', function(){
  window.socket.emit('sendMessage',{
      "room" : "dsv",
      "user" : localStorage.getItem('username'),
      "msg" : $('#input-message').val(),
      "time" : new Date().getTime()
  });

  $('#input-message').val('');
});

$('#input-message').keypress(function(e) {
   if(e.which == 13) {
     $('#btn-send').click();
  }
});
