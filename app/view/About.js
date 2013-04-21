;(function (ns) {
  'use strict';
  ns.About = Backbone.View.extend({
    events: {
      'click .close-button': 'closeButton_clickHandler'
    },
    hide: function () {
      var self = this;
      this.$el.addClass('fadeOutRight');
      setTimeout(function () {
        self.$el
          .removeClass('fadeInRight fadeOutRight')
          .addClass('hide');
      }, 500);
    },
    show: function () {
      this.$el.removeClass('hide').addClass('fadeInRight');
    },
    closeButton_clickHandler: function (event) {
      this.hide();
    }
  });
})(GF.view);


