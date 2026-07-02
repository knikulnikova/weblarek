import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  list: HTMLElement[];
  totalPrice: number;
  orderButtonDisabled: boolean;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected orderButton: HTMLButtonElement;
  protected totalPriceElement: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.orderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.totalPriceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );

    this.orderButton.addEventListener("click", () => {
      this.events.emit("basket:order");
    });
  }

  set list(items: HTMLElement[]) {
    if (items.length) {
      this.listElement.replaceChildren(...items);
    } else {
      this.listElement.replaceChildren(
        createElement("p", { textContent: "Корзина пуста" }),
      );
    }
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }

  set orderButtonDisabled(value: boolean) {
    this.orderButton.disabled = value;
  }
}
