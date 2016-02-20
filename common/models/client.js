module.exports = function(Client) {
  Client.beforeRemote('create', function(context, unused, next) {
    //todo: check if user is invited or has shares
    next();
  });
};
