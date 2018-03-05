const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundlerAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const WHITE_LISTED_NODE_MODULES = ['material-ui/RaisedButton', 'react', 'react-dom'];

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  target: 'node',

  externals: [nodeExternals({
    'whitelist': WHITE_LISTED_NODE_MODULES
  })],

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000
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
        loader: 'awesome-typescript-loader'
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
          test: function(...args) {
            const regexp = new RegExp(`node_modules/(${WHITE_LISTED_NODE_MODULES.toString().replace(/,/g, '|')})`, 'g');
            console.log(regexp, file);
            return regexp.test(file);
          },
          name: 'vendor',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  plugins: [
    new BundlerAnalyzerPlugin()
  ]
};