var path = require('path')

module.exports = function(Client) {

  Client.disableRemoteMethod('upsert', true)
  Client.disableRemoteMethod('updateAll', true)
  Client.disableRemoteMethod('updateAttributes', false)
  Client.disableRemoteMethod('find', true)
  Client.disableRemoteMethod('findById', true)
  Client.disableRemoteMethod('findOne', true)
  Client.disableRemoteMethod('deleteById', true)
  Client.disableRemoteMethod('confirm', true)
  Client.disableRemoteMethod('count', true)
  Client.disableRemoteMethod('exists', true)
  Client.disableRemoteMethod('resetPassword', true)

  Client.beforeRemote('create', function(context, unused, next) {
    if (~['bezengi@gmail.com'
        , 'boris362@yandex.ru'
        , 'kotovivan@gmail.com'
        , 'normalno@gmail.com'].indexOf(_.get(context.req.body.email)))
      return next()

    Client.app.models.Shares.find({
        where: {
          recipient: _.get(context.req.body.email)
        },
        limit: 1
      }, (err, accounts) =>
        next(err
            ? err
            : !accounts.length
              ? new Error('Forbidden', 403, 'Access denied')
              : null))
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
