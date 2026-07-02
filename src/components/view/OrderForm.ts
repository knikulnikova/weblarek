import { ensureElement, ensureAllElements } from "../../utils/utils";
import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export type TOrderForm = Pick<IBuyer, "payment" | "address">;

export class OrderForm extends Form<TOrderForm> {
  protected paymentButtons: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container);

    this.paymentButtons = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.container,
    );

    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    this.paymentButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.events.emit("form:input", {
          form: this.container.getAttribute("name"),
          payment: button.name
        });
      });
    });
  }

  set payment(value: TPayment | null) {
    this.paymentButtons.forEach((button) => {
      button.classList.toggle("button_alt-active", value === button.name);
    });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
