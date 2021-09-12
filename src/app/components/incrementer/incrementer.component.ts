import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [],
})
export class IncrementerComponent implements OnInit {
  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') outputValue: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      this.progress = 0;
    }

    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }
}
