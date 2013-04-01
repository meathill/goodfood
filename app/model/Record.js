;(function (ns) {
  'use strict';
  var today = new Date(),
      Model = Backbone.Model.extend({
        defaults: {
          f1: 0, // 早餐breakfast
          f2: 0, // 午餐lunch
          f3: 0, // 晚餐meal
          level: 0, // 当日评价，1为素，2为荤
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
    checkDays: function (model, value) {
      // 因为要计算6餐饭的影响，所以只需要查前两天和后两天即可
      var date = new Date(model.id),
          days = [],
          foods = [];
      for (var i = 1; i < 3; i++) {
        var thisModel = this.get(GF.utils.formatDate(GF.utils.calculateDate(date, i), 'yyyy-mm-dd'));
        if (thisModel) {
          days.push(thisModel);
        } else {
          break;
        }
      }
      for (var i = -1; i > -3; i--) {
        var thisModel = this.get(GF.utils.formatDate(GF.utils.calculateDate(date, i), 'yyyy-mm-dd'));
        if (thisModel) {
          days.unshift(thisModel);
        } else {
          break;
        }
      }
      for (var i = 0, len = days.length; i < len; i++) {
        foods = foods.concat(this.getFoodsByDay(days[i]));
      }
      var count = 0,
          vcount = 0, // 连续肉或素
          is3meat = false,
          last = foods[0] > 2;
      for (var i = 0, len = foods.length; i < len; i++) {
        // 肉还是素
        var curr = foods[i] > 2;
        if (curr === last) { // 跟上次一样，连续数+1
          if (curr) {
            count += 1;
          } else {
            vcount += 1;
          }
        } else { // 不一样，清零
          count = vcount = 0;
          if (curr) {
            count = 1;
          } else {
            vcount = 1;
          }
        }
        last = curr;
        if (curr) {
          if (is3meat) {
            is3meat = false;
            days[i / 3 >> 0].set('level', 2);
          }
          is3meat = count >= 3;
        } else {
          if (vcount >= 3) {
            is3meat = false;
          }
          if (vcount >= 6) {
            days[i / 3 >> 0].set('level', 2);
          }
        }
      }
    },
    getFoodsByDay: function (model) {
      return _.values(_.pick(model, 'f1', 'f2', 'f3'));
    },
    getWeek: function (offset) {
      offset = offset || 0;
      this.currentWeek.reset();
      var day = today.getDay();
      for (var i = 0; i < 7; i++) {
        var date = GF.utils.calculateDate(today, day - offset * 7 - i),
            cid = GF.utils.formatDate(date, 'yyyy-mm-dd'),
            model = this.get(cid) ? this.get(cid) : new Model({
              id: cid,
              date: GF.utils.formatDate(date, 'mm.dd'),
              day: GF.utils.WEEKDAYS[i]
            });
        if (offset === 0 && day === i) {
          model.set('today', true);
        }
        this.currentWeek.add(model);
      }
      return this.currentWeek;
    },
    save: function () {
      localStorage.setItem('days', JSON.stringify(this.toJSON()));
    },
    week_changeHandler: function (model, value) {
      var level = model.get('f1') + model.get('f2') + model.get('f3');
      level = level < 7 ? 1 : 2; // 当日评价
      this.checkDays(model, value); // 检查连续6餐素或连续3餐荤
      model.set('level', level);
      if (this.indexOf(model) !== -1) {
        this.save();
        return;
      }
      this.add(model);
      this.save();
    }
  });
})(GF.model);


