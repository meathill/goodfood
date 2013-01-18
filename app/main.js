$(function () {
  R.about = new GF.view.About({
    el: '.about'
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