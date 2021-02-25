const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.timestamp = Date.now();
        this.previousHash = previousHash;
        this.hash = this.getHash();
    }
    getHash() {
        return SHA256(this.previousHash + this.timestamp +
            JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.blockchain = [new Block("Genesis Block", '')];
    }
    getLastBlock() {
        return this.blockchain[this.blockchain.length-1];
    }
    createBlock(data) {
        this.blockchain.push(new Block(data, this.getLastBlock().hash));
    }
    isBlockchainValid() {
        for (let i=1; i<this.blockchain.length; i++) {
            let currentBlock = this.blockchain[i];
            let previousBlock = this.blockchain[i-1];
            if ((currentBlock.previousHash !== previousBlock.hash) ||
                (currentBlock.hash !== currentBlock.getHash())) {
                return false;
            }
        }
        return true;
    }
}

myChain = new Blockchain();
console.log('\n-----\nNew blockchain created');
console.log(myChain);
myChain.createBlock("first set of transaction data");
console.log('\n-----\nAdded a block');
console.log(myChain);
myChain.createBlock("another set of transaction data");
console.log('\n-----\nAdded another block');
console.log(myChain);

console.log('Is the chain valid: ' + myChain.isBlockchainValid());
myChain.blockchain[1].data = "changed set of transactions";
console.log('Modified transaction data in a block');
console.log('Is the chain valid: ' + myChain.isBlockchainValid());

