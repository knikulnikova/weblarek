import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { ICardActions } from "../../types";

interface ICardBasket {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected deleteButton: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );
    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );

    if (actions?.onClick) {
      this.deleteButton.addEventListener("click", actions.onClick);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
