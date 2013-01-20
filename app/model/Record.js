;(function (ns) {
  'use strict';
  var today = new Date(),
      Model = Backbone.Model.extend({
        idAttribute: 'date',
        defaults: {
          b: 0, // 早餐breakfast
          l: 0, // 午餐lunch
          m: 0, // 晚餐meal
          level: 0, // 三餐平均
          date: 0, // 月.日
          day: 0 // 周几
        }
      });
  
  ns.Record = Backbone.Collection.extend({
    currentWeek: null,
    model: Model,
    initialize: function () {
      var storage = localStorage.getItem('days');
      this.currentWeek = new Backbone.Collection();
      this.currentWeek.on('change', this.week_changeHandler, this);
      
      if (!storage) {
        return;
      }
      this.reset(JSON.parse(storage));
    },
    getWeek: function (offset) {
      offset = offset || 0;
      this.currentWeek.reset();
      var day = today.getDay();
      for (var i = 0; i < 7; i++) {
        var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (day - offset * 7 - i)),
            cid = GF.utils.formatDate(date, 'yyyymmdd'),
            model = this.get(cid) ? this.get(cid) : new Model({
              id: cid,
              date: GF.utils.formatDate(date, 'mm.dd'),
              day: GF.utils.WEEKDAYS[i],
            });
        if (offset === 0 && day === i) {
          model.set('today', true);
        }
        this.currentWeek.add(model);
      }
      return this.currentWeek;
    },
    week_changeHandler: function (model) {
      if (this.indexOf(model) !== -1) {
        return;
      }
      this.add(model);
    }
  });
})(GF.model);


