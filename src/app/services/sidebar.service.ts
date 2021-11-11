import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any[] = [];

  constructor() {}

  public loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
