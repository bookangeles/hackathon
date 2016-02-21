var
  _ = require('lodash'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

function getSourceMapPublicPath(info) { // TBD
  return '/get/source?path=' + info.resourcePath;
}

module.exports = function(params) {

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

  return productify(params);
};
