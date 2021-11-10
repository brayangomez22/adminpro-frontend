import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private _doctorService: DoctorService,
    private _modalService: ModalImageService,
    private _searchsService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this._modalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public loadDoctors() {
    this.loading = true;

    this._doctorService.loadDoctors().subscribe((doctors) => {
      this.loading = false;
      this.doctors = doctors;
    });
  }

  public deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._doctorService.deleteDoctor(doctor._id).subscribe(() => {
          this.loadDoctors();
          Swal.fire('Removed', doctor.name, 'success');
        });
      }
    });
  }

  public openModal(doctor: Doctor) {
    this._modalService.openModal('doctors', doctor._id, doctor.img);
  }

  public search(term: string) {
    if (term.length === 0) {
      this.loadDoctors();
    } else {
      this._searchsService
        .search('doctors', term)
        .subscribe((results) => (this.doctors = results as Doctor[]));
    }
  }
}
