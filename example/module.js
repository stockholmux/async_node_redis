const asyncNodeRedis = require('../index.js');

asyncNodeRedis.addCommand('ft.info');

const client = asyncNodeRedis.createClient();
(async () => {
  try {
    let results = await client.ft_info(Math.random());
  } catch (err) {
    console.log(`Should be an unknown index: ${err.toString()}`);
  }
  client.quit();
})();