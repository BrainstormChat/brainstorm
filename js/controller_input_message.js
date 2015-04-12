var sendButton = $('#btn-send'),
    inputMessage = $('#input-message');

sendButton.on('click', function(){
    if(inputMessage.val() !== ""){
      window.socket.emit('sendMessage',{
          "room" : "dsv",
          "user" : localStorage.getItem('username'),
          "msg" : inputMessage.val(),
          "time" : new Date().getTime()
      });

      inputMessage.val('');
    }
});

inputMessage.keypress(function(e) {
   if(e.which == 13) {
     sendButton.click();
  }
});
