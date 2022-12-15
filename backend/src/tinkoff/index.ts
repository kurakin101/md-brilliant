import { Payment } from "./payment.js";

class Tinkoff {
  TerminalKey: string;
  payments: Array<Payment>;

  constructor(TerminalKey: string) {
    this.TerminalKey = TerminalKey;
    this.payments = [];
  }
  CreatePayment() {
    let payment = new Payment(this.TerminalKey);
    this.payments.push(payment);
    return payment;
  }
}

export { Tinkoff, Payment };
