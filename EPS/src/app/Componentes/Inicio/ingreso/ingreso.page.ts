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
    this.contra = false
  }

  public contra: boolean = false
  public datoContra: string = ""
  public dato1: string = ""
  public dato2: string = ""

  cambiarEstado(){
    this.contra = !this.contra
  }
//agregar el modulo de usuarios
  async Ingresar(){
    if(this.isEmail(this.dato1)){
      let datos = await this.AdminService.GetAdminUser(this.dato1, this.dato2);

      if(datos !== undefined && datos !== null){
        let msg = (datos as any).msg
        if(msg == 'success') {
          let json = JSON.stringify(datos)
          let obj = JSON.parse(json)
          try {
            let json : any = {
              token: obj.token
            }
            this.router.navigate(['/tabs', json])
          } catch (error) {
            alert("Error en el ingreso\nVerifique los datos que ingreso")
            location.reload()
            console.log("Error al decodificar el Token JWT ", error)
          }
        } else {
          alert('Acceso negado: Credenciales erroneas\no es posible que fuera bloqueado por el administrador principal')
        }
      } else {
        console.log('error no se recibio respuesta')
      }
    } else {
      let datos = await this.UserService.GetUsuario(this.dato1, this.dato2)
      
      if(datos !== undefined && datos !== null){
        let msg = (datos as any).msg
        if(msg == 'success') {
          let json = JSON.stringify(datos)
          let obj = JSON.parse(json)
          try {
            let json : any = {
              token: obj.token
            }
            this.router.navigate(['/tabsu', json,'conferencias'])
          } catch (error) {
            alert("Error en el ingreso\nVerifique los datos que ingreso")
            location.reload()
            console.log("Error al decodificar el Token JWT ", error)
          }
        } else {
          alert('Credenciales incorrectas o es posible que su usuario fuera bloqueado por los administradores')
        }
      } else {
        console.log('error no se recibio respuesta')
      }
      
    }
  }

  async Recuperar(){

    let dato = await this.UserService.RecuperarContra(this.datoContra)
    this.cambiarEstado()
  }

  isEmail(email:string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

}
