const asyncNodeRedis = require('../index.js');

const client = asyncNodeRedis.createClient();
(async () => {
  await client.set('test1','123');
  await client.set('test2',456);
  

  let valuesResults = await client.multi()
    .get('test1')
    .get('test2')
    .exec();
  console.log(valuesResults)
})();