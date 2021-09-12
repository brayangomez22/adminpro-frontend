import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styles: [],
})
export class GraphOneComponent {
  public labelsOne: string[] = ['Drinks', 'Burgers', 'Pizzas'];
  public dataOne = [[19, 15, 40]];
}
