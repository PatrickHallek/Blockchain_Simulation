export interface Blockchain {
  previousHash: String;
  timestamp: String;
  transactions: Transaction[];
  hash: String;
  nonce: Number;
}

export interface Transaction {
  fromAddress: String;
  toAddress: String;
  amount: Number;
}
