import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent {
  public title!: string;

  constructor(private router: Router) {
    this.getDataRoute();
  }

  getDataRoute() {
    this.router.events
      .pipe(
        filter(
          (event): event is ActivationEnd => event instanceof ActivationEnd
        ),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
      .subscribe(({ title }) => {
        this.title = title;
        document.title = `AdminPro - ${title}`;
      });
  }
}
