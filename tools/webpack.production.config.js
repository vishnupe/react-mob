var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),
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
    path: path.join(__dirname, '../build/'),
    filename: 'client.min.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: false }),
    new HtmlWebpackPlugin({
      template: 'index.html.prod.template'
    })
  ],
};
