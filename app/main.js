'use strict';
$(function () {
  function init() {
    $('#appLoadingIndicator').remove();
    $('.main').removeClass('hide');
    Backbone.history.start({
      root: '/goodfood/'
    });
  }
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