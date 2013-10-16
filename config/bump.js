module.exports = function (configs) {
	var config = {
      options: {
        files: ['package.json'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: (configs.files || ['package.json']),
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: configs.pushTo
      }
    };

	return config;
};