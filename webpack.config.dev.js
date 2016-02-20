var
  _ = require('lodash'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(params) {
  var
    entries = _.map(params.entry, function(page) {
      return [
        'webpack-dev-server/client?http://localhost:3003',
        'webpack/hot/only-dev-server',
        page,
      ];
    }),
    loaders = [].concat(params.module.loaders);

  _.findWhere(loaders, { name: 'clientjs' }).loaders.unshift('react-hot');
  _.findWhere(loaders, { name: 'styl' }).loader = 'style!css!postcss!stylus';

  return _.extend(params, {
    cache: true,
    devtool: 'eval',
    entry: entries,
    debug: true,
    output: _.extend(params.output, {
      publicPath: 'http://localhost:3003' + params.output.publicPath,
    }),
    module: {
      loaders: loaders,
    },
    devServer: {
      watchOptions: {
        aggregateTimeout: 200,
      },
      publicPath: 'http://localhost:3003/public/compiled',
      contentBase: 'http://localhost',
      hot: true,
      port: 3003,
      stats: {
        hash: false,
        cached: false,
        cachedAssets: false,
        assets: false,
        colors: true,
      },
    },
    plugins: params.plugins.concat([
      new ExtractTextPlugin('[name].css'),
      new webpack.HotModuleReplacementPlugin()
    ]),
  });
};
