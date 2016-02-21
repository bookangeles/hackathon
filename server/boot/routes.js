module.exports = function(app) {
  var routes = ['books', 'tags'];
  routes.forEach(route =>
    app.middleware('routes', require(`../routes/${route}`)(route, app)));
};
