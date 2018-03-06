const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundlerAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const WHITE_LISTED_NODE_MODULES = ['material-ui/RaisedButton', 'react', 'react-dom'];

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[chunkhash].app.js',
    chunkFilename: '[chunkhash].vendor.js'
  },

  target: 'web',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, '/'),
    port: 9000,
    open: true
  },

  mode: 'development',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,            
        loader: 'source-map-loader'
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    },
    minimize: true
  },

  plugins: [
    new CleanWebpackPlugin(['dist/*.app.*'], {
      beforeEmit: true,
      verbose: true
    }),
    new HtmlWebpackPlugin({
      title: 'An App',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './index.html'
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // can be used to split up files if/when using http2
  ]
};