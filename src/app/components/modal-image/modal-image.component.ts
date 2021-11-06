import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imageUpload!: File;
  public imgTemp!: any;
  public user!: User;

  constructor(
    public modalService: ModalImageService,
    private _fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  public closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal();
  }

  public changeImage(event: any) {
    this.imageUpload = event?.target?.files[0];
    if (event?.target?.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event?.target?.files[0]);

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      };
    } else {
      this.imgTemp = null;
    }
  }

  public uploadImage() {
    const id = this.modalService.id;
    const typeCollection = this.modalService.typeCollection;

    this._fileUploadService
      .updatePhoto(this.imageUpload, typeCollection, id)
      .subscribe((img: any) => {
        Swal.fire('Saved', 'The changes were saved successfully', 'success');
        this.modalService.newImage.emit(img);
        this.closeModal();
      });
  }
}
