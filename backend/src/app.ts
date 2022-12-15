import { Tinkoff } from "./tinkoff/index.js";
import { Payment } from "./tinkoff/payment.js";
import { Firebase } from "./firebase.js";
import { createHash } from "crypto";

type ProductIdT = string;
type UserIdT = number;
type OrderIdT = string;

interface Product {
  Amount: number;
  ProductId: ProductIdT;
}

interface Order {
  Payment: Payment;
  Amount: number;
  ProductId: ProductIdT;
  OrderId: OrderIdT;
}

class App {
  tinkoff: Tinkoff;
  firebase: Firebase;
  orders: Order[];
  constructor(tinkoff: Tinkoff, firebase: Firebase) {
    this.tinkoff = tinkoff;
    this.firebase = firebase;
  }
  GetProduct(ProductId: ProductIdT): Product {
    return {
      Amount: 100,
      ProductId: ProductId,
    };
  }
  CreateOrder(ProductId: ProductIdT, UserId: UserIdT): Order {
    const OrderId = createHash("sha256")
      .update(ProductId + UserId + new Date().toJSON())
      .digest("hex");
    const Product = this.GetProduct(ProductId);
    return {
      Amount: Product.Amount,
      OrderId: OrderId,
      ProductId: ProductId,
      Payment: this.tinkoff.CreatePayment(),
    };
  }
}

export type { ProductIdT, UserIdT, OrderIdT };
export { Order, Product, App };
