import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { IncrementerComponent } from './incrementer/incrementer.component';

@NgModule({
  declarations: [IncrementerComponent],
  exports: [IncrementerComponent],
  imports: [CommonModule, FormsModule],
})
export class ComponentsModule {}
