;(function (ns) {
  'use strict';
  var Model = Backbone.Model.extend({
    defaults: {
      b: 0, // 早餐breakfast
      l: 0, // 午餐lunch
      m: 0, // 晚餐meal
      date: 0, // 日期，距离1970年1月1日起的日期
    }
  })
  ns.model = ns.model || {};
  ns.model.Record = Backbone.Collection.extend({
    model: Model,
    initialize: function () {
      var storage = window.localStorage.getItem('goodfood'),
          data = storage ? JSON.parse(storage) : [];
      this.reset(data);
      this.from = this.at(0).get(date);
      this.today = Math.ceil((new Date()).getTime() /  86400000);
    },
    getSummary: function () {
      return new Backbone.Model();
    },
    getWeek: function () {
      
    },
  });
})(GF);


