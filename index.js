class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  //balance will be modified in trasactions
  get balance() {
    let balance = 0;
    for (const i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
//transactions will require an account to take from
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  //keep track of the time of each transaction
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Deposit(10, myAccount);
console.log('Transaction 1:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

const t2 = new Withdrawal(50.25, myAccount);
console.log('Transaction 2:', t2.commit());

const t3 = new Withdrawal(9.99, myAccount);
console.log('Transaction 3:', t3.commit());



const t4 = new Deposit(120.00, myAccount);
console.log('Transaction 4:', t4.commit());
console.log(t2.value);
console.log('Account Transaction History: ', myAccount.transactions);
