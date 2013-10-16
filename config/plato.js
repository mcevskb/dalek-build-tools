module.exports = function (jshint) {
  var config = {
  	generic: {
	  options: {
	    jshint: jshint
	  },
	  files: {
	    'report/complexity': '<%= src.complexity %>',
	  }
  	}
  };

  return config;
}