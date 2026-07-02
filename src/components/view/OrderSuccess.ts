import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  description: number;
}

export class OrderSuccess extends Component<ISuccess> {
  protected orderSuccessButton: HTMLButtonElement;
  protected descriptionElement: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.orderSuccessButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );

    this.orderSuccessButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }

  set description(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}
