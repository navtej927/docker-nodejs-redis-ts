"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const axios = require("axios");
const PORT = process.env.port || 1235;
const app = (0, express_1.default)();
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
redisClient.on("connect", () => {
    console.log("connected to redis successfully!");
});
redisClient.on("error", function (error) {
    console.error("redis error ---->", error);
});
app.get("/api/todos", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield redisClient.get("todos");
    if (cachedData) {
        res.json({ data: cachedData, cache: true });
    }
    else {
        const { data } = yield axios.get("https://jsonplaceholder.typicode.com/todos");
        redisClient.set("todos", data);
        res.json({ data: data, cache: false });
    }
}));
app.get("/api/test", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisClient.get("bob");
        if (data) {
            res.json({ data: data, cache: true });
        }
        else {
            redisClient.set("bob", "my name is bob");
            res.json({ data: "no data found in cache", cache: false });
        }
    }
    catch (error) {
        res.send({ error: error });
    }
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`server is listening to port ${PORT}`);
    yield redisClient.connect();
}));
