import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})

export class IngresoPage implements OnInit {

  constructor(private UserService: UserService, private AdminService: AdminService, private http:HttpClient,
    public router: Router, public ActRou: ActivatedRoute) { }
  token: string = ""
  decoded: any
  public mostrar1: boolean = false
  ngOnInit() {
  }

  public dato1: string = ""
  public dato2: string = ""
//agregar el modulo de usuarios
  async Ingresar(){
    if(this.isEmail(this.dato1)){
      let datos = await this.AdminService.GetAdminUser(this.dato1, this.dato2);
      let json = JSON.stringify(datos)
      let obj = JSON.parse(json)
      try {
        this.decoded = jwt_decode(obj.token)
        this.router.navigate(['/tabs',this.decoded.datos[0]]);
      } catch (error) {
        alert("Error en el ingreso\nVerifique sus datos de administrador")
        console.log("Error al decodificar el Token JWT ", error)
      }
    } else {
      let datos = await this.UserService.GetUsuario(this.dato1, this.dato2)
      let json = JSON.stringify(datos)
      let obj = JSON.parse(json)
      try {
        this.decoded = jwt_decode(obj.token)
        let json : any = {
          token: obj.token
        }
        this.router.navigate(['/tabsu', json,'conferencias'])
      } catch (error) {
        alert("Error en el ingreso\nVerifique los datos que ingreso")
        location.reload()
        console.log("Error al decodificar el Token JWT ", error)
      }
    }
   /*  if(this.dato1 == 'admin' && this.dato2 == 'admin'){
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/tabsu']);
    } */
  }

  isEmail(email:string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

}
