module.exports = function (paths) {
  var config = {
  	compile: {
      name: '<%= pkg.name %>',
      description: '<%= pkg.description %>',
      version: '<%= pkg.version %>',
      url: '<%= pkg.homepage %>',
      options: {
        paths: (paths || '.'),
        outdir: 'report/api'
      }
    }
  };

  return config;
};