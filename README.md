Brainstorm Chat
===============

Time:

* Guilherme Mar
* Guilherme Fritsch
* Otávio Aquino
* Sérgio Berlotto

Enviar mensagem: 
 io.emit('sendMessage',{
  'user':'Nome do Usuário', //string
  'msg': 'Mensagem do Usuário', //string
  'time': 1428774980501 //timestamp
 });
 
 Recebendo mensagems:
 
 io.on('newMessage', obj); //obj é um objeto com os mesmos atributos utilizados no sendMessage;


 Url do chat:

 http://brainstormchat.app.hackinpoa.tsuru.io/

