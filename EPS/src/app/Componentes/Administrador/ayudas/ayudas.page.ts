import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
@Component({
  selector: 'app-ayudas',
  templateUrl: './ayudas.page.html',
  styleUrls: ['./ayudas.page.scss'],
})
export class AyudasPage implements OnInit {

  constructor(private adminService:AdminService) { }

  public solicitudes: any
  public cui = ""
  public estado = ""

  ngOnInit() {
    this.GetSolicitudes()
  }

  async Filtrar(){
    this.solicitudes = await this.adminService.FiltrarSolicitudes(this.cui, this.estado)
  }

  async GetSolicitudes(){
    this.solicitudes = await this.adminService.solcitudesAyuda()
  }

  async cambiarEstado(idUsuario: any, asunto: any){
    await this.adminService.EstadoSolicitud(idUsuario, asunto)
    location.reload()
  }

}
