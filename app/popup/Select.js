;(function (ns) {
  ns.Select = Backbone.View.extend({
    index: 0,
    events: {
      'tap .level': 'level_tapHandler'
    },
    level_tapHandler: function (event) {
      var level = parseInt(event.currentTarget.className.match(/level-(\d)/i)[1]);
      this.model.set('f' + this.index, level);
      this.manager.close();
    }
  });
})(GF.popup);

