import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { TErrors } from "../../types";
import { IEvents } from "../base/Events";

interface IForm {
  errors: TErrors;
  submitButtonDisabled: boolean;
}

export class Form<T> extends Component<IForm & T> {
  protected errorsElement: HTMLElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );

    this.container.addEventListener("submit", (event) => {
      event.preventDefault();
      this.events.emit("form:submit", {
        form: this.container.getAttribute("name"),
      });
    });

    this.container.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      this.events.emit("form:input", {
        form: this.container.getAttribute("name"),
        [target.name]: target.value
      });
    });
  }

  set errors(value: TErrors) {
    this.errorsElement.textContent = Object.values(value).join(", ");
  }

  set submitButtonDisabled(value: boolean) {
    this.submitButton.disabled = value;
  }
}
