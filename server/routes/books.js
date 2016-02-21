module.exports = (route, app) => app.loopback.Router().use(`/${route}`, routes(app))

function routes(app) {
  Client = app.models.Client
  const router = app.loopback.Router()
  router.use(require('../middlewares/auth.js')(app))
  router.get('/', getBooks)
  router.post('/', uploadBook)
  return router
}

function getBooks(req, res, next) {
  req.currentUser.books((err, books) => {
    books.owner
  })
}

function uploadBook(req, res, next) {
  req.currentUser.books((err, books) => {
    books.owner
  })
}
