const MINE_RATE = 1000; // in milliseconds
const INITIAL_DIFFICULTY = 10;
const GENESIS_DATA = {
  timestamp: 1,
  data: ["block_genesis"],
  prevHash: "000",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  hash: "123",
};

export { GENESIS_DATA, MINE_RATE };
