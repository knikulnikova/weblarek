import { IApi, IOrder, IResponseData, IResponseOrder } from "../types/index.ts";

export class ApiData {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getData(): Promise<IResponseData> {
    return this.api.get("/product/");
  }

  sendData(data: IOrder): Promise<IResponseOrder> {
    return this.api.post("/order", data);
  }
}