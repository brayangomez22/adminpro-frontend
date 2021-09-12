import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent,
    NopagefoundComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphOneComponent,
    PagesComponent,
    NopagefoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    AppRoutingModule,
  ],
})
export class PagesModule {}
