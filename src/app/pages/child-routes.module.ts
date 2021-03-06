import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

// maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Search' },
  },
  {
    path: 'graphOne',
    component: GraphOneComponent,
    data: { title: 'GraphOne' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'My Profile' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account Settings' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },

  // maintenance
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Application users' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Application hospitals' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Application doctors' },
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: { title: 'Application doctor' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
