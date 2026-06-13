import { IProduct } from "../../types/index.ts";

export class Catalog {
  private products: IProduct[] = [];
  private card: IProduct | null = null;

  setProducts(products: IProduct[]): void {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProduct(id: string): IProduct | null {
    return this.products.find((elem) => elem.id === id) ?? null;
  }

  setCard(card: IProduct): void {
    this.card = card;
  }

  getCard(): IProduct | null {
    return this.card;
  }
}
