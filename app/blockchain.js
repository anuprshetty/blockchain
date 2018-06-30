import Block from "./block.js";
import cryptoHash from "./crypto-hash.js";

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const prevBlock = this.chain[this.chain.length - 1];

    const newBlock = Block.mineBlock({
      data,
      prevBlock,
    });

    this.chain.push(newBlock);
  }
}

export default Blockchain;
