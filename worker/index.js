const keys = require("./keys");
const redis = require("redis");

// Create Redis Client objects
const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});

// On error print to console
redisClient.on("error", (err) => console.log(err));
// stand-alone connection for subscribing to a channel
// once established you can subscribe and unsubscribe as needed
const subscribe = redisClient.duplicate();
subscribe.connect();

subscribe.subscribe("insert", async (message, channel) => {
  await redisClient.connect();
  await redisClient.hSet("values", message, fib(parseInt(message)));
  await redisClient.quit();
});
// Basic solution to fib number
// Takes index and returns its value
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}
