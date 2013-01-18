$(function () {
  R.record = new GF.model.Record();
  R.about = new GF.view.About({
    el: '.about'
  });
  R.homepage = new GF.view.Homepage({
    el: '.main',
    collection: R.record
  });
  R.router = new GF.Router();
  Backbone.history.start({
    root: '/goodfood/'
  });

  $('#appLoadingIndicator').remove();
  $('.main').removeClass('hide');
});
var GF = {}, // namespace
    R = {}; // runtime