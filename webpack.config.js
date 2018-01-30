/* global __dirname, process */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const nodePackage = require('./package.json');

const PORT = 4200;
const PATHS = {
  src: path.resolve(__dirname, 'client'),
  themes: path.resolve(__dirname, 'client', 'themes'),
  stores: path.resolve(__dirname, 'client', 'stores'),
  pages: path.resolve(__dirname, 'client', 'pages'),
  mocks: path.resolve(__dirname, 'client', 'mocks'),
};

const formatDefineString = value => {
  if (value === undefined || value === null) {
    return 'null';
  }
  return JSON.stringify(value);
};

const WebpackConfig = () => {
  const config = {};
  const isDev = process.env.NODE_ENV === 'dev';

  // CONFIG
  config.entry = './client/app.js';

  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
    publicPath: '',
  };

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: PORT,
    historyApiFallback: true,
    overlay: true,
    stats: 'errors-only',
  };

  config.devtool = isDev ? 'eval-source-map' : 'source-map';

  config.resolve = {
    extensions: ['.js', '.jsx', '.css', '.pcss', '.scss'],
    alias: {
      theme: PATHS.themes,
      stores: PATHS.stores,
      pages: PATHS.pages,
      mocks: PATHS.mocks,
    },
  };

  config.module = {
    rules: [
      {
        test: /\.json$/i,
        loader: 'json-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
        include: [
          path.join(__dirname, './node_modules/mdi'),
          path.join(__dirname, './node_modules/roboto-npm-webfont'),
        ],
        query: {
          name: 'resources/fonts/[hash].[ext]',
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)($|\?)/i,
        loader: 'file-loader',
        include: [PATHS.src],
        query: {
          name: 'resources/images/[hash].[ext]',
        },
      },
      { test: /\.html$/, exclude: /node_modules/, use: 'html-loader' },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, './node_modules/mdi'),
          path.join(__dirname, './node_modules/roboto-npm-webfont'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.s?css$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, './node_modules/react-toolbox/lib'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: false,
              },
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                // Provide path to the file with resources
                resources: './client/themes/global.scss',
              },
            },
          ],
        }),
      },
    ],
  };

  config.plugins = [
    new HtmlWebpackPlugin({
      title: 'New Build',
      template: './client/index.html',
      favicon: './favicon.ico',
      inject: 'body',
      hash: true,
      minify: { collapseWhitespace: true },
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: isDev,
      allChunks: true,
    }),
    new webpack.IgnorePlugin(/\.\/locale$/),
  ];

  if (!isDev) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
      new webpack.DefinePlugin({
        BUILD_CONFIG: {
          ENV: formatDefineString('production'),
          DEBUG: false,
          PACKAGE: {
            DIRECTORY: formatDefineString('mock'),
            NAME: formatDefineString(nodePackage.name),
            DESCRIPTION: formatDefineString(nodePackage.description),
            VERSION: formatDefineString(nodePackage.version),
          },
          CP_COMMS: {
            APPLICATION_ID: formatDefineString('7230a3ca-eb03-4bad-a198-9ae9858195cd'),
            APPLICATION_NAME: formatDefineString('swcallback'),
          },
        },
      }),
    );
  }

  if (isDev) {
    config.plugins.push(
      new CopyWebpackPlugin([{ from: PATHS.mocks, to: 'mock' }]),
      new webpack.DefinePlugin({
        BUILD_CONFIG: {
          DEBUG: true,
          PACKAGE: {
            DIRECTORY: formatDefineString('mock'),
            NAME: formatDefineString(nodePackage.name),
            DESCRIPTION: formatDefineString(nodePackage.description),
            VERSION: formatDefineString(nodePackage.version),
          },
          CP_COMMS: {
            APPLICATION_ID: formatDefineString('7230a3ca-eb03-4bad-a198-9ae9858195cd'),
            APPLICATION_NAME: formatDefineString('swcallback'),
          },
        },
      })
    );
  }
  return config;
};

module.exports = WebpackConfig;
