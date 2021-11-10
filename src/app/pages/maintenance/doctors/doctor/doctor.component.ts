import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital | undefined;
  public selectedDoctor: Doctor | undefined;

  constructor(
    private _fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _doctorService: DoctorService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(({ id }) => this.loadDoctor(id));

    this.doctorForm = this._fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.loadHospitals();

    this.doctorForm
      .get('hospital')
      ?.valueChanges.subscribe(
        (hospitalId) =>
          (this.selectedHospital = this.hospitals.find(
            (h) => h._id === hospitalId
          ))
      );
  }

  public loadDoctor(id: string) {
    if (id === 'new') {
      return;
    }

    this._doctorService
      .loadDoctorById(id)
      .pipe(delay(100))
      .subscribe((doctor) => {
        if (!doctor) {
          this._router.navigateByUrl(`/dashboard/doctors`);
        } else if (doctor.hospital?._id !== undefined) {
          const {
            name,
            hospital: { _id },
          } = doctor;
          this.selectedDoctor = doctor;
          this.doctorForm.setValue({ name, hospital: _id });
        }
      });
  }

  public loadHospitals() {
    this._hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
    });
  }

  public saveDoctor() {
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };

      this._doctorService.updateDoctor(data).subscribe((resp) => {
        Swal.fire(
          'Doctor updated',
          `${name} The doctor was successfully updated`,
          'success'
        );
      });
    } else {
      this._doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          Swal.fire(
            'Doctor created',
            `${name} The doctor was successfully created`,
            'success'
          );
          this._router.navigateByUrl(
            `/dashboard/doctor/${resp.doctorSaved._id}`
          );
        });
    }
  }
}
