;(function (ns) {
  ns.Intro = Backbone.View.extend({
    events: {
      'tap .level': 'level_tapHandler'
    },
    level_tapHandler: function (event) {
      var index = $(event.currentTarget).parent().index();
      this.$('.intros').children().removeClass('active')
        .eq(index).addClass('active');
    }
  });
})(GF.popup);

