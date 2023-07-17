function notFound(req, res, next) {
  res.status(404);

  const error = new Error('Not found', req.originalUrl);

  next(error);
}

function errorHandler(err, req, res, _next) {
  res.status(res.statusCode || 500);

  res.json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
