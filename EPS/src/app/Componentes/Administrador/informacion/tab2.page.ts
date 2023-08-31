import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public appPages = [
    { title: 'Conferencias', url: 'Conferencias' },
    { title: 'Diplomados', url: 'Diplomados' },
    { title: 'Usuarios', url: 'Usuarios' }

  ];
  constructor() {}

}
