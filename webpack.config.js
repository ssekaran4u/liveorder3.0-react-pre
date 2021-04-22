var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.html$/, use: [{ loader: "html-loader", options: { minimize: true } }] },
      { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, use: "file-loader" }
    ]
  },
  resolve: {
      extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ]
};
