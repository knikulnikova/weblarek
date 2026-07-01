import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalCloseButton: HTMLButtonElement;
  protected modalContentElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContentElement = ensureElement<HTMLElement>('.modal__content', this.container);

    this.modalCloseButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    });

    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.events.emit('modal:close');
      }
    });
  }

  set content(item: HTMLElement) {
    this.modalContentElement.replaceChildren(item);
  } 

  open(): void {
    this.container.classList.add('modal_active');
  } 

  close(): void {
    this.container.classList.remove('modal_active');
  } 
}