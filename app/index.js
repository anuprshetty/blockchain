import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import request from "request";
import Blockchain from "./blockchain.js";
import PubSub from "./publishSubscribe.js";

const app = express();

const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

app.use(bodyParser.json());

app.get("/api/chain/", (req, res) => {
  res.json(pubsub.blockchain.chain);
});

app.post("/api/mine_block/", (req, res) => {
  const { data } = req.body;

  pubsub.blockchain.addBlock({ data });
  pubsub.broadcastChain();

  res.json(pubsub.blockchain.chain);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on PORT:${process.env.APP_PORT}\n`);
  syncChain();
});
