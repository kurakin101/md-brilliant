import { initializeApp, App } from "firebase/app";
import { Database, getDatabase, ref, set, child, get } from "firebase/database";
import { Order, OrderIdT, ProductIdT,Product } from "./app.js";

const firebaseConfig = {
  databaseURL:
    "https://mdbrilliant-1a48b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyDwZLdKO7D20Zj96JGU4tt738UT70YzVyQ",
  authDomain: "mdbrilliant-1a48b.firebaseapp.com",
  projectId: "mdbrilliant-1a48b",
  storageBucket: "mdbrilliant-1a48b.appspot.com",
  messagingSenderId: "571179454157",
  appId: "1:571179454157:web:10cc3aea854cc4d952e384",
  measurementId: "G-C5KDGXGE4Y",
};

class Firebase {
  app: App;
  db: Database;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
  }
  SetOrder(order: Order) {
    let ordersRef = ref(this.db, "orders");
    get(ordersRef).then((orders) => {
      if (orders.exists()) {
        let orders_val = orders.val();
        for (let i = 0; i < orders_val.length(); i++) {
          if (orders_val[i].OrderId == order.OrderId) {
            orders_val[i] = order;
            set(ordersRef, orders_val);
            return;
          }
        }
        orders_val.push(order);
        set(ordersRef, orders_val);
      }
    });
  }
  async GetOrder(OrderId: OrderIdT): Promise<Order | null> {
    let ordersRef = ref(this.db, "orders");
    let res = await get(ordersRef);
    if (!res.exists()) return null;
    let orders: Order[] = res.val();
    for (let order of orders) {
      if (order.OrderId == OrderId) return order;
    }
    return null;
  }
  async GetProduct(ProductId: ProductIdT): Promise<Product | null> {
    let productsRef = ref(this.db, "products");
    let res = await get(productsRef);
    if (!res.exists()) return null;
    let products: Product[] = res.val();
    for (let product of products) {
      if (product.ProductId == ProductId) return product;
    }
    return null;
  }
}

export { Firebase };
