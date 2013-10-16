/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

  // prepare files & folders for grunt:plato & coverage
  grunt.registerTask('preparePlato', function () {
    var fs = require('fs');
    var options = this.options();
    var cwd = process.cwd();

    // generate dirs for docs & reports
    options.folders.forEach(function (path) {
      if (!fs.existsSync(cwd + '/' + path)) {
        fs.mkdirSync(cwd + '/' + path);
      }
    });

    // store some dummy reports, so that grunt plato doesnt complain
    options.files.forEach(function (file) {
      if (!fs.existsSync(cwd + '/report/complexity/' + file)) {
        fs.writeFileSync(cwd + '/report/complexity/' + file, '{}');
      }
    });
  });

};