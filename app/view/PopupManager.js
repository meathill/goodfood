;(function (ns) {
  var curr = '',
      hasListener = false;
  ns.PopupManager = {
    close: function () {
      if (curr) {
        $(curr).hide();
        curr = '';
      }
      $('#popup-cover').hide();
      
      $(document).off('click', '#popup-cover');
    },
    popup: function (popup) {
      if (curr) {
        if (popup === curr) {
          return;
        }
        $(curr).hide();
      }
      curr = popup;
      $('#popup-cover').show();
      $(popup).show();
      
      $(document).on('click', '#popup-cover', _.bind(this.cover_clickHandler, this));
    },
    cover_clickHandler: function (event) {
      this.close();
    }
  }
})(GF.view)