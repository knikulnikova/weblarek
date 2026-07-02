import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { IProduct, ICardActions } from "../../types";
import { categoryMap } from "../../utils/constants";

type TCategoryKey = keyof typeof categoryMap;
export type TCardPreview = Pick<
  IProduct,
  "image" | "category" | "description"
> & {
  buttonText: string;
  buttonDisabled: boolean;
};

export class CardPreview extends Card<TCardPreview> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected textElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.textElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.cardButton.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as TCategoryKey],
        key === value,
      );
    }
  }

  set image(value: string) {
    this.setImage(
      this.imageElement,
      value,
      this.titleElement.textContent ?? "",
    );
  }

  set text(value: string) {
    this.textElement.textContent = value;
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.cardButton.disabled = value;
  }
}
