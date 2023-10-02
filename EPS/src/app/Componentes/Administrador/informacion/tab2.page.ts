import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public appPages = [
    { title: 'Conferencias', url: 'Conferencias' },
    { title: 'Diplomados', url: 'Diplomados' },
    { title: 'Usuarios', url: 'Usuarios' }

  ];
  constructor(private menuController: MenuController) {}

  ngOnInit() {
    this.menuController.enable(true)
  }

}
