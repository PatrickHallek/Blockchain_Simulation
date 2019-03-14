export interface Blockchain {
  previousHash: String;
  timestamp: String;
  transactions: Transaction[];
  hash: String;
  nonce: number;
}

export interface Transaction {
  fromAddress: String;
  toAddress: String;
  amount: number;
}
