import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { ModalController } from '@ionic/angular';
import { AdminInfoPage } from '../modals/admin-info/admin-info.page';

@Component({
  selector: 'app-ALista',
  templateUrl: './ALista.component.html',
  styleUrls: ['./ALista.component.scss'],
})
export class AListaComponent implements OnInit {

  constructor(public route: Router, public parametros:ActivatedRoute, private adminService:AdminService,
    private modalCtrl:ModalController) { }
  public datos: any
  public permisos: any
  public nuevoUser: any = {
    nombre: "",
    apellido: "",
    email: "",
    passw: "",
    telefono: ""
  }
  public id: any
  ngOnInit() {
    this.id = this.adminService.idG
    this.ListaAdmins(this.id)
  }

  async ListaAdmins(id: any){
    this.datos = await this.adminService.GetAdminLista(id)
  }

  async MostrarDatos(idadmin:any, nombre: any, apellido: any){
    const modal = await this.modalCtrl.create({
      component: AdminInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        idAdmin: idadmin,
        nombre: nombre,
        apellido: apellido
      }
    });
    await modal.present();
  }

  async Registrar(nuevoUser: any){
    if(this.validarUser(nuevoUser)){
      let resp = await this.adminService.Registrar(nuevoUser)
      if(resp != 'error'){
        alert('Administrador registrado')
        this.borrarRegistro()
      } else {
        alert('error al registrar usuario')
      }
    }
    

  }

  validarUser(usuario: any) {
    for (const key in usuario) {
      if (usuario.hasOwnProperty(key) && usuario[key] === "") {
        return false; // Al menos un campo está vacío
      }
    }
    return true;
  }

  borrarRegistro(){
    this.nuevoUser.nombre = ""
    this.nuevoUser.apellido = ""
    this.nuevoUser.email = ""
    this.nuevoUser.passw = ""
    this.nuevoUser.telefono = ""
  }

}
