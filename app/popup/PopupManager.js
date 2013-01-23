;(function (ns) {
  var curr = '',
      intro,
      select;
  ns.Manager = {
    close: function () {
      if (curr) {
        curr
          .hide()
          .trigger('hide');
      }
      $('#popup-cover').hide();
      
      $(document).off('tap', '#popup-cover');
    },
    popup: function (popup) {
      popup = _.isString(popup) ? $('#' + popup) : popup;
      if (curr) {
        if (popup.is(curr)) {
          return;
        }
        curr.hide();
      }
      $('#popup-cover').show();
      curr = popup;
      curr
        .show()
        .trigger('show');
      
      $(document).on('tap', '#popup-cover', _.bind(this.cover_clickHandler, this));
    },
    showSelectPopup: function (model, index) {
      this.popup('select');
      select.model = model;
      select.index = index;
    },
    cover_clickHandler: function (event) {
      this.close();
    }
  }

  $(document).on('show', '.popup', function (event) {
    switch(event.currentTarget.id) {
      case 'intro':
        intro = intro || new GF.popup.Intro({
          el: '#' + event.currentTarget.id
        });
        intro.manager = ns.Manager;
        break;

      case 'select':
        select = select || new GF.popup.Select({
          el: '#' + event.currentTarget.id
        });
        select.manager = ns.Manager;
        break;
    }
  });
})(GF.popup)