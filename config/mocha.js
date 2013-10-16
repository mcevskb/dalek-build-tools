module.exports = {
  test: {
    options: {
      reporter: 'spec',
      require: 'coverage/blanket'
    },
    src: '<%= src.test %>'
  },
  coverage: {
    options: {
      reporter: 'html-cov',
      quiet: true,
      captureFile: 'report/coverage/index.html'
    },
    src: '<%= src.test %>'
  },
  jsoncoverage: {
    options: {
      reporter: 'json-cov',
      quiet: true,
      captureFile: 'report/coverage/coverage.json'
    },
    src: '<%= src.test %>'
  }
};