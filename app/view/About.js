;(function (ns) {
  'use strict';
  ns.About = Backbone.View.extend({
    events: {
      'click .close-button': 'closeButton_clickHandler'
    },
    hide: function () {
      this.$el.addClass('hide');
    },
    show: function () {
      this.$el.removeClass('hide');
    },
    closeButton_clickHandler: function (event) {
      this.hide();
    }
  });
})(GF.view);


