module.exports = function(app) {
  var router = app.loopback.Router();
  var pages = ['/', '/profile', '/storage', '/book/:id', '/tags/:id?', 'connections', '/form'];
  router.get(pages, (req, res) => res.render('index'));
  app.middleware('routes', router);
};
