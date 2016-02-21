const 
  path = require('path'),
  _ = require('lodash')

module.exports = function(Client) {
  Client.beforeRemote('create', function(context, unused, next) {
    if (~['bezengi@gmail.com'
        , 'boris362@yandex.ru'
        , 'kotovivan@gmail.com'
        , 'normalno@gmail.com'].indexOf(_.get(context.req.body.email)))
      return next()
    
    Client.app.models.Share.find({
        where: {
          recipient: _.get(context, 'req.body.email')
        }
      }, (err, accounts) => {
        next(err
            ? err
            : !accounts.length
              ? new Error('Forbidden', 'Access denied, вас тут не ждут :(', 403)
              : null)
        })
  })

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
      if (err) return next(err)
      context.res.render('index')
    })
  })
}
