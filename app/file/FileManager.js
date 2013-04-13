/**
 * Date: 13-4-13
 * Time: 下午6:32
 * @overview use file system to replace localStorage which cannot save dat persistently.
 * @author Meathill <meathill@gmail.com> (http://blog.meathill.com/)
 * @since 0.1
 */
;(function (ns) {
  var manager = {
    init: function () {

    },
    load: function (filename, success, fail) {

    },
    save: function (filename, success, fail) {

    }
  };
  ns.Manager = _.extend(manager, Backbone.Events);
}(GF.file));