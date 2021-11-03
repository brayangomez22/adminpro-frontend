import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public profileForm!: FormGroup;
  public formSubmitted = false;
  public user!: User;
  public imageUpload!: File;
  public imgTemp!: any;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _fileUploadService: FileUploadService
  ) {
    this.user = _userService.user;
    this.createReactiveForm();
  }

  private createReactiveForm(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  public updateUser() {
    this.formSubmitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    this._userService.updateUser(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Saved', 'The changes were saved successfully', 'success');
      },
      (err) => Swal.fire('Error', err.error.msg, 'error')
    );
  }

  public invalidField(field: string): boolean {
    if (this.profileForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
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
    this._fileUploadService
      .updatePhoto(this.imageUpload, 'users', this.user.uid)
      .subscribe((resp: any) => {
        this.user.img = resp?.nameFile;
        Swal.fire('Saved', 'The changes were saved successfully', 'success');
      });
  }
}
