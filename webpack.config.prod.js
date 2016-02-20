var
  _ = require('lodash'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

function getSourceMapPublicPath(info) { // TBD
  return '/get/source?path=' + info.resourcePath;
}

module.exports = function(params) {
  var
    config = [
      {
        resolve: {
          root: [
            __dirname + '/client/'
          ],
          extentions: [ 'js' ]
        },
        output: {
          path: __dirname + '/public/compiled/',
          filename: '[name].js',
          publicPath: '/compiled/'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            comments: /[^\s\S]/
          })
        ]
      }
    ];

  function productify(argPars) {
    return _.extend(_.cloneDeep(argPars), {
      devtool: 'source-map',
      output: _.extend(params.output, {
        sourceMapFilename: './[file].map',
        devtoolModuleFilenameTemplate: getSourceMapPublicPath,
        devtoolFallbackModuleFilenameTemplate: getSourceMapPublicPath
      }),
      plugins: params.plugins.concat([
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          comments: /[^\s\S]/
        })
      ])
    });
  }

  config.push(productify(params));
  
  return config;
};
