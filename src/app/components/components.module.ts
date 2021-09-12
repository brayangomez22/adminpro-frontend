import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutComponent } from './donut/donut.component';

@NgModule({
  declarations: [IncrementerComponent, DonutComponent],
  exports: [IncrementerComponent, DonutComponent],
  imports: [CommonModule, ChartsModule, FormsModule],
})
export class ComponentsModule {}
