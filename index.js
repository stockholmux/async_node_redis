const redis = require('redis');
const { promisify } = require('util');


const asyncRedis = new Proxy(redis, {
  get : function(obj,prop) {
    if (prop === 'createClient') {
      return function() {
        let client = Reflect.apply(obj[prop], obj, arguments);
        let prebound = {};

        const commandHandler = {
          get : function(obj,prop) {
            if (prebound[prop]) {
              return prebound[prop];
            } else if (typeof obj[prop] === 'function') {
              if (prop === 'multi') {
                return function() {
                  let out = Reflect.apply(obj[prop], obj, arguments);
                  out.exec = promisify(out.exec).bind(out);
                  out.EXEC = out.exec;
                  return out;
                }
              }
              prebound[prop] = promisify(obj[prop]).bind(client);
              return prebound[prop];
            }
            return obj[prop];
          }
        }
        return new Proxy(client, commandHandler);
      }
    }
    return obj[prop];
  }
})

module.exports = asyncRedis;