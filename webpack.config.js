var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zitcher.min.js',
    libraryTarget: 'umd',
    library:'zitcher',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  optimization: {
    minimize: true,
  },
  mode: 'production',
}