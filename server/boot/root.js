module.exports = function(server) {
  var router = server.loopback.Router();
  // TODO: get pages list programmatically
  var pages = ['/', '/profile', '/storage', '/book/:id', '/tags/:id?', 'connections'];
  router.get(pages, (req, res) => res.render('index'));
  server.use(router);
};
