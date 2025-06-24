//webpack.config.js
const path = require('path');

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'module.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
