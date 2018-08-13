import Blockchain from "./blockchain.js";

const blockchain = new Blockchain();

console.log(
  `Genesis Block: ${JSON.stringify(
    blockchain.chain[blockchain.chain.length - 1]
  )}`
);

blockchain.addBlock({ data: "block_initial" });
console.log(
  `Initial Block: ${JSON.stringify(
    blockchain.chain[blockchain.chain.length - 1]
  )}`
);

let prevBlock, currentBlock, timeInterval, totalTimeInterval, averageMineRate;
const timeIntervals = [];

for (let i = 1; i <= 1000; i++) {
  prevBlock = blockchain.chain[blockchain.chain.length - 1];

  blockchain.addBlock({ data: `block_${i}` });

  currentBlock = blockchain.chain[blockchain.chain.length - 1];

  timeInterval = currentBlock.timestamp - prevBlock.timestamp;
  timeIntervals.push(timeInterval);

  totalTimeInterval = 0;
  for (const interval of timeIntervals) {
    totalTimeInterval += interval;
  }
  averageMineRate = totalTimeInterval / timeIntervals.length;

  console.log(
    `Block ${i}) MineTime: ${timeInterval}ms, Difficulty: ${currentBlock.difficulty}, Nonce: ${currentBlock.nonce}, averageMineRate: ${averageMineRate}ms`
  );
}
