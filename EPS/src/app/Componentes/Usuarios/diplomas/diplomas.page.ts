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
    console.log(this.userService.datosUser)
    this.getDiplomas()
  }

  public datas: any

  async getDiplomas(){
    this.datas = await this.userService.Diplomas(this.userService.idG)
  }
  public diploma: any
  async generarPDF(capacitacion: any){
    
    this.diploma = await this.userService.GenerarPDF(this.userService.datosUser.nombre, this.userService.datosUser.apellido, capacitacion)
    //console.log(this.diploma.URL)
    if (this.diploma && this.diploma.URL) {
      // Utilizar window.location.href para iniciar la descarga del archivo
      window.location.href = this.diploma.URL;
    } else {
      console.error('Error al obtener el enlace del archivo desde el servidor.');
    }

  }

}
