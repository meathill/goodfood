;(function (ns) {
  'use strict';
  var STORAGE = 'summary.json';
  ns.Summary = Backbone.Model.extend({
    defaults: {
      days: 0,
      percent: 0,
      level: '',
      desc: '未知',
      meat: 0,
      vege: 0
    },
    initialize: function () {
      this.on('change:meat change:vege', this.changeHandler, this);
    },
    fetch: function () {
      GF.file.Manager.load(STORAGE, function (storage) {
        this.set(JSON.parse(storage));
      });
    },
    getLevel: function (percent) {
      if (percent < 40) {
        return '#C00';
      } else if (percent < 60) {
        return '#CC0';
      } else if (percent < 80) {
        return '#11A106';
      } else if (percent < 90) {
        return '#CC0';
      } else {
        return '#C00';
      }
    },
    getDesc: function (percent) {
      if (percent < 40) {
        return '不健康';
      } else if (percent < 60) {
        return '需要蔬菜';
      } else if (percent < 80) {
        return 'Good';
      } else if (percent < 90) {
        return '需要肉类';
      } else {
        return '不健康';
      }
    },
    save: function () {
      GF.file.Manager.save(STORAGE, JSON.stringify(this.toJSON()));
    },
    changeHandler: function (model, value) {
      var percent = Math.round(this.get('vege') / this.get('days') * 100);
      this.set({
        percent: percent,
        level: this.getLevel(percent),
        desc: this.getDesc(percent)
      });
      this.save();
    }
  });
})(GF.model);

