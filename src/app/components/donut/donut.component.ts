import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent {
  @Input('title') title: string = 'No title';
  @Input('labels') labels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') data: MultiDataSet = [[350, 450, 100]];
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] },
  ];
}
