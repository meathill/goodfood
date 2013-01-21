;(function (ns) {
  var curr = '',
      intro,
      select;
  ns.PopupManager = {
    close: function () {
      if (curr) {
        $('#' + curr).hide();
        curr = '';
      }
      $('#popup-cover').hide();
      
      $(document).off('click', '#popup-cover');
    },
    createHandler: function (popup) {
      switch(popup) {
        case 'intro':
          intro = new GF.popup.Intro({
            el: '#' + popup
          });
          break;
          
        case 'select':
          select = new GF.popup.Select({
            el: '#' + popup
          });
          break;
      }
    },
    popup: function (popup) {
      if (curr) {
        if (popup === curr) {
          return;
        }
        $('#' + curr).hide();
      }
      curr = popup;
      $('#popup-cover').show();
      $('#' + popup).show();
      this.createHandler(popup);
      
      $(document).on('click', '#popup-cover', _.bind(this.cover_clickHandler, this));
    },
    cover_clickHandler: function (event) {
      this.close();
    }
  }
})(GF.popup)