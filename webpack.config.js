const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  LoaderOptionsPlugin,
} = webpack;
const {
  CommonsChunkPlugin,
  UglifyJsPlugin,
} = webpack.optimize;

const ENV = process.env.NODE_ENV || process.env.ENV || 'development';

// common rules

const ruleBabel = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        'es2015',
        'es2016',
        'es2017',
        'react',
      ],
      plugins: [
        ['transform-decorators-legacy'],
        ['transform-class-properties'],
      ],
    },
  },
};

const ruleLessDevelopment = {
  test: /\.less$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    { loader: 'less-loader', options: { } },
  ],
};

const ruleLessProduction = {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: { sourceMap: true, importLoaders: 1 },
    }, {
      loader: 'less-loader',
      options: {
        sourceMap: true,
      },
    }],
  }),
};

const ruleImages = {
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240,
      absolute: true,
      name: 'images/[path][name]-[hash:7].[ext]',
    },
  },
};

const ruleFonts = {
  test: /\.(woff|woff2|ttf|svg|eot)$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240,
      name: 'fonts/[name]-[hash:7].[ext]',
    },
  },
};

// common plugins

const pluginWebpackHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.ejs',
});

const pluginVendorChunk = new CommonsChunkPlugin({
  name: 'vendor',
  minChunks(module) {
    return module.context && module.context.indexOf('node_modules') !== -1;
  },
});

const pluginExtractStyles = new ExtractTextPlugin('styles.[chunkhash].css');

// production plugins

const pluginUglify = new UglifyJsPlugin({
  sourceMap: true,
});

const pluginMinimize = new LoaderOptionsPlugin({
  minimize: true,
});

// webpack config

const webpackConfig = {
  entry: './src/demo/index.jsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      ruleBabel,
      ruleImages,
      ruleFonts,
    ],
  },

  plugins: [
    pluginWebpackHtml,
    pluginVendorChunk,
  ],
};

if (ENV === 'development') {
  webpackConfig.devtool = 'inline-source-map';

  webpackConfig.module.rules = webpackConfig.module.rules.concat([
    ruleLessDevelopment,
  ]);

  webpackConfig.plugins = webpackConfig.plugins.concat([
  ]);
} else if (ENV === 'production') {
  webpackConfig.devtool = 'hidden-source-map';

  webpackConfig.module.rules = webpackConfig.module.rules.concat([
    ruleLessProduction,
  ]);

  webpackConfig.plugins = webpackConfig.plugins.concat([
    pluginUglify, pluginMinimize,
    pluginExtractStyles,
  ]);
}

module.exports = webpackConfig;
