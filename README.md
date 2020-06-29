# async_node_redis

Use [node_redis](https://github.com/NodeRedis/node-redis) in modern ways.

## Introduction

node_redis is a widely used Redis client for Node.js. It has a very extensible interface and is written in pure JS. It's a little long in the tooth as well - it uses error-first callbacks which makes it a pain to integrate with a promise or async / await script. Until now :cue dramatic music:

## How it works

async_node_redis is a shim that makes node_redis graceful in async / await scripts. When I say shim - I mean it: it's tiny - ~39 lines of code. Instead of re-implementing anything, it relies on [Proxy Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) and [Reflection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect). This means if you look at the objects, they look like node_redis objects _because they are_. 

## Usage

Use as you would node_redis, but without callbacks:
```
const client = asyncNodeRedis.createClient();
(async () => {
  await client.set('test1','123');
  let foo = await client.get('test1');
  console.log(foo)
})();
```

It even works with `multi` / `exec`: 
```
const client = asyncNodeRedis.createClient();
(async () => {
  let results = await client.multi()
    .get('foo')
    .get('bar')
    .exec();
  console.log(results)
})();
```
