module.exports = app => (req, res, next) => {
  if (!req.accessToken) return res.sendStatus(401)
  app.models.Client.findById(req.accessToken.userId, (err, user) => {
    if (err) return res.sendStatus(404)
    req.currentUser = user
    next()
  })
}
