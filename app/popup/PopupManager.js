;(function (ns) {
  var curr = '',
      intro,
      select;
  ns.Manager = {
    close: function () {
      if (curr) {
        curr
          .addClass('flipOutX')
          .trigger('hide');
        setTimeout(function () {
          curr
            .removeClass('flipOutX flipInX')
            .addClass('hide');
          curr = null;
          $('#popup-cover').hide();
        }, 500);
      }
    },
    popup: function (popup) {
      popup = _.isString(popup) ? $('#' + popup) : popup;
      if (curr) {
        if (popup[0] === curr[0]) {
          return;
        }
        curr.addClass('hide');
      }
      $('#popup-cover').show();
      curr = popup;
      curr
        .removeClass('hide')
        .addClass('flipInX')
        .trigger('show');
    },
    showSelectPopup: function (model, index) {
      this.popup('select');
      select.model = model;
      select.index = index;
      select.render();
    }
  }

  $(document)
    .on('show', '.popup', function (event) {
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
    })
    .on('tap', '#popup-cover', function () {
      R.router.navigate('#/popup/close');
    });
}(GF.popup));