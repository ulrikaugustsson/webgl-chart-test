const webpack = require('webpack')
module.exports = {
  entry: {
    app: [ './src/index.ts' ]
  },
  output: {
    filename: 'bundle.js'
  },
  context: __dirname,
  node: {
    __filename: true
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      // use ES2015 on this app
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript'
      },
      // allow third-party glslify/browserify modules to work
      {
        test: /node_modules/,
        loader: 'ify'
      }
    ],
    // allow local glslify/browserify config to work
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'ify'
      }
    ]
  }
}