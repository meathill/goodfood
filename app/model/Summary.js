;(function (ns) {
  'use strict';
  ns.Summary = Backbone.Model.extend({
    defaults: {
      days: 0,
      percent: 0,
      height: 0,
      level: '',
      leveldesc: '未知',
    },
    initialize: function () {
      var storage = localStorage.getItem('summary');
      
      if (!storage) {
        return;
      }
      this.set(JSON.parse(storage));
    }
  });
})(GF.model)

