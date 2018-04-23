const path = require('path');
// Modules
const sass = require('./wp_modules/sass.js');
// Plugins
const jQuery = require('./wp_plugins/jquery');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      sass
    ]
  },
  plugins: [
    jQuery
  ]
};