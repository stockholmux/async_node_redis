const asyncNodeRedis = require('../index.js');

const client = asyncNodeRedis.createClient({
  port : 6379
});
const client2 = asyncNodeRedis.createClient({
  port : 8888
});

(async () => {
  await client.set('test1','123');
  await client2.set('test1',456);
  
  console.log(await client.get('test1'));
  console.log(await client2.get('test1'));
})();