module.exports = function(app) {
  var Client = app.models.Client;
  var Book = app.models.Book;

  Client.create([
    {displayName: 'Privet', email: 'fj@j.com', password: 'sesame'}
  ], function (err, res) {
    if (err) return console.log('fail')
    console.log('user created', res)
  })

  Book.create([
    {
      owner: 2,
      fileName: 'diploma.pdf',
      fileFormat: 'pdf',
      fileUrl: 'http://google.com/'
    },
    {
      owner: 1,
      fileName: 'diploma1.pdf',
      fileFormat: 'pdf',
      fileUrl: 'http://google.com/'
    },
    {
      owner: 1,
      fileName: 'diploma2.pdf',
      fileFormat: 'pdf',
      fileUrl: 'http://google.com/'
    }
  ], function (err, res) {
    if (err) return console.log('fail')
    console.log(Book(res))
  })
};
