import Block from "./block.js";
import cryptoHash from "./crypto-hash.js";

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
}

export default Blockchain;
