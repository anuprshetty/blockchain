import hexToBinary from "hex-to-binary";
import { GENESIS_DATA, MINE_RATE } from "./config.js";
import cryptoHash from "./crypto-hash.js";

class Block {
  constructor({ timestamp, data, prevHash, difficulty, nonce, hash }) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ data, prevBlock }) {
    const prevHash = prevBlock.hash;

    let timestamp, difficulty, hash;
    let nonce = 0;
    do {
      timestamp = Date.now();
      nonce++;

      difficulty = Block.adjustDifficulty({
        timestamp,
        originalBlock: prevBlock,
      });

      hash = cryptoHash(timestamp, data, prevHash, difficulty, nonce);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty({ timestamp, originalBlock }) {
    const prevDifficulty = originalBlock.difficulty;
    if (prevDifficulty < 1) {
      return 1;
    }

    const currentMineRate = timestamp - originalBlock.timestamp;
    if (currentMineRate > MINE_RATE) {
      return prevDifficulty - 1;
    } else {
      return prevDifficulty + 1;
    }
  }
}

export default Block;
