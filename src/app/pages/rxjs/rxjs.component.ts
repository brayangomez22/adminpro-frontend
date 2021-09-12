import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {
  constructor() {
    let i = -1;
    const obs$ = new Observable((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i == 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i == 2) {
          observer.error('Error Example');
        }
      }, 1000);
    })
      .pipe(retry())
      .subscribe(
        (value) => console.log('Subs:', value),
        (err) => console.warn('Error:', err),
        () => console.info('Obs Finished')
      );
  }
}
