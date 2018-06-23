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

  

  
}

export default Block;
