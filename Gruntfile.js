module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.read('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      libs: {
        src: ['libs/cordova-2.7.0.js', 'libs/zepto.min.js', 'libs/underscore-min.js', 'libs/backbone-min.js', 'libs/handlebars.js'],
        dest: 'build/js/libs.js'
      },
      apps: {
        src: ['app/main.js', 'app/file/FileManager.js', 'app/utils/Utils.js', 'app/model/Summary.js', 'app/model/Record.js', 'app/view/About.js', 'app/view/Homepage.js', 'app/popup/PopupManager.js', 'app/popup/Intro.js', 'app/popup/Select.js', 'app/Router.js'],
        dest: 'build/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: 'build/js/app.min.map',
        compress: {
          global_defs: {
            'DEBUG': false
          },
          dead_code: true
        }
      },
      build: {
        src: 'build/js/app.js',
        dest: 'build/js/app.min.js'
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      minify: {
        files: {
          'build/css/style.css': ['css/ratchet.css', 'css/animate.css', 'css/style.css']
        }
      }
    },
    copy: {
      img: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**'],
          dest: 'build/img/',
          filter: function (src) {
            return src.substr(src.lastIndexOf('.') + 1) !== 'db';
          }
        }]
      },
      android: {
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**'],
          dest: 'android/assets/www/'
        }]
      }
    },
    replace: {
      html: {
        src: ['index.html'],
        dest: 'build/',
        replacements: [
          {
            from: /<!-- replace start -->[\S\s]+<!-- replace over -->/,
            to: '<link rel="stylesheet" href="css/style.css" />\n<script src="js/libs.js"></script>\n<script src="js/app.min.js"></script>'
          }
        ]
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'copy:img', 'replace', 'copy:android']);
};