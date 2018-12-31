
let { join } = require('path')
  , express = require('express')
  , SSEChannel = require('sse-channel')
  , debug = require('debug')('supine')
  , sendError = require('./send-error')
  , app = express()
  , channel = new SSEChannel({
      historySize:  50,
      pingInterval: 60 * 1000, // 60s, longer than normal, don't do it too much
      jsonEncode:   true,
    })
;

module.exports = function server (dir, port, cb) {
  debug(`Setting up server for ${dir} at ${port}`);
  app.get('/sse/git-status', (req, res) => {
    channel.addClient(req, res);
  });
  // tree
  app.get('/api/tree', (req, res) => {
    res.sendfile('supine.json', { root: dir }, (err) => {
      if (err) return sendError(res, err);
    });
  });

  // static
  app.use(express.static(join(__dirname, '../public')));
  app.use(express.static(dir));

  app.listen(port, (err) => {
    if (err) return cb(err);
    debug(`Server listening…`);
    cb(null, app, channel);
  });
};
