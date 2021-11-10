import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';

import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent,
    NopagefoundComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    DoctorsComponent,
    HospitalsComponent,
    DoctorComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent,
    NopagefoundComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
    PipesModule,
  ],
})
export class PagesModule {}
