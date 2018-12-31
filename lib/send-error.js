
module.exports = function sendError (res, err) {
  console.error(err || 'Unspecified error');
  let message = (err && err.toString) ? err.toString() : (err || 'Unspecified error');
  if (res) {
    res.status(500).json({
      ok: false,
      error: true,
      message,
    });
  }
};
