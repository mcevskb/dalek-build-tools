/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

  // archives the docs if a new version appears
  grunt.registerTask('archive', function () {
    var done = this.async();
    var options = this.options();
    var files = options.files || [options.file];

    grunt.util.spawn({cmd: 'git', args: ['describe', '--abbrev=0', '--tags']}, function (error, result) {
      var lastTag = result.toString();
      files.forEach(function (file) {
        if (grunt.file.isFile('_raw/docs/' + lastTag + '/' + file)) {
          grunt.log.ok('Nothing to archive');
          done();
          return true;
        }

        if (!grunt.file.isDir('_raw/docs/' + lastTag)) {
          grunt.file.mkdir('_raw/docs/' + lastTag);
        }

        grunt.file.copy('report/docs/' + file, '_raw/docs/' + lastTag + '/' + file);
        grunt.log.ok('Archived document with version: ' + lastTag);
      });

      done();
    });
  });

};