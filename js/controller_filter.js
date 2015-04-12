window.bs.active_filters = [];

window.bs.insert_filter = function insert_filter (filter)
{
    var add = true;
    

    for (var i=0; i<window.bs.active_filters.length; ++i) {
      if (i<window.bs.active_filters[i] == filter.html()) {
        add = false;
      }
    }

    if (add) {
        window.bs.active_filters.push(filter.html());
        $(".panel .alert").show();
    }

    window.bs.applyFilter();
}

window.bs.remove_filter = function remove_filter (filter)
{
    var itemId = undefined;
    filter.find('span').remove();
    for (var i=0; i<window.bs.active_filters.length; ++i) {
      if (window.bs.active_filters[i] == filter.html()) {
        window.bs.active_filters.splice(i, 1);
        break;
      }
    }
    
    if(window.bs.active_filters.length===0) {
        $(".panel .alert").hide();
    }
    
    window.bs.applyFilter();
}

window.bs.toggle_filter = function toggle_fiter (filter)
{
    if (window.bs.active_filters.indexOf(filter.html()) > -1) {
      window.bs.remove_filter(filter);
    } else {
      window.bs.insert_filter(filter);
    }
}

window.bs.filterMessage = function filterMessage (message){
    var esconde = true;
    var msg = message.find('.msg');
  for (var i=0; i<window.bs.active_filters.length; ++i) {
    var reg = new RegExp(window.bs.active_filters[i]+'(\\s|$)');

      if (reg.exec(msg.html())) {
        esconde = false;
      }
  }

  if (esconde) {
    message.css('display', 'none');
    console.log('mostra', msg.html());
  }

}

window.bs.applyFilter = function applyFilter ()
{
  $('#chat-wall li').each(function(){
      $(this).css('display', 'list-item');
      if (window.bs.active_filters.length > 0) {
        window.bs.filterMessage($(this));
      } else {
        autoScroll();
      }
  });
  window.bs.filterListScreen();
}

window.bs.filterListScreen = function filterListScreen ()
{
    var activeFilter = $('#active-filter');
    activeFilter.html('');

    for (var i=0; i<window.bs.active_filters.length; ++i) {
      var item = $('<b>' + window.bs.active_filters[i] + '<span>[x]</span></b>');
      item.on('click', function(){
        window.bs.remove_filter($(this));
      });
      activeFilter.append(item);
    }
}
