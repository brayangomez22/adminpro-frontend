import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  public base_url: string = environment.base_url;
  public hideModal: boolean = true;
  public typeCollection!: 'users' | 'doctors' | 'hospitals';
  public id!: string | undefined;
  public img!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModalMethod() {
    return this.hideModal;
  }

  public openModal(
    typeCollection: 'users' | 'doctors' | 'hospitals',
    id: string | undefined,
    img: string = 'no-img'
  ) {
    this.hideModal = false;
    this.typeCollection = typeCollection;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      const url = `${this.base_url}/upload/${typeCollection}/${img}`;
      this.img = url;
    }
  }

  public closeModal() {
    this.hideModal = true;
  }
}
