module.exports = (route, app) => app.loopback.Router().use(`/${route}`, routes(app))

function routes(app) {
  Client = app.models.Client
  const router = app.loopback.Router()
  router.use(require('../middlewares/auth.js')(app))
  router.get('/', getBooksForUser)
  return router
}

function getBooksForUser(req, res, next) {
  req.currentUser.books((err, books) => {
    res.json()
  })
}
