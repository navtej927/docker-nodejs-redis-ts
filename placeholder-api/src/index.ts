import express, { Express, Request, Response } from "express";
import { createClient } from "redis";
import morgan from "morgan";

const PORT = process.env.port || 1235;

const app: Express = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("connected to redis successfully!");
});

redisClient.on("error", function (error) {
  console.error("redis error ---->", error);
});

app.get("/api/todos", async (_req: Request, res: Response) => {
  try {
    const cachedData = await redisClient.get("todos");
    if (cachedData) {
      res.json({ data: JSON.parse(cachedData), cache: true });
    } else {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      redisClient.set("todos", JSON.stringify(data));
      res.json({ data: data, cache: false });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/api/todo/:id", async (_req: Request, res: Response) => {
  try {
    const { id } = _req.params;
    console.log("idididididid", id)
    const cachedData = await redisClient.get(`todo-${id}`);
    if (cachedData) {
      res.json({ data: JSON.parse(cachedData), cache: true });
    } else {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await response.json();
      redisClient.set(`todo-${id}`, JSON.stringify(data));
      res.json({ data: data, cache: false });
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/test", async (_req: Request, res: Response) => {
  try {
    const data = await redisClient.get("bob");
    if (data) {
      res.json({ data: data, cache: true });
    } else {
      redisClient.set("bob", "my name is bob");
      res.json({ data: "no data found in cache", cache: false });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

app.listen(PORT, async () => {
  console.log(`server is listening to port ${PORT}`);
  await redisClient.connect();
});
