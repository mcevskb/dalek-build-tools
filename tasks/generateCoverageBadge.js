/* jshint camelcase: false */
module.exports = function(grunt) {
  'use strict';

  // generates a coverage badge
  grunt.registerTask('generateCoverageBadge', function () {
    var fs = require('fs');
    if (fs.existsSync(__dirname + '/node_modules/coverage-badge')) {
      if (fs.existsSync(__dirname + '/report/coverage/coverage.json')) {
        var green = [147,188,59];
        var yellow = [166,157,0];
        var red = [189,0,2];

        var getColor = function (coverage) {
          if (coverage > 90) {
            return mixColors(yellow, green, (coverage-90)/10);
          }

          if (coverage > 80) {
            return mixColors(red, yellow, (coverage-80)/10);
          }

          return createColor(red);
        };

        var mixColors = function (from, to, ratio) {
          var result = [], i;
          for (i=0; i<3; i++) {
            result[i] = Math.round(from[i] + (ratio * (to[i]-from[i])));
          }
          return createColor(result);
        };

        var createColor = function (values) {
          return 'rgba('+values[0]+','+values[1]+','+values[2]+',1)';
        };

        var Badge = require(__dirname + '/node_modules/coverage-badge/lib/Badge.js');
        var badgeFn = function(coverage) {
          coverage = Math.floor(Number(coverage));
          var badge = new Badge({
            box_color: getColor(coverage),
            box_text: coverage+'%',
            label_text: 'cov',
            height: 18,
            width: 49,
            box_width: 25,
            rounding: 0,
            padding: 0,
            label_font: '7pt DejaVu Sans',
            box_font: 'bold 7pt DejaVu Sans'
          });
          return badge.stream();
        };

        var coverage = JSON.parse(fs.readFileSync(__dirname + '/report/coverage/coverage.json')).coverage;
        var file = fs.createWriteStream(__dirname + '/report/coverage/coverage.png');
        badgeFn(coverage).pipe(file);
      }
    }
  });

};