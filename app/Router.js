/**
 * 路由
 * @param {type} ns 命名空间，在main.js里定义
 */
;(function (ns) {
  'use strict';
  ns.Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout',
      'popup/:popup': 'showPopup'
    },
    showAbout: function () {
      R.about.show();
    },
    showPopup: function (popup) {
      if (popup === 'close') {
        GF.popup.Manager.close();
        return;
      }
      GF.popup.Manager.popup(popup);
    }
  });
})(GF);


