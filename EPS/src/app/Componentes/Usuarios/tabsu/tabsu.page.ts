import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ModalController } from '@ionic/angular';
import { DatosUsuarioPage } from '../modals/datos-usuario/datos-usuario.page';
import jwt_decode from 'jwt-decode';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabsu',
  templateUrl: './tabsu.page.html',
  styleUrls: ['./tabsu.page.scss'],
})
export class TabsuPage implements OnInit {

  constructor(private userService:UserService, private modalCtrl:ModalController,
  private menuController: MenuController, public route: Router, public parametros:ActivatedRoute, public alertController:AlertController) {}

  public decoded: any
  public decoded2: any  
  public nombre: any
  public apellido: any
  public alert: any
  
  
  ngOnInit() {
    const token = localStorage.getItem('SGConf')
    if(token !== null){
      this.decoded = jwt_decode(token)
      this.userService.idG = this.decoded.datos[0].idUsuario
      this.getDatosUser()
    } else {
      alert('error en el token, esta vacio')
    }
    
  }

  async getDatosUser(){
    this.userService.datosUser = await this.userService.GetDatosUsuario(this.userService.idG)
    this.nombre = this.userService.datosUser[0].nombre
    this.apellido = this.userService.datosUser[0].apellido
  }

  async mostrarUsuario(){
    const modal = await this.modalCtrl.create({
      component: DatosUsuarioPage,
      cssClass: 'custom-modal',
      componentProps: {
        Datos: this.userService.datosUser[0]
      }
    });

    modal.onDidDismiss().then(async data => {
      //let datos = await this.userService.GetNuevosDatos(this.userService.idG)
      this.getDatosUser()
    })

    await modal.present();
  }

  public verif = false

  comparar(obj1: any, obj2: any, path = '') {
    for (let key in obj1) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          this.comparar(obj1[key], obj2[key], `${path}.${key}`);
      } else if (obj1[key] !== obj2[key]) {
        this.verif = true
      }
    }
  }

  onTabChange() {
    this.menuController.enable(true); // Habilita el menú
  }

  recarga(){
    window.location.reload()
  }

  cerrar(){
    localStorage.removeItem('SGConf')
    this.route.navigate(['/'])
  }

}
