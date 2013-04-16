;(function (ns) {
  ns.Intro = Backbone.View.extend({
    events: {
      'tap .level': 'level_tapHandler'
    },
    level_tapHandler: function (event) {
      var parent = $(event.currentTarget).parent(),
          index = parent.index();
      parent.addClass('active')
        .siblings('.active').removeClass('active');
      this.$('.intros').children().removeClass('active')
        .eq(index).addClass('active');
    }
  });
})(GF.popup);

