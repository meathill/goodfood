/**
 * Date: 13-4-13
 * Time: 下午6:32
 * @overview use file system to replace localStorage which cannot save dat persistently.
 * @author Meathill <meathill@gmail.com> (http://blog.meathill.com/)
 * @since 0.1
 */
;(function (ns) {
  function onFileSystemSuccess(fileSystem) {
    fs = fileSystem;
    manager.trigger('init');
  }
  function onError(error) {
    console.log('file system error: ');
    console.log(error);
  }
  var fs,
  manager = {
    init: function () {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024 * 1024, onFileSystemSuccess, onError);
    },
    load: function (filename, success, fail) {
      fs.root.getFile(filename, {create: false}, function (fileEntry) {
        function filed(file) {
          var reader = new FileReader();
          reader.onloadend = function (event) {
            success(event.target.result);
          }
          reader.readAsText(file);
        }
        fileEntry.file(filed, onError);
      }, fail)
    },
    save: function (filename, content) {
      fs.root.getFile(filename, {create: true, exclusive: false}, function (fileEntry) {
        fileEntry.createWriter(function (writer) {
          writer.onwriteend = function () {
            console.log('write over');
          }
          writer.write(content);
        }, onError);
      }, onError);
    }
  };
  ns.Manager = _.extend(manager, Backbone.Events);
}(GF.file));