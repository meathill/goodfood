;(function (ns) {
  ns.Select = Backbone.View.extend({
    index: 0,
    events: {
      'tap .level': 'level_tapHandler'
    },
    render: function () {
      if (this.model.get('f' + this.index)) {
        this.$('.level-' + this.model.get('f' + this.index)).addClass('active');
      } else {
        this.$('.active').removeClass('active');
      }
    },
    level_tapHandler: function (event) {
      this.$('.active').removeClass('active');
      var level = parseInt(event.currentTarget.className.match(/level-(\d)/i)[1]);
      this.model.set('f' + this.index, level);
      this.manager.close();
    }
  });
})(GF.popup);

