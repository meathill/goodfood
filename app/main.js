$(function () {
  if (DEBUG) {
    onDeviceReady();
    return;
  }
  document.addEventListener('deviceready', onDeviceReady, false);
  document.addEventListener('backbutton', function () {
    if (location.hash === '#/about') {
      R.router.navigate('#/homepage');
    } else {
      navigator.app.exitApp();
    }
  }, false);
});
function onDeviceReady() {
  'use strict';
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
    collection: record.getWeek(),
    model: summary
  });
  R.router = new GF.Router();

  Backbone.history.start({
    root: '/goodfood/'
  });
  $('#appLoadingIndicator').remove();
}
var GF = { // namespace
      file: {},
      model: {},
      view: {},
      utils: {},
      popup: {}
    },
    R = {}; // runtime
