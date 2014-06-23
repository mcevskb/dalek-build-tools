_ = require('lodash');

/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

    // releases a new canary build
  grunt.registerTask('release-canary', function () {
    var done = this.async();
    var pkg = grunt.config.get('pkg');
    var canaryPkg = _.clone(pkg, true);
    var options = this.options();
    var cwd = process.cwd();
    var fileContents = {};

    // modify the package json
    Object.keys(canaryPkg.dependencies).forEach(function (pack) {
      if (pack.search('dalek') !== -1) {
        delete canaryPkg.dependencies[pack];
        canaryPkg.dependencies[pack + '-canary'] = 'latest';
      }
    });
    canaryPkg.name = canaryPkg.name + '-canary';
    canaryPkg.version = canaryPkg.version + '-' + grunt.template.today('yyyy-mm-dd-HH-MM-ss');
    grunt.file.write('package.json', JSON.stringify(canaryPkg, true, 2));

    // iterate over the given array of files to edit
    options.files.forEach(function (file, idx){
      fileContents[idx] = {old: grunt.file.read(file), canary: grunt.file.read(file)};
      Object.keys(pkg.dependencies).forEach(function (pack) {
        if (pack.search('dalek') !== -1) {
          fileContents[idx].canary = fileContents[idx].canary.replace(pack, pack + '-canary');
        }
      });
      grunt.file.write(file, fileContents[idx].canary);
    });

    var npm = require('npm');
    npm.load({}, function() {
      npm.registry.adduser(process.env.npmuser, process.env.npmpass, process.env.npmmail, function(err) {
        if (err) {
          grunt.log.error(err);
          grunt.file.write('package.json', JSON.stringify(pkg, true, 2));
          options.files.forEach(function (file, idx){
            grunt.file.write(file, fileContents[idx].old);
          });
          done(false);
        } else {
          npm.config.set('email', process.env.npmmail, 'user');
          npm.commands.publish([], function(err) {
            grunt.file.write('package.json', JSON.stringify(pkg, true, 2));
            options.files.forEach(function (file, idx){
              grunt.file.write(file, fileContents[idx].old);
            });
            grunt.log.ok('Published canary build to registry');
            done(!err);
          });
        }
      });
    });
  });

};
