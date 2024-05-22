const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: path.resolve('./my-webpack-loader.js')
      // }
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: 'url-loader',
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000 // 20Kb
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
      Build Date : ${new Date().toLocaleString()}

      Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
      Author : ${childProcess.execSync('git config user.name')}
      `
    }),
    new webpack.DefinePlugin({
      TWO: '1+1',
      'api.domain': JSON.stringify('http://dev.api.domain.com')
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      }
    })
  ]
};
