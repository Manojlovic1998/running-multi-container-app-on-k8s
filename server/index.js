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
  port: key.pgPort,
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
