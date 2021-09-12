import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';

import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent {
  constructor() {
    // this.returnObservable()
    //   .pipe(retry())
    //   .subscribe(
    //     (value) => console.log('Subs:', value),
    //     (err) => console.warn('Error:', err),
    //     () => console.info('Obs Finished')
    //   );

    this.returnInterval().subscribe(console.log);
  }

  returnInterval(): Observable<number> {
    return interval(1000).pipe(
      take(4),
      map((value) => value + 1)
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
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
    });
  }
}
