/**
 * 路由
 * @param {type} ns 命名空间，在main.js里定义
 */
;(function (ns) {
  ns.Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout',
      'popup/:popup': 'showPopup',
    },
    showAbout: function () {
      R.about.show();
    },
    showPopup: function (popup) {
      if (popup === 'close') {
        GF.view.PopupManager.close();
        return;
      }
      GF.view.PopupManager.popup('#' + popup);
    }
  });
})(GF);


