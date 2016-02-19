Repo for the [https://github.com/webpack/karma-webpack/issues/104](https://github.com/webpack/karma-webpack/issues/104) issue.

`npm run test`

If you change an extension for the index.spec.js file to 'jsx', a resulting bundle doesn't have a link to a sourcemap `//# sourceMappingURL=index.spec.js.map` as the last line of code.

It doesn't matter if the file actually has jsx syntax, even if it has, everything works correctly except a link to a sourcemap is not present.

Source files can have any extension, it doesn't affect presence of a link to a sourcemap.

karma.conf.js:
````javascript
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
````
src/index.jsx:
````javascript
require('react');
module.exports = function () { return <div/>; };
````
src/index.spec.js:
````javascript
var expect = require('chai').expect;
var component = require('./index');

describe('component', function () {
  it('should test', function () { expect(component).to.be.ok; });
});
````
