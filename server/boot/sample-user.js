module.exports = function(app) {
  var Client = app.models.Client;
  var Share = app.models.Share;

  Client.create([
    {displayName: 'John', email: 'fj@j.com', password: 'sesame'}
  ], function (err, res) {
    if (err) return console.log('fail')
    console.log('user created', res)
  })

  Share.create([
    {owner: 1, recipient: 'j@j.com', type: 'book', value: 1}
  ], function (err, res) {
    if (err) return console.log('fail')
    console.log('Sahre created', res)
  })
};
