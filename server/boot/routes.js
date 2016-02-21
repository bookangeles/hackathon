module.exports = function(app) {
  var routes = [ 'books' ]
  routes.forEach(route =>
    app.middleware('routes', require(`../routes/${route}`)(route, app)))
}
