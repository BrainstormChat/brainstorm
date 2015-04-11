Brainstorm Chat
===============

Aplicativo de chat que ajuda os usuários a criar listas de citações
ao utilizar as tags definidas por default ou as tags que forem customizadas pelo usuário.
Principalmente utilizado para fazer reuniões de brainstorm.

Aplicativo criado no evento #HackInPoa, organizado pela Globo.com.

Time de desenvolvimento:
------------------------

* Guilherme Mar
* Guilherme Fritsch
* Otávio Aquino
* Sérgio Berlotto

Informações sobre a aplicação
-----------------------------

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

Url do chat:
------------

http://brainstormchat.app.hackinpoa.tsuru.io/
