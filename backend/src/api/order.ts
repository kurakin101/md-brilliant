import { App, UserIdT, ProductIdT, OrderIdT } from "../app.js";

interface ICreateRequest {
  ProductId: ProductIdT;
  UserId: UserIdT;
}
interface ICreateResponse {
  OrderId: string;
  PaymentURL: string;
}

const create = (body: unknown, app: App) => {
  if (body !== null && body !== undefined && typeof body === "object") {
    if (
      (<object>body).hasOwnProperty("ProductId") &&
      (<object>body).hasOwnProperty("UserId")
    )
      if (
        typeof (<ICreateRequest>body).ProductId === "string" &&
        typeof (<ICreateRequest>body).UserId === "number"
      ) {
        const request = <ICreateRequest>body;

        let order = app.CreateOrder(request.ProductId, request.UserId);
        order.Payment.Init(
          {
            TerminalKey: app.tinkoff.TerminalKey,
            Amount: order.Amount,
            OrderId: order.OrderId,
          },
          (resp) => {
            console.log(resp);
          }
        );
      } else return;
  } else {
    return;
  }
  return {};
};

export { create };
