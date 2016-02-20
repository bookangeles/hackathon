module.exports = function(Client) {
  Client.beforeRemote('create', function(context, unused, next) {
    console.log(context.req.body)
    next();
  });
};
