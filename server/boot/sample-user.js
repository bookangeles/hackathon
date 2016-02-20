module.exports = function(app) {
  var Client = app.models.Client;

  Client.create([
    {displayName: 'John', email: 'j@j.com', password: 'sesame'}
  ], function (err, res) {
    if (err) return console.log('fail')
    console.log('user created', res)
  })
};
