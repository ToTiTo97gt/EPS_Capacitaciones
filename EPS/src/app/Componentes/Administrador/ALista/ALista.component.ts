import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from 'src/app/Servicios/admin.servicio';

@Component({
  selector: 'app-ALista',
  templateUrl: './ALista.component.html',
  styleUrls: ['./ALista.component.scss'],
})
export class AListaComponent implements OnInit {

  constructor(public route: Router, public parametros:ActivatedRoute, private adminService:AdminService) { }
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
    this.ListaAdmins()
  }

  async ListaAdmins(){
    this.datos = await this.adminService.GetAdminLista()
  }

}
