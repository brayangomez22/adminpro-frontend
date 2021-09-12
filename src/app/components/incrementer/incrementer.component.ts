import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [],
})
export class IncrementerComponent {
  @Input('value') progress: number = 50;

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      return (this.progress = 100);
    }

    if (this.progress <= 0 && value < 0) {
      return (this.progress = 0);
    }

    return (this.progress += value);
  }
}
