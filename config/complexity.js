module.exports = {
  generic: {
    src: '<%= src.complexity %>',
    options: {
      cyclomatic: 10,
      halstead: 23,
      maintainability: 80
    }
  }
};