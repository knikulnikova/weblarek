import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Catalog {
  private products: IProduct[] = [];
  private card: IProduct | null = null;

  constructor(protected events: IEvents) {}

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('catalog:changed');
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProduct(id: string): IProduct | null {
    return this.products.find((elem) => elem.id === id) ?? null;
  }

  setCard(card: IProduct): void {
    this.card = card;
    this.events.emit('catalog:card-changed');
  }

  getCard(): IProduct | null {
    return this.card;
  }
}
