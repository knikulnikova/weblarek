import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Cart {
  private cartProducts: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getCartProducts(): IProduct[] {
    return this.cartProducts;
  }

  addCartProduct(product: IProduct): void {
    this.cartProducts.push(product);
    this.events.emit('cart:changed');
  }

  deleteCartProduct(product: IProduct): void {
    const index: number = this.cartProducts.indexOf(product);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
      this.events.emit('cart:changed');
    }
  }

  removeCart(): void {
    this.cartProducts = [];
    this.events.emit('cart:changed');
  }

  getTotal(): number {
    return this.cartProducts.reduce((sum, elem) => {
      return sum + (elem.price ?? 0);
    }, 0);
  }

  getCount(): number {
    return this.cartProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.cartProducts.some((elem) => elem.id === id);
  }
}
