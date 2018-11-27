#!/usr/bin/env node

let supine = require('..')
  , commander = require('commander')
  , getPort = require('get-port')
;

commander
  .version(require('../package.json').version)
  .option('-o, --open', 'open in browser')
  .option('-c, --create', 'create if it doesn\'t exist')
  .option('-d, --dir <path>', 'the directory')
  .action((options = {}) => {
    getPort({ port: 8888 })
      .then(port => {
        options.port = port;
        supine(
          options,
          (err) => {
            if (err) console.error(err);
          }
        );
      })
      .catch(console.error)
    ;
  })
  .parse(process.argv)
;
