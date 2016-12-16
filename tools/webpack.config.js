var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),
  devtool: 'sourcemap',
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  },
  output: {
    path: __dirname,
    filename: 'client.min.js'
  },

  plugins: [new HtmlWebpackPlugin({
    template: 'index.html.template'
  })]
};
