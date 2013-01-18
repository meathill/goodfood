;(function (ns) {
  'use strict';
  var Item = Backbone.View.extend({
    template: null,
    initialize: function () {
      var source = this.$('script').html();
      this.template = Handlebars.compile(source);
      this.$('script').remove();
    },
    render: function () {
      var data = this.model ? this.model.toJSON() : this.collection.toJSON();
      this.$el.html(this.template(data));
    }
  });
  ns.view = ns.view || {};
  ns.view.Homepage = Backbone.View.extend({
    detail: null,
    week: null,
    summary: null,
    initialize: function () {
      this.detail = new Item({
        el: '#detail'
      });
      this.week = new Item({
        el: '#week'
      });
      this.summary = new Item({
        el: '#summary'
      });
    }
  });
})(GF)

