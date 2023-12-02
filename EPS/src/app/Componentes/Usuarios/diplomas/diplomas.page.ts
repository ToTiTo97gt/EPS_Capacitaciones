import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { Font } from '@pdf-lib/fontkit';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.page.html',
  styleUrls: ['./diplomas.page.scss'],
})
export class DiplomasPage implements OnInit {

  constructor(private adminService:AdminService, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    //console.log(this.userService.datosUser)
    this.datos.nombre = this.userService.datosUser.nombre
    this.datos.apellido = this.userService.datosUser.apellido
    this.getDiplomas()
  }

  public datas: any

  async getDiplomas(){
    this.datas = await this.userService.Diplomas(this.userService.idG)
  }

  datos = {
    nombre: this.userService.datosUser.nombre,
    apellido: this.userService.datosUser.apellido
  }
  public diploma: any
  async generarPDF(capacitacion: any, fecha: any){
    this.diploma = await this.userService.GenerarPDF(this.datos, capacitacion, this.convertir(fecha))
    //console.log(this.diploma.URL)
    if (this.diploma && this.diploma.URL) {
      // Utilizar window.location.href para iniciar la descarga del archivo
      window.location.href = this.diploma.URL;
    } else {
      console.error('Error al obtener el enlace del archivo desde el servidor.');
    }

  }

  convertir(fecha: string){
    var objc = new Date(fecha)

    return this.convertirFechaATexto(objc)
  }

  convertirFechaATexto(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatoFecha = new Intl.DateTimeFormat('es-ES', opciones);
    
    return formatoFecha.format(fecha);
  }

}
