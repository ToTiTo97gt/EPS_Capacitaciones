import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ModalController } from '@ionic/angular';
import { DatosUsuarioPage } from '../modals/datos-usuario/datos-usuario.page';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tabsu',
  templateUrl: './tabsu.page.html',
  styleUrls: ['./tabsu.page.scss'],
})
export class TabsuPage implements OnInit {

  constructor(private userService:UserService, private adminService:AdminService,private modalCtrl:ModalController,
  private menuController: MenuController, public route: Router, public parametros:ActivatedRoute) { }

    public decoded: any
  

  ngOnInit() {
    var datos = this.parametros.snapshot.paramMap.get('token')
    if(datos !== null){
      this.decoded = jwt_decode(datos)
      this.userService.idG = this.decoded.datos[0].idUsuario
      this.userService.datosUser = this.decoded.datos[0]
      //this.userService.AsignacionAuto(this.userService.idG)
    } else {
      alert('error en el token, esta vacio')
    }
  }

  async mostrarUsuario(){
    const modal = await this.modalCtrl.create({
      component: DatosUsuarioPage,
      cssClass: 'custom-modal',
      componentProps: {
        Datos: this.decoded.datos[0]
      }
    });
    await modal.present();
  }

  onTabChange() {
    this.menuController.enable(true); // Habilita el menú
  }

  recarga(){
    window.location.reload()
  }

}
