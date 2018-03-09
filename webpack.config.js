var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'matcher.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  optimization: {
    minimize: true,
  },
  mode: 'production',
}