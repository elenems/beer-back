function errorHandler(req, res, next, err) {
  res.status(500).json({ message: err?.message });
}
module.exports = errorHandler;
