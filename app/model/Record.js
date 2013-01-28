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
          days = [];
      for (var i = 1; i < 3; i++) {
        var thisModel = this.get(GF.utils.formatDate(GF.utils.calculateDate(date, i), 'yyyy-mm-dd'));
        if (thisModel) {
          days.push(thisModel);
        } else {
          break;
        }
      }
      if (nextModel) {
        foods = foods.concat(this.getFoodsByDay(nextModel));
        days.push(nextModel);
        nnextModel = this.get(GF.utils.formatDate(GF.utils.calculateDate(date, 2), 'yyyy-mm-dd'));
        if (nnextModel) {
          foods = foods.concat(this.getFoodsByDay(nnextModel));
          days.push(nnextModel);
        }
      }
      if (prevModel) {
        foods = this.getFoodsByDay(prevModel).concat(foods);
        days.unshift(nextModel);
        pprevModel = this.get(GF.utils.formatDate(GF.utils.calculateDate(date, -2), 'yyyy-mm-dd'));
        if (pprevModel) {
          foods = this.getFoodsByDay(pprevModel).concat(foods);
          days.unshift(pprevModel);
        }
      }
      var count = vcount = 0,
          last = foods[0] > 2;
      for (var i = 1, len = foods.length; i < len; i++) {
        var curr = foods[i] > 2;
        if (curr === last) {
          (curr ? count : vcount) += 1;
        }
        if (curr) {
          if (vcount >= 6) {
            
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
              day: GF.utils.WEEKDAYS[i],
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


