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

  public verif = false
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

    modal.onDidDismiss().then(async data => {
      let datos = await this.adminService.NuevosDatos(this.adminService.idG)

      let json = JSON.stringify(datos)
      let obj = JSON.parse(json)
      try {
        let json : any = {
          token: obj.token
        }
        this.decoded2 = jwt_decode(obj.token)
        this.comparar(this.decoded.datos[0], this.decoded2.datos[0])
        if(this.verif == true){
          //console.log('cambio')
          this.route.navigate(['/tabs', json])
        }
      } catch (error) {
        alert("Error en el ingreso\nVerifique los datos que ingreso")
        location.reload()
        console.log("Error al decodificar el Token JWT ", error)
      }
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
