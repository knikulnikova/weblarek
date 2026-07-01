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

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit('form:submit', { form: this.container.getAttribute('name') });
    })

    //ToDO:событие на input
  }

  set errors(value: TErrors) {
    //ToDO:релизация
  }

  set submitButtonDisabled(value: boolean) {
    //ToDO:релизация
  }
}