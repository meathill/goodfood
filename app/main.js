$(function () {
  'use strict';
  R.record = new GF.model.Record();
  R.summary = new GF.model.Summary();
  R.about = new GF.view.About({
    el: '.about'
  });
  R.homepage = new GF.view.Homepage({
    el: '.main',
    source: R.record,
    model: R.summary
  });
  R.router = new GF.Router();
  Backbone.history.start({
    root: '/goodfood/'
  });

  $('#appLoadingIndicator').remove();
  $('.main').removeClass('hide');
});
var GF = { // namespace
      model: {},
      view: {},
      utils: {}
    },
    R = {}; // runtime