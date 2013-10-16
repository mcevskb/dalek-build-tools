/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

  // release a new version
  grunt.registerTask('release-package', function () {
    var done = this.async();
    var http = require('http');
    var pkg = grunt.config.get('pkg');
    var body = '';

    http.get('http://registry.npmjs.org/' + pkg.name, function(res) {
      res.on('data', function (data) {
        body += data;
      });

      res.on('end', function () {
        var versions = grunt.util._.pluck(JSON.parse(body).versions, 'version');
        var currVersion =  parseInt(pkg.version.replace(/\./gi, ''), 10);
        var availableVersions = versions.map(function (version) {
          return parseInt(version.replace(/\./gi, ''), 10);
        });

        if (!grunt.util._.contains(availableVersions, currVersion)) {
          var npm = require('npm');
          npm.load({}, function() {
            npm.registry.adduser(process.env.npmuser, process.env.npmpass, process.env.npmmail, function(err) {
              if (err) {
                grunt.log.error(err);
                done(false);
              } else {
                npm.config.set('email', process.env.npmmail, 'user');
                npm.commands.publish([], function(err) {
                  grunt.log.ok('Released new version: ', pkg.version);
                  done(!err);
                });
              }
            });
          });
        } else {
          done();
        }
      });
    });
  });

};