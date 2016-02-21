var multer = require('multer')

module.exports = multer({ storage : multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  })
}).single('book')
