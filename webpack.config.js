var
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  globals = require('./webpack.globals.json'),
  pages = require('./webpack.pages.json'),
  hybrids = require('./webpack.hybrids.json'),

  params = {
    progress: true,
    entry: 'spa': 'main/main.jsx',

    module: {
      loaders: [
      {
        name: 'clientjs',
        test: /\.jsx?$/,
        include: __dirname + '/client/',
        loaders: [ 'babel' ],
      }, {
        name: 'styl',
        test: /\.styl$/,
        include: __dirname + '/client/',
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!stylus-loader?sourceMap='),
      }, {
        name: 'fe-pics',
        test: /\.(jpe?g|png|svg)$/,
        include: __dirname + '/client/',
        loaders: [ 'file?name=[path][name].[ext]?[hash]' ],
      } ],
    },
    resolve: {
      root: [
        __dirname + '/client/'
      ],
      extentions: [ '', 'js', 'jsx', 'styl' ],
    },
    output: {
      path: __dirname + '/public/compiled/',
      filename: '[name].js',
      publicPath: '/public/compiled/',
    },
    plugins: [
      new webpack.ProvidePlugin(globals)
    ],
    postcss: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  };

module.exports = {
    'default': require('./webpack.config.dev'),
    'production': require('./webpack.config.prod'),
    'payture': require('./webpack.config.payture')
  }[process.env['NODE_ENV'] || 'default'](params);
