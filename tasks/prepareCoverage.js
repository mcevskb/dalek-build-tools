/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

  // prepare files & folders for coverage
  grunt.registerTask('prepareCoverage', function () {
    var fs = require('fs');
    var options = this.options();
    var cwd = process.cwd();

    // generate folders
    options.folders.forEach(function (folder) {
      if (!fs.existsSync(cwd + '/' + folder)) {
        fs.mkdirSync(cwd + '/' + folder);
      }
    });

    // generate code coverage helper file
    var coverageHelper = 'require("blanket")({pattern: ' + options.pattern + '});';
    if (!fs.existsSync(cwd + '/coverage/blanket.js')) {
      fs.writeFileSync(cwd + '/coverage/blanket.js', coverageHelper);
    }
  });

};