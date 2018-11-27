
let { isAbsolute, join } = require('path')
  , { access, constants: { W_OK }, mkdir, writeFile } = require('fs')
  , { series, parallel } = require('async')
  , opn = require('opn')
  , debug = require('debug')('supine')
  , server = require('./lib/server')
  , makeErrorReporter = require('./lib/error-reporter')
;

module.exports = function supine ({ dir = '.', port = 8888, create = false, open = false }, cb) {
  if (!isAbsolute(dir)) dir = join(process.cwd(), dir);
  debug(`Processing ${dir}`);

  maybeCreate(dir, create, (err) => {
    if (err) {
      console.error(err);
      process.exit(42);
    }
    server(dir, port, (err, app, channel) => {
      if (err) return cb(err);
      let reportError = makeErrorReporter(channel)
        , address = `http://localhost:${port}/`
      ;
      maybeOpen(address, open, (err) => {
        if (err) reportError(err);
        cb();
      });
    });
  });
};

function maybeCreate (dir, create, cb) {
  let done = () => process.nextTick(cb);
  if (!create) return done();
  series(
    [
      ok => {
        access(dir, W_OK, (err) => {
          if (err) return mkdir(dir, { recursive: true }, ok);
          ok();
        });
      },
      ok => {
        let conf = join(dir, 'supine.json');
        access(conf, W_OK, (err) => {
          if (err) {
            let defaultConfiguration = {
                  title:    'As Yet Untitled Opus',
                  path:     'index.html',
                  children: [],
                }
              , defaultIndex = `<main></main>`
            ;
            parallel(
              [
                next => writeFile(conf, JSON.stringify(defaultConfiguration, null, 2), 'utf8', next),
                next => writeFile(join(dir, 'index.html'), defaultIndex, 'utf8', next),
              ],
              ok
            );
          }
          else ok();
        });
      },
    ],
    done
  );
}

function maybeOpen (address, open, cb) {
  let done = () => process.nextTick(cb);
  if (!open) return done();
  opn(address);
  done();
}
