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

  async handleMessage(channel, message) {
    const chain = JSON.parse(message);

    console.log(
      `Recieved Message:\nChannel: ${channel}\nMessage: ${JSON.stringify(
        chain,
        null,
        2
      )}\n`
    );

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(chain);
    }
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }
}

export default PubSub;
