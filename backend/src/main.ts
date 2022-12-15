import * as http from "http";
import * as dotenv from "dotenv";

import { Tinkoff } from "./tinkoff/index.js";
import { Firebase } from "./firebase.js";
import { App } from "./app.js";
import * as api from "./api/index.js";

const main = () => {
  dotenv.config();
  const app: App = new App(
    new Tinkoff(process.env["TERMINALKEY"]),
    new Firebase()
  );

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const body: Uint8Array[] = [];
    if (req.method == "POST")
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          const payload = Buffer.concat(body).toString();
          let request;
          try {
            request = JSON.parse(payload);
          } catch (_) {
            res.end();
            return;
          }
          let response;
          if (url.pathname == "/api/order/create/") {
            response = api.order.create(request, app);
          } else {
            res.end();
            return;
          }
          if (response === undefined) {
            res.end();
            return;
          }
          const response_body = JSON.stringify(response);
          res.write(response_body);
          res.end();
        });
    res.end();
  });
  server.on("clientError", (err, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });
  server.listen(6580);
};

main();
