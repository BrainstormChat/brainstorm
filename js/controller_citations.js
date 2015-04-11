//creating basic citations

window.bs.connections = [];

window.bs.createCitationArea = function createCitationArea (id) {
    var internalId = 'conection' + new Date().getTime();
    var tab = $('<li role="presentation" class=""><a href="#' + internalId + '" id="tags-tab" role="tab" data-toggle="tab" aria-controls="tags" aria-expanded="true">' + id + '</a></li>');
    var tabContent = $('<div role="tabpanel" class="tab-pane fade active in" id="' + internalId + '" aria-labelledby="profile-tab"><ul class="list-group"></ul></div>');

    $('#citationsTab').append(tab);
    $('#citationsTabContent').append(tabContent);
}

bs.createCitationArea('#');
bs.createCitationArea('@');

window.socket.on('newCitation', function (data){
  console.log(data);
});
