function capName(req, res, next) {
  req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)
  next();
}

module.exports = capName;