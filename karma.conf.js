const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    reporters: ['dots'],
    singleRun: false,
    autoWatch: true,
    browsers: ['Chrome'],
    files: ['./src/**/*.spec.js*'],
    preprocessors: {
      './src/**/*.spec.js*': ['webpack']
    },
    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          loader: 'babel?presets[]=react',
          include: path.join(__dirname, 'src')
        }]
      },
      resolve: { extensions: ['', '.js', '.jsx'] }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
