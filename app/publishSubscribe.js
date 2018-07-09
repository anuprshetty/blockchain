import redis from "redis";

const CHANNELS = {
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

    this.publisher = redis.createClient({
      url: `redis://${process.env.REDIS_SERVER_HOST}:${process.env.REDIS_SERVER_PORT}`,
    });
    this.subscriber = redis.createClient({
      url: `redis://${process.env.REDIS_SERVER_HOST}:${process.env.REDIS_SERVER_PORT}`,
    });

    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }
}

export default PubSub;
