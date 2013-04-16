$(function () {
  if (DEBUG) {
    onDeviceReady();
    return;
  }
  document.addEventListener('deviceready', onDeviceReady, false);
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

  document.addEventListener('backbutton', function () {
    if (location.hash === '#/about') {
      R.router.navigate('#/homepage');
    } else {
      navigator.app.exitApp();
    }
  }, false);

  GF.file.Manager.on('init', function () {
    console.log('app start');
    if (navigator.hasOwnProperty('splashscreen')) {
      navigator.splashscreen.hide();
    }
    record.fetch();
    summary.fetch();

    $('#summary').css('line-height', document.body.clientHeight - 408 + 'px');
    $('#appLoadingIndicator').remove();
    $('.main').removeClass('hide');
    Backbone.history.start({
      root: '/goodfood/'
    });
  });
  GF.file.Manager.init();
}
var GF = { // namespace
      file: {},
      model: {},
      view: {},
      utils: {},
      popup: {}
    },
    R = {}; // runtime
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var LocalFileSystem = LocalFileSystem || {PERSISTENT: 1};
