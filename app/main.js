$(function () {
  'use strict';
  function init() {
    $('#appLoadingIndicator').remove();
    $('.main').removeClass('hide');
    Backbone.history.start({
      root: '/goodfood/'
    });
  }
  var record = new GF.model.Record(),
      summary = new GF.model.Summary();
  record.on('change:level', function (model, value) {
    var target = value === 2 ? 'vege' : 'meat';
    if (model.previous('level') === 0) {
      summary.set('days', summary.get('days') + 1);
      summary.set(target, summary.get(target) + 1);
    } else {
      var old = value === 2 ? 'meat' : 'vege';
      summary.set(target, summary.get(target) + 1);
      summary.set(old, summary.get(old) - 1);
    }
  });
  R.record = record;
  R.summary = summary;
  R.about = new GF.view.About({
    el: '.about'
  });
  R.homepage = new GF.view.Homepage({
    el: '.main',
    source: record,
    model: summary
  });
  R.router = new GF.Router();

  var curr = (new Date()).getTime();
  if (curr - start > 1000) {
    init();
    return;
  } 
  setTimeout(init, 1000);
});
var GF = { // namespace
      model: {},
      view: {},
      utils: {},
      popup: {}
    },
    R = {}; // runtime