'use strict'

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// # Create a config file from the sample one if config.js doesn't exist yet
try {
  fs.openSync(path.join(process.cwd(), 'config.js'), 'r');
} catch(e) {
  var configString = fs.readFileSync(path.join(process.cwd() + '/config-sample.js'));
  fs.writeFileSync(path.join(process.cwd() + '/config.js'), configString);
}
var config = require('./config.js');

// # Export all of the webpack configuration
module.exports = {
  port: config.port,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?plugins=jsx-control-statements/babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  },
};
