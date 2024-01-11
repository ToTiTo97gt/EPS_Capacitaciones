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
  private menuController: MenuController, public route: Router, public parametros:ActivatedRoute) {}

  public decoded: any
  public decoded2: any  
  
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

    modal.onDidDismiss().then(async data => {
      let datos = await this.userService.GetNuevosDatos(this.userService.idG)

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
          this.route.navigate(['/tabsu', json,'conferencias'])
        }
      } catch (error) {
        alert("Error en el ingreso\nVerifique los datos que ingreso")
        location.reload()
        console.log("Error al decodificar el Token JWT ", error)
      }
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

}
