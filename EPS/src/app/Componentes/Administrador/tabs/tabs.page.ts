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
  public decoded2: any
  public datos: any

  ngOnInit(){
    const token = localStorage.getItem('Atoken')
    this.Actualizar0()
    this.Actualizar1()
    if(token !== null){
      this.decoded = jwt_decode(token)
      this.adminService.idG = this.decoded.datos[0].idAdmin
      this.getDatos()
    } else {
      alert('error en el token, esta vacio')
    }
    this.permisos();
  } 

  async getDatos(){
    this.datos = await this.adminService.NuevosDatos(this.adminService.idG)
    this.nombre = this.datos[0].nombre + " " + this.datos[0].apellido
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
    //console.log(this.boolArray)
  }

  public verif = false
  async mostrarUsuario(){
    const modal = await this.modalCtrl.create({
      component: AdminInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        idAdmin: this.adminService.idG,
        nombre: this.datos[0].nombre,
        apellido: this.datos[0].apellido,
        datosP: this.datos[0],
        dato: 0
      }
    });
    modal.onDidDismiss().then(async data => {
      this.getDatos()
      //alert('cerrado')
    })
    await modal.present();
  }

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

  async Actualizar0(){
    let resp0 = await this.adminService.Actualizar0()
  }

  async Actualizar1(){
    let resp1 = await this.adminService.Actualizar1()
  }

}
