//creating basic citations


window.bs.citations = [];

window.bs.getCitationData = function getCitationData (id) {
    for (var i=0; i < window.bs.citations.length; ++i) {
        if ( window.bs.citations[i].id == id ) {
            return window.bs.citations[i];
        }
    }
    return undefined;
}

window.bs.createCitationArea = function createCitationArea (id)
{
    var citation = {
      internalId : 'conection' + new Date().getTime(),
      id : id
    }
    var tab = $('<li role="presentation" class=""><a href="#' + citation.internalId + '" id="tags-tab" role="tab" data-toggle="tab" aria-controls="tags" aria-expanded="true">' + citation.id + '</a></li>');
    var tabContent = $('<div role="tabpanel" class="tab-pane fade in" id="' + citation.internalId + '" aria-labelledby="profile-tab"><ul class="list-group"></ul></div>');

    $('#citationsTab').append(tab);
    $('#citationsTabContent').append(tabContent);

    $("#citationsTab li").removeClass('active');
    $("#citationsTabContent .tab-pane").removeClass('active');

    tab.addClass('active');
    tabContent.addClass('active');

    window.bs.citations.push(citation);
}

bs.createCitationArea('@');
bs.createCitationArea('#');

window.bs.insertCitation = function insertCitation (id, name)
{
    var citation = window.bs.getCitationData(id);
    if (!citation) {
        bs.createCitationArea(id);
        citation = window.bs.getCitationData(id);
    }

    var rash = '<li class="list-group-item"><span class="badge"></span><a href="#">' + name + '</a></li>';
    $('#' + citation.internalId + ' ul').each(function(){
        $(this).append(rash);
    });
}

window.socket.on('newCitation', function (data){
    window.bs.insertCitation(data.type, data.msg);
});
