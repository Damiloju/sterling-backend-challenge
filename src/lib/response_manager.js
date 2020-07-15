const success = (res, status, message, data) => {
  //this guides against an eslint and prettier auto formatting
  const m;
  return res.status(status).json({
    message,
    ...data,
  });
};

const error = (res, status, err) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(status).json({ error: err.message });
};

module.exports.success = success;

module.exports.error = error;
