require('dotenv').config();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let isProd = process.env.NODE_ENV !== 'development';
let apiProxy = process.env.port ? `http://localhost:${process.env.port}` : 'http://localhost';
console.log("WEBPACK: " + JSON.stringify({apiProxy, isProd}));

const common = {
  entry: [
    path.resolve(__dirname, 'src/client'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  devServer: {
    hot: !isProd,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.resolve(__dirname, 'build'),
    proxy: {
      '/api': apiProxy,
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'client': 'src/client/app'
    }
  },
  module: {
    rules: [
      // JSX files
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'sourceMap': true
            }
          }
        ],
      },
      // SCSS files
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src/client'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/client/public'),
      ignore: 'index.html'
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/public/index.html'),
      inject: 'body'
    }),
  ]
};

if(isProd) {
  module.exports = merge(common, {
    mode: 'production',
    output: {
      filename: 'js/[name].[chunkhash].js',
    },
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  })
} else { // dev server
  module.exports = merge(common, {
    mode: 'development',
    output: {
      filename: 'js/[name].js',
    },
    devtool: 'eval-source-map',
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
