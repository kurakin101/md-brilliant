// https://www.tinkoff.ru/kassa/develop/api/payments/
import { createHash } from "crypto";
import * as http from "https";

//17:15
interface Receipt {
  email: string | null;
  phone: string | null;
}

/*
 * O — одностадийная
 * T — двухстадийная
 */
enum PayType {
  O,
  T,
}

interface IPayment {
  TerminalKey: string; //Length = 20
  Token?: string; //SHA-256
}

interface IPaymentResponse {
  Success: boolean;
}
interface IPaymentErr extends IPaymentResponse {
  ErrorCode: string; //but number; default = "0"
  Message: string | null;
  Details: string | null;
}
interface IPaymentOk extends IPaymentResponse {
  TerminalKey: string;
}

//Payment.init
//https://www.tinkoff.ru/kassa/develop/api/payments/init-request/
interface IPaymentInit extends IPayment {
  Amount: number; //Up to 10 chars, in kopecks
  OrderId: string; //Up to 36 chars
  IP?: string; //Client's IP
  Description?: string;
  Language?: string; //ru or en
  /*Recurrent: char,
	CustomerKey: string, //Client's Id
	RedirectDueDate: datetime,
	NotificationURL:string,
	SuccessURL:string,
	FailURL: string,
	PayType: PayType,*/
  Receipt?: Receipt;
  DATA?: object;
}
//https://www.tinkoff.ru/kassa/develop/api/payments/init-response/
interface IPaymentInitResponse extends IPaymentOk {
  Amount: number;
  OrderId: string;
  Status: string | null;
  PaymentId: number;
  PaymentURL: string | null;
}

//Payment.GetState
//https://www.tinkoff.ru/kassa/develop/api/payments/getstate-request/
interface IPaymentGetState extends IPayment {}
//https://www.tinkoff.ru/kassa/develop/api/payments/getstate-response/
interface IPaymentGetStateResponse extends IPaymentResponse {}

interface IPaymentConfirm extends IPayment {}
interface IPaymentCancel extends IPayment {}

class Payment {
  initialized: boolean;
  TerminalKey: string;
  PaymentId: number;
  constructor(TerminalKey: string) {
    this.TerminalKey = TerminalKey;
    this.initialized = false;
    this.PaymentId = 0;
  }
  GenToken(payload: IPayment): string {
    let TokenData = "";
    for (let [_, value] of Object.entries(payload).sort()) {
      TokenData += value;
    }
    return createHash("sha256").update(TokenData).digest("hex");
  }
  Send<T extends IPayment, R extends IPaymentResponse, E extends IPaymentErr>(
    url: string,
    payload: T,
    callback: (resp: R | E) => void
  ): void {
    if (payload.Token === undefined) payload.Token = this.GenToken(payload);
    const body = JSON.stringify(payload);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    };
    // @ts-ignore
    let req = http.request(url, options, (response) => {
      let data = "";
      response.on("data", (chunk: string) => {
        data += chunk;
      });
      response.on("end", () => {
        let resp = <IPaymentResponse>JSON.parse(data);
        if (resp.Success) return callback(<R>resp);
        else return callback(<E>resp);
      });
    });
    req.write(body);
    req.end();
  }
  Init(
    payload: IPaymentInit,
    callback: (resp: IPaymentInitResponse | IPaymentErr) => void
  ): void {
    return this.Send(
      "https://securepay.tinkoff.ru/v2/Init",
      payload,
      (resp: IPaymentInitResponse | IPaymentErr) => {
        this.initialized = resp.Success;
        if (resp.Success)
          this.PaymentId = (<IPaymentInitResponse>resp).PaymentId;
        return callback(resp);
      }
    );
  }
  GetState(callback: (resp: IPaymentGetStateResponse | IPaymentErr) => void) {
    return this.Send(
      "https://securepay.tinkoff.ru/v2/GetState",
      {
        TerminalKey: this.TerminalKey,
        PaymentId: this.PaymentId,
      },
      callback
    );
  }
}
export {
  Receipt,
  IPayment,
  IPaymentInit,
  IPaymentConfirm,
  IPaymentCancel,
  Payment,
};
