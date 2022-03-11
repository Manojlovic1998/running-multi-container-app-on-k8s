const keys = require("./keys");
// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// New express app setup
const app = express();

// Wire up cross origin resource sharing
// Allows us to make request form one domain
// on which the React application is ran to a completely different
// domain or different port on which the express app is hosted on
app.use(cors());

// The body parser lib is going to parse incoming requests from the
// React application and turn the body of the post request into a json
// value that express api can work with
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

// Redis Setup
const redis = require("redis");
const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});

// A publisher which will send messages via channel
const redisPublisher = redisClient.duplicate();
// Express Route Handlers

// Test route
app.get("/", (req, res) => {
  res.send("Hi!");
});

// Query and return all of the values/indices that have ever been
// submitted to the postgres instance.
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});

// Return values/indices that have been submitted to backend through Redis
app.get("/values/current", async (req, res) => {
  await redisClient.connect();
  const values = await redisClient.hGetAll("values");
  res.send(values);
  await redisClient.quit();
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  // Check if the value of index is not too high
  // preventing worker lockout
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }
  await redisClient.connect();
  await redisClient.hSet("values", index, "Nothing yet!");
  await redisClient.quit();
  // Publish message
  await redisPublisher.connect();
  await redisPublisher.publish("insert", index);
  await redisPublisher.quit();

  await pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
  res.send({ working: true });
});
// Listen on port

app.listen(5000, (err) => {
  console.log("Listening");
});
