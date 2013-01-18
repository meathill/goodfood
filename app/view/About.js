;(function (ns) {
  ns.view = ns.view || {};
  ns.view.About = Backbone.View.extend({
    events: {
      'click .close-button': 'closeButton_clickHandler',
    },
    show: function () {
      this.$el.removeClass('hide')
    },
    closeButton_clickHandler: function (event) {
      this.$el.addClass('hide');
    }
  });
})(GF);


