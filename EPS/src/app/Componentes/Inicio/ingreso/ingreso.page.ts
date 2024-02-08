import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})

export class IngresoPage implements OnInit {

  constructor(private UserService: UserService, private AdminService: AdminService, private http:HttpClient,
    public router: Router, public ActRou: ActivatedRoute, public alertController:AlertController) { }
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
  public alert: any

  cambiarEstado(){
    this.contra = !this.contra
  }
//agregar el modulo de usuarios
  async Ingresar(){
    if(this.isEmail(this.dato1)){

      let clave = 'clave-secreta-123';
      // Cifrar el mensaje usando AES
      let email = CryptoJS.AES.encrypt(this.dato1, clave).toString();
      // Cifrar el mensaje usando AES
      let contra = CryptoJS.AES.encrypt(this.dato2, clave).toString();

      let datos = await this.AdminService.GetAdminUser(email, contra);

      if(datos !== undefined && datos !== null){
        let msg = (datos as any).msg
        if(msg == 'success') {
          let json = JSON.stringify(datos)
          let obj = JSON.parse(json)
          try {
            localStorage.setItem('Atoken', obj.token)
            this.router.navigate(['/tabs'])
          } catch (error) {
            this.alert = await this.alertController.create({
              header: 'Error de ingreso',
              message: 'Hubo un problema con su ingreso',
              buttons: ['OK']
            });
            await this.alert.present()
            location.reload()
            console.log("Error al decodificar el Token JWT ", error)
          }
        } else {
          this.alert = await this.alertController.create({
            header: 'Acceso Negado',
            message: 'Credenciales erroneas o es posible su usuaio haya sido bloqueado',
            buttons: ['OK']
          });
          await this.alert.present()
        }
      } else {
        console.log('error no se recibio respuesta')
      }
    } else {
      let clave = 'clave-secreta-123';
      // Cifrar el mensaje usando AES
      let mensajeCifrado = CryptoJS.AES.encrypt(this.dato2, clave).toString();

      let datos = await this.UserService.GetUsuario(this.dato1, mensajeCifrado)
      
      if(datos !== undefined && datos !== null){
        let msg = (datos as any).msg
        if(msg == 'success') {
          let json = JSON.stringify(datos)
          let obj = JSON.parse(json)
          try {
            localStorage.setItem('token', obj.token)
            this.router.navigate(['/tabsu','conferencias'])
          } catch (error) {
            this.alert = await this.alertController.create({
              header: 'Error de ingreso',
              message: 'Hubo un problema con su ingreso',
              buttons: ['OK']
            });
            await this.alert.present()
            location.reload()
            console.log("Error al decodificar el Token JWT ", error)
          }
        } else {
          this.alert = await this.alertController.create({
            header: 'Acceso Negado',
            message: 'Credenciales erroneas o es posible su usuaio haya sido bloqueado',
            buttons: ['OK']
          });
          await this.alert.present()
        }
      } else {
        console.log('error no se recibio respuesta')
      }
      
    }
  }

  async Recuperar(){
    if(this.isEmail(this.datoContra)){
      let clave = 'clave-secreta-123';

      // Cifrar el mensaje usando AES
      let mensajeCifrado = CryptoJS.AES.encrypt(this.datoContra, clave).toString();
      let dato = await this.AdminService.VerificarMail(mensajeCifrado)
      
      if(dato !== undefined && dato !== null){
        let msg = (dato as any).msg
        if(msg == 'success') {
          this.alert = await this.alertController.create({
            header: 'Ingrese los ultimos 4 digitos del numero guardado en su usuario',
            inputs: [
              {
                name: 'valor',
                type: 'text',
                placeholder: 'Ingrese el valor'
              }
            ],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancelado');
                }
              }, {
                text: 'Aceptar',
                handler: async (data) => {
                  let resp = await this.AdminService.RecuperarContra(mensajeCifrado, data.valor)
                  if(resp !== undefined && resp !== null){
                    let mens = (resp as any).msg
                    if(mens == 'success'){
                      mens = (resp as any).mensaje
                      this.alert = await this.alertController.create({
                        header: 'Listo',
                        message: mens,
                        buttons: ['OK']
                      });
                      await this.alert.present()
                    }else{
                      this.alert = await this.alertController.create({
                        header: 'Aviso',
                        message: mens,
                        buttons: ['OK']
                      });
                      await this.alert.present()
                    }
                  }
                }
              }
            ]
          })
          await this.alert.present()
        } else {
          this.alert = await this.alertController.create({
            header: 'AVISO',
            message: 'Correo no encontrado',
            buttons: ['OK']
          });
          await this.alert.present()
        }
          
      } else {
        this.alert = await this.alertController.create({
          header: 'AVISO',
          message: 'No se recivio respuesta del servidor',
          buttons: ['OK']
        });
        await this.alert.present()
      }

      this.cambiarEstado()
    } else {
      let clave = 'clave-secreta-123';

      // Cifrar el mensaje usando AES
      let mensajeCifrado = CryptoJS.AES.encrypt(this.datoContra, clave).toString();
      let resp = await this.UserService.RecuperarContra(mensajeCifrado)

      if(resp !== undefined && resp !== null){
        let msg = (resp as any).msg
        if(msg == 'success') {
          this.alert = await this.alertController.create({
            header: 'LISTO',
            message: 'Se envio un mensaje a su correo',
            buttons: ['OK']
          });
          await this.alert.present()
        } else {
          this.alert = await this.alertController.create({
            header: 'Aviso',
            message: 'El CUI/Carne que coloco, no fue encontrado, asegurese de escribir bien su CUI/Carne',
            buttons: ['OK']
          });
          await this.alert.present()
        }
      }

      this.cambiarEstado()
    }
  }

  isEmail(email:string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

}
