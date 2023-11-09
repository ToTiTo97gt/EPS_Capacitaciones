import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.page.html',
  styleUrls: ['./admin-info.page.scss'],
})
export class AdminInfoPage implements OnInit {

  @Input() nombre: any;
  @Input() apellido: any;
  @Input() idAdmin: any;
  @Input() datosP: any
  @Input() dato: any
  @ViewChild('miSelect') miSelect: any
  constructor(private modalCtrl:ModalController, private adminService:AdminService) { }

  public datos: any
  public permisos: any
  public mostrar1: boolean = false
  public mostrar2: boolean = false

  public AdminPerfil = {
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    OldPass: "",
    NewPass: "",
    ConfirmPass: ""
  }

  ngOnInit() {
    if(this.dato == 1){
      this.getPermisos()
    } else {
      this.AdminPerfil.nombre = this.datosP.nombre
      this.AdminPerfil.apellido = this.datosP.apellido
      this.AdminPerfil.correo = this.datosP.email
      this.AdminPerfil.OldPass = this.datosP.passw
      this.AdminPerfil.telefono = this.datosP.telefono
    }
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }

  async getPermisos(){
    this.datos = await this.adminService.GetPermisos()
    this.permisos = await this.adminService.GetAdPermisos(this.idAdmin)
  }

  async AsignarPermiso(select: any){
    //hacer la funcion de asignar permisos
    if(this.miSelect != null){
      let respuesta = await this.adminService.AsignarPermiso(this.idAdmin, select)
      try {
        const resp = respuesta as {mensaje?: string}
        if(resp.mensaje !== undefined){
          const mensaje = resp.mensaje
          alert(mensaje)
        }
      } catch (error) {
        if(error instanceof HttpErrorResponse && error.status === 409){
          const err = error.error.error
          console.log('Error 409: ' + err)
          alert('esta asignacion ya existe')
        }
      }
      
    } else {
      alert('No has seleccionado un permiso')
    }
  }

  async EliminarAdmin(idAdmin: any){
    try {
      const respuesta = await this.adminService.EliminarAdmin(idAdmin)
      const resp = respuesta as {mensaje?:string}
      if(resp.mensaje !== undefined){
        const mensaje = resp.mensaje
        alert(mensaje)
        window.location.reload()
      }
    } catch (error) {
      alert('error al ejecutar la peticion de EliminarAdmin. ' + error)
    }
  }

  async RevocarPermiso(idAdmin: any, idPermiso: any){
    try {
      const respuesta = await this.adminService.Revocar(idAdmin, idPermiso)
      const resp = respuesta as {mensaje?:string};
      if(resp.mensaje !== undefined){
        const mensaje = resp.mensaje;
        alert(mensaje)
      }
    } catch (error) {
      alert('error al ejecutar la peticion de RevocarPermiso. ' + error)
    }
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

  togglePassVisibility1(){
    this.mostrar2 = !this.mostrar2
  }

}
