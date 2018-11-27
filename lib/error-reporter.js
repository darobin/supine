
// this currently just prints error, but the idea is that is should be able to send SSE errors too
module.exports = function makeErrorReporter (channel) {
  return (err) => {
    console.error(err);
    channel.send({ error: err }); // XXX: I have no idea if this is correct
  };
};
