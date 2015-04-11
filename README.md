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

Identificar o usuário:

 io.emit('identuser',{
  'user':'Nome do Usuário', //string
  'email': 'email.do.usuario@server.com', //string
 });

Recebendo mensagems:

 io.on('newMessage', obj); //obj é um objeto com os mesmos atributos utilizados no sendMessage;

Recebendo uma citação:

 io.on('newCitation', obj); //obj é um objeto com os mesmos atributos utilizados no sendMessage adicionado do atributo 'type'

Acesso à aplicação:

http://brainstormchat.app.hackinpoa.tsuru.io
