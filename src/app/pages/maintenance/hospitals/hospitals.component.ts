import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalService: ModalImageService,
    private _searchsService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this._modalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.loadHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  public async openModalCreateHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      input: 'text',
      inputLabel: 'Name hospital',
      inputPlaceholder: 'Enter the name hospital',
      showCancelButton: true,
    });

    if (value !== undefined && value?.trim().length > 0) {
      this.createHospital(value);
    } else {
      Swal.fire('Error', 'The name is required', 'error');
    }
  }

  public createHospital(name: string) {
    this._hospitalService.createHospital(name).subscribe((resp: any) => {
      this.loadHospitals();
      Swal.fire('Created', 'The hospital was successfully created', 'success');
    });
  }

  public loadHospitals() {
    this.loading = true;

    this._hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  public updateHospital(hospital: Hospital) {
    this._hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe(() => Swal.fire('Updated', hospital.name, 'success'));
  }

  public deleteHospital(hospital: Hospital) {
    this._hospitalService.deleteHospital(hospital._id).subscribe(() => {
      this.loadHospitals();
      Swal.fire('Removed', hospital.name, 'success');
    });
  }

  public openModal(hospital: Hospital) {
    this._modalService.openModal('hospitals', hospital._id, hospital.img);
  }

  public search(term: string) {
    if (term.length === 0) {
      this.loadHospitals();
    } else {
      this._searchsService
        .search('hospitals', term)
        .subscribe((results) => (this.hospitals = results as Hospital[]));
    }
  }
}
