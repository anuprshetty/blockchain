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

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, data, prevHash, difficulty, nonce, hash } = chain[i];

      const realPrevHash = chain[i - 1].hash;
      if (prevHash !== realPrevHash) {
        return false;
      }

      const validatedHash = cryptoHash(
        timestamp,
        data,
        prevHash,
        difficulty,
        nonce
      );
      if (hash !== validatedHash) {
        return false;
      }

      const prevDifficulty = chain[i - 1].difficulty;
      if (Math.abs(difficulty - prevDifficulty) > 1) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
