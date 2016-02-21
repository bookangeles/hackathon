module.exports = (route, app) => app.loopback.Router().use(`/${route}`, routes(app))

var _ = require('lodash')

function routes(app) {
  const router = app.loopback.Router()
  router.use(require('../middlewares/auth.js')(app))
  router.get('/', getBooks)
  router.post('/', uploadBook(app))
  return router
}

function getBooks(req, res, next) {
  req.currentUser.books((err, books) => {
    if (err) return next(err)
    res.json(books)
  })
}

function uploadBook(app) {
  return function (req, res, next) {
    var saveToDb = () => {
      var book = req.file
      console.log(book)
      app.models.Book.create({
        owner: req.currentUser.id,
        fileName: book.originalname,
        fileFormat: book.mimetype,
        fileSize: book.size,
        fileUrl: book.path,
        title: req.body.title,
        author: req.body.author,
        note: req.body.note,
        createdAt: Date.now(),
      }, (err, book) =>
        err ? next(err) : res.json(book))
    }
    require('../lib/storage')(req, res,
      (err => err ? next(err) : saveToDb()))
  }
}
