/**
 * 路由
 * @param {type} ns 命名空间，在main.js里定义
 */
;(function (ns) {
  'use strict';
  ns.Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout',
      'homepage': 'showHomepage',
      'popup/:popup': 'showPopup'
    },
    showAbout: function () {
      R.about.show();
    },
    showHomepage: function () {
      R.about.hide();
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


