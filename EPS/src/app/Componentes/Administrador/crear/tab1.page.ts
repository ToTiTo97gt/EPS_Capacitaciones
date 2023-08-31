import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public appPages = [
    { title: 'Jornadas', url: 'Jornadas' },
    { title: 'Conferencias', url: 'Conferencias' },
    { title: 'Diplomados', url: 'Diplomados' },
  ];
  constructor() {}

}
