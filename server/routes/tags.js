module.exports = (route, app) => app.loopback.Router().use(`/bapi/${route}`, routes(app))

var _ = require('lodash')

function routes(app) {
  const router = app.loopback.Router()
  router.use(require('../middlewares/auth.js')(app))
  router.get('/', getTags)
  router.post('/', createTag)
  return router
}

function getTags(req, res, next) {
  req.currentUser.tags((err, books) => {
    if (err) return next(err)
    res.json(books)
  })
}

function createTag(req, res, next) {
  req.currentUser.tags.create(req.body, (err, tag) => {
    if (err) return next(err)
    res.json(tag)
  })
}
