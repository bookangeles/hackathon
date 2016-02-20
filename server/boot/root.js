module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/', (req, res) => res.render('index'));
  server.use(router);
};
