import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/user.servicio';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(private UserService:UserService) { }

  ngOnInit() {

  }



  public Asunto: any
  public Descripcion: any

  async EnviarAyuda(){
    if(this.Asunto == "" || this.Asunto == null){
      alert('Por Favor agregue el asunto de su problema.')
    } else {
      if(this.Descripcion == "" || this.Descripcion == null){
        alert('Por favor indiquenos su situacion')
      } else {
        await this.UserService.EnviarAyuda(this.UserService.idG, this.Asunto, this.Descripcion)
        alert('Su situacion fue enviada a los administradores')
      }
    }
  }

}
