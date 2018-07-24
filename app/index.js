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

const MAIN_NODE_URL = `http://localhost:3000/api/chain/`;

const syncChain = () => {
  request({ url: `${MAIN_NODE_URL}` }, (error, reposnse, body) => {
    if (!error && reposnse.statusCode === 200) {
      const chain = JSON.parse(body);
      pubsub.blockchain.replaceChain(chain);

      console.log(
        `\nInitial blockchain synchronization is successful!\nSynced chain: ${JSON.stringify(
          pubsub.blockchain.chain,
          null,
          2
        )}\n`
      );
    } else {
      console.error("Initial blockchain synchronization is failed.\n");
    }
  });
};

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on PORT:${process.env.APP_PORT}\n`);
  syncChain();
});
