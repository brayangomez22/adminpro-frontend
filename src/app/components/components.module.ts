import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutComponent } from './donut/donut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [IncrementerComponent, DonutComponent, ModalImageComponent],
  exports: [IncrementerComponent, DonutComponent, ModalImageComponent],
  imports: [CommonModule, ChartsModule, FormsModule],
})
export class ComponentsModule {}
