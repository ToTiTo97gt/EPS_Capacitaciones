import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import jwt_decode from 'jwt-decode';
import { AdminInfoPage } from '../modals/admin-info/admin-info.page';
import { AdminService } from '../../../Servicios/admin.servicio';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private menuController: MenuController, public route: Router, public parametros:ActivatedRoute,
    private adminService:AdminService, private modalCtrl:ModalController) {}

  public nombre: any
  public permiso: any
  public boolArray: boolean[] = [false, false, false, false, false, false, false] 
  public decoded: any

  ngOnInit(){
    this.Actualizar0()
    this.Actualizar1()
    var datos = this.parametros.snapshot.paramMap.get('token')
    if(datos !== null){
      this.decoded = jwt_decode(datos)
      this.adminService.idG = this.decoded.datos[0].idAdmin
      this.nombre = this.decoded.datos[0].nombre + " " + this.decoded.datos[0].apellido
    } else {
      alert('error en el token, esta vacio')
    }
    this.permisos();
  } 

  async permisos(){
    this.permiso = await this.adminService.GetAdminPermiso(this.adminService.idG)
    for (let index = 0; index < this.permiso.length; index++) {
      const element = this.permiso[index];
      if(element.idPermiso == 1){
        const newArr: boolean[] = [true, true, true, true, true, true, true]
        this.boolArray = newArr
        break;
      }
      this.boolArray[element.idPermiso-1] = true
    }
    console.log(this.boolArray)
  }

  async mostrarUsuario(){
    const modal = await this.modalCtrl.create({
      component: AdminInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        idAdmin: this.decoded.datos[0].idAdmin,
        nombre: this.decoded.datos[0].nombre,
        apellido: this.decoded.datos[0].apellido,
        datosP: this.decoded.datos[0],
        dato: 0
      }
    });
    await modal.present();
  }

  onTabChange() {
    this.menuController.enable(true); // Habilita el menú
  }

  async Actualizar0(){
    let resp0 = await this.adminService.Actualizar0()
  }

  async Actualizar1(){
    let resp1 = await this.adminService.Actualizar1()
  }

}
