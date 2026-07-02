import { Component } from "../base/Component";

interface IGallery {
  gallery: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected galleryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.galleryElement = this.container;
  }

  set gallery(items: HTMLElement[]) {
    this.galleryElement.replaceChildren(...items);
  }
}
