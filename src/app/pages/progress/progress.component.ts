import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progressOne: number = 25;
  progressTwo: number = 35;

  get getProgressOne() {
    return `${this.progressOne}%`;
  }

  get getProgressTwo() {
    return `${this.progressTwo}%`;
  }
}
