import server from '.spat/modules/server'
import config from '.spat/modules/config'

if (config.basic && config.basic.enabled) {
  var auth = require('basic-auth');

  server.use((req, res, next) => {
    const user = auth(req);

    if (user && user.name === config.basic.name && user.pass === config.basic.pass) {
      return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="SECRET AREA"');
    return res.status(401).send();
  });
}

server.start();