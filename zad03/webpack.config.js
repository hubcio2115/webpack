const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '.', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new ImageminPlugin({
      disable: process.env.NODE_ENV === 'production',
      test: './src/images/**',
      plugins: [
        imageminMozjpeg({
          quality: 100,
          progressive: true,
        }),
      ],
    }),
  ],
};
