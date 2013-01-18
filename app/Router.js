/**
 * 路由
 * @param {type} ns 命名空间，在main.js里定义
 */
;(function (ns) {
  ns.Router = Backbone.Router.extend({
    routes: {
      'about': 'showAbout'
    },
    showAbout: function () {
      R.about.show();
    }
  });
})(GF);


