import { Component, OnInit } from '@angular/core';
import { IonMenuToggle } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public appPages = [
    { title: 'Jornadas', url: 'Jornadas' },
    { title: 'Conferencias', url: 'Conferencias' },
    { title: 'Diplomados', url: 'Diplomados' },
    { title: 'Usuarios', url: 'Usuarios'},
    { title: 'Plantillas', url: 'Plantillas'}
  ];
  constructor(private menuController: MenuController) {}

  ngOnInit() {
    this.menuController.enable(true)
  }

  toggleMenu(){
    this.menuController.toggle()
  }

  cargar(){
    window.location.reload()
  }

}
