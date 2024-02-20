import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserInfoPageRoutingModule } from './Componentes/Administrador/modals/user-info/user-info-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.VerificarSesion();
  }
  public verif: any
  VerificarSesion(){
    const UserLogged = localStorage.getItem('SGConf')
    if(UserLogged){
      this.verif = jwt_decode(UserLogged)
      if(this.verif.datos[0].hasOwnProperty('idUsuario')){
        this.router.navigate(['/tabsu','conferencias'])
      } else if(this.verif.datos[0].hasOwnProperty('idAdmin')){
        this.router.navigate(['/tabs'])
      }
    } else {
      this.router.navigate(['/'])
    }
  }
}
