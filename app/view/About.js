;(function (ns) {
  'use strict';
  ns.About = Backbone.View.extend({
    events: {
      'click .close-button': 'closeButton_clickHandler'
    },
    hide: function () {
      this.$el.addClass('fadeOutLeft');
    },
    show: function () {
      this.$el.removeClass('hide').addClass('fadeInLeft');
    },
    closeButton_clickHandler: function (event) {
      this.hide();
    }
  });
})(GF.view);


