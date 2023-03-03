const express = require("express");
const redis = require("redis");
const PORT = process.env.port || 1235;
const app = express();
const axios = require("axios");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", function (error) {
  console.error("redis error ---->", error);
});

app.get("/api/todos", async (req, res) => {
  const cachedData = await redisClient.get("todos");
  if (cachedData) {
    res.json({data: cachedData, cache: true});
  } else {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    redisClient.set("todos", data);
    res.json({data: data, cache: false});
  }
});

app.get("/api/test", async (req, res) => {
  try {
    const data = await redisClient.get("bob");
    if (data) {
      res.json({data: data, cache: true});
    } else {
      redisClient.set("bob", "my name is bob");
      res.json({data: "no data found in cache", cache: false});
    }
  } catch (error) {
    res.send({ error: error });
  }
});

app.listen(PORT, async () => {
  console.log(`server is listening to port ${PORT}`);
  await redisClient.connect();
});
