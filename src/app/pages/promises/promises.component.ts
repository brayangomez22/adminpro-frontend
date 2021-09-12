import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css'],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // const promise = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hello World');
    //   } else {
    //     reject('Error');
    //   }
    // })
    //   .then((message) => console.log(message))
    //   .catch((message) => console.log(message));

    // console.log('Finish ');

    this.getUsers().then((users) => console.log(users));
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
