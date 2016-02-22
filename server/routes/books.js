module.exports = (route, app) => app.loopback.Router().use(`/bapi/${route}`, routes(app))

var _ = require('lodash')

/*
Supported mimetypes:
application/epub+zip
application/msword
application/pdf
application/x-mobipocket-ebook
image/vnd.djvu
image/x-djvu
text/xml
 */
var SUPPORTED_MIME_TYPES = /(epub|msword|pdf|pdf|djvu|xml|mobipocket|ebook)/;

function routes(app) {
  const router = app.loopback.Router()
  router.use(require('../middlewares/auth.js')(app))
  router.get('/', getBooks)
  router.get('/search', searchBooks)
  router.get('/:id', downloadBook)
  router.post('/:id', updateBook)
  router.post('/', uploadBook(app))
  return router
}

function getBooks(req, res, next) {
  req.currentUser.books((err, books) => {
    if (err) return next(err)
    res.json(req.query.tag
      ? _.filter(books, (book) => ~book.tags.indexOf(req.query.tag))
      : books)
  })
}

function updateBook(req, res, next) {
  req.currentUser.books.updateAll(
    { id: req.params.id },
    _.pick(req.body, [ 'tags', 'author', 'note', 'title' ]),
    (err, book) => {
      if (err) return next(err)
      res.json(book)
    }
  )
}

function uploadBook(app) {
  return function (req, res, next) {
    var saveToDb = () => {
      var book = req.file
      if (!SUPPORTED_MIME_TYPES.test(book.mimetype))
        return unsupportedType(res, book.path)
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

function unsupportedType(res, path) {
  require('fs').unlink(path, (err) => {
    if (err) return res.sendStatus(500)
    return res.sendStatus(415)
  })
}

function downloadBook(req, res, next) {
  req.currentUser.books.findById(req.params.id, (err, book) => {
    if (err) return next(err);
    if (!book) return res.sendStatus(404);
    res.download(book.fileUrl, book.fileName);
  });
}

function searchBooks(req, res, next) {
  var pattern = new RegExp('.*' + req.query.q + '.*', "i");
  req.currentUser.books({ where:
    {
      or: [
        {fileName: {like: pattern}},
        {title: {like: pattern}},
        {author: {like: pattern}},
        {note: {like: pattern}}
      ]
    }
  }, (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
}
