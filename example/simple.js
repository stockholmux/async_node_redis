const asyncNodeRedis = require('../index.js');
const client = asyncNodeRedis.createClient();
(async () => {
  await client.set('test1','123');
  await client.set('test2',456);
  let goofoo = await client.get('test1');
  let foogoo = await client.get('test2');
  console.log(goofoo,foogoo)
})();