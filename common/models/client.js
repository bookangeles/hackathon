var path = require('path');

module.exports = function(Client) {
  Client.beforeRemote('create', function(context, unused, next) {
    
    next();
  });
   
  Client.afterRemote('create', function(context, user, next) {
    user.verify({
      type: 'email',
      to: user.email,
      from: 'bookangeles.com@gmail.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    }, function(err, response, next) {
      if (err) return next(err);
      context.res.render('index');
    });
  });
};
