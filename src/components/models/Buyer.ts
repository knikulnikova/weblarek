import { IBuyer, TPayment, TErrors } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Buyer {
  private payment: TPayment | null = null;
  private address: string = "";
  private phone: string = "";
  private email: string = "";

  constructor(protected events: IEvents) {}

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('buyer:changed');
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('buyer:changed');
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('buyer:changed');
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit('buyer:changed');
  }

  getBuyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  removeBuyerData(): void {
    this.payment = null;
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events.emit('buyer:changed');
  }

  validateData(): TErrors {
    const errors: TErrors = {};

    if (!this.payment) {
      errors.payment = "Выберите способ оплаты";
    }

    if (!this.email) {
      errors.email = "Укажите email";
    }

    if (!this.phone) {
      errors.phone = "Укажите телефон";
    }

    if (!this.address) {
      errors.address = "Укажите адрес доставки";
    }

    return errors;
  }
}
