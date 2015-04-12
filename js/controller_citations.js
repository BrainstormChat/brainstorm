//creating basic citations


window.bs.citations = [];

window.bs.getCitationData = function getCitationData (id) {
    for (var i=0; i < window.bs.citations.length; ++i) {
        if ( window.bs.citations[i].id == id ) {
            return i;
        }
    }
    return undefined;
}

window.bs.getValueCitationKey = function getNameCitation (name, citation) {
    var values = citation.values;
    for (var i=0; i<values.length; ++i) {
        if (values[i].name == name) {
          return i;
        }
    }
    citation.values.push({
        name : name,
        counter : 0
    });
    return citation.values.length-1;

}

window.bs.createCitationArea = function createCitationArea (id)
{
    var citation = {
      internalId : 'conection' + new Date().getTime(),
      id : id,
      values : []
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

/*
setTimeout(function(){
    $("a.citation-list-item").on('click', function(){
        window.bs.toggle_filter($(this).html());
    });
}, 1000);
*/
window.bs.insertCitation = function insertCitation (id, name, count)
{
    var citationId = window.bs.getCitationData(id);
    if (citationId === undefined) {
        bs.createCitationArea(id);
        citationId = window.bs.getCitationData(id);
    }

    var valueId = undefined;
    for (var i=0; i<window.bs.citations[citationId].values.length; ++i) {
        if (window.bs.citations[citationId].values[i].name == name) {
          window.bs.citations[citationId].values[i].counter++;
          valueId = i;
          break;
        }
    }
    if (valueId === undefined) {

      if (count == undefined) {
        count = 1;
      }

      window.bs.citations[citationId].values.push({
          internalId : 'value' + new Date().getTime(),
          name : name,
          counter : count
      });
      valueId = window.bs.citations[citationId].values.length-1

      var rash = $('<li class="list-group-item" id="' + window.bs.citations[citationId].values[valueId].internalId + '"><span id="' + window.bs.citations[citationId].values[valueId].internalId + 'badge" class="badge">' + window.bs.citations[citationId].values[valueId].counter + '</span><a class="citation-list-item" href="#">' + name + '</a></li>');
      $('#' + window.bs.citations[citationId].internalId + ' ul').each(function(){
          $(this).append(rash);
      });
      rash.find("a.citation-list-item").on('click', function(){
          window.bs.toggle_filter($(this));
      });
    } else {
      $('#' + window.bs.citations[citationId].values[valueId].internalId + 'badge').html(window.bs.citations[citationId].values[valueId].counter);
    }

}

window.socket.on('newCitation', function (data){
  data.msg = data.msg.replace(/</ig, '&lt;');
  data.msg = data.msg.replace(/>/ig, '&gt;');
    window.bs.insertCitation(data.type, data.msg);
});
