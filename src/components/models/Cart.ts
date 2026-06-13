import { IProduct } from "../../types/index.ts";

export class Cart {
  private cartProducts: IProduct[] = [];

  getCartProducts(): IProduct[] {
    return this.cartProducts;
  }

  addCartProduct(product: IProduct): void {
    this.cartProducts.push(product);
  }

  deleteCartProduct(product: IProduct): void {
    const index: number = this.cartProducts.indexOf(product);
    if (index !== -1) {
      this.cartProducts.splice(index, 1);
    }
  }

  removeCart(): void {
    this.cartProducts = [];
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
