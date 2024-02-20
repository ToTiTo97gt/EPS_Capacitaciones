import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public nuevoUser: any = {
    carne: "",
    cui: "",
    colegiado: "",
    nombre: "",
    apellido: "",
    correo: "",
    passwo: "",
    confirmarPasswo: "",
    genero: 0,
    direccion: "",
    idMunicipio: 0,
    idTipo: 0,
    estado: 1
  }
  public completo = true
  public mensaje = "Los siguientes parametros no fueron ingresados: ";
  public mostrar1: boolean = false

  constructor(private AdminService: AdminService, private UserService: UserService, private http:HttpClient,
    public router: Router, public ActRou: ActivatedRoute, public alertController:AlertController) { }

  ngOnInit() {
    this.tiposUsuarios()
    this.getDepartamentos()
  }

  public departamentos: any
  public municipios: any
  public usuarios: any
  public alert: any

  async getDepartamentos(){
    this.departamentos = await this.UserService.GetDepartamentos();
  }

  async getMunicipios(idDepartamento: any){
    this.municipios = await this.UserService.GetMunicipios(idDepartamento)
  }

  async tiposUsuarios(){
    this.usuarios = await this.UserService.TiposUsuarios()
  }

  DepartamentoChange(event: any){
    const valorSeleccionado = event.detail.value;
    this.nuevoUser.idMunicipio = 0
    this.getMunicipios(valorSeleccionado)
  }

  async Registrarse(){
    this.verificar()

    if(this.completo){
      if(this.nuevoUser.passwo == this.nuevoUser.confirmarPasswo){
        let resp = await this.UserService.Registrar(this.nuevoUser)
        if(resp != 'error'){
          this.alert = await this.alertController.create({
            header: 'Todo Listo',
            message: 'Usuario Registrado con exito',
            buttons: ['OK']
          });
          await this.alert.present()
          this.borrarRegistro()
          this.router.navigate(['/']);
        } else {
          this.alert = await this.alertController.create({
            header: 'Aviso',
            message: 'Error al registrar el usuario',
            buttons: ['OK']
          });
          await this.alert.present()
        }
      } else {
        this.alert = await this.alertController.create({
          header: 'Aviso',
          message: 'Asegurese que su constraseña coincida',
          buttons: ['OK']
        });
        await this.alert.present()
      }
    } else {
      this.alert = await this.alertController.create({
        header: 'Aviso',
        message: this.mensaje,
        buttons: ['OK']
      });
      await this.alert.present()
      this.mensaje = "Los siguientes parametros no fueron ingresados: "
      this.completo = true
    }
  }

  verificar(){
    for(const key in this.nuevoUser){
      switch (key){
        case 'genero':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += ` '${key}'`
          }
          break;
        case 'idMunicipio':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += ` 'Municipio'`
          }
          break;
        case 'idTipo':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += ` 'Tipo de usuario'`
          }
          break;
        case 'carne':
          if(this.nuevoUser[key]=="" && this.nuevoUser.idTipo == 4){
            this.completo = false
            this.mensaje += ` 'Carne'`
          }
          break;
        case 'colegiado':
          if(this.nuevoUser[key]=="" && this.nuevoUser.idTipo == 5){
            this.completo = false
            this.mensaje += ` 'Colegiado'`
          }
          break;
        case 'direccion':

          break
        default:
          if (this.nuevoUser[key]==""){
            this.completo = false
            if(key == 'passwo'){
              this.mensaje += ` 'Contraseña'`
            } else if(key == 'confirmarPasswo'){
              this.mensaje += ` 'Confirmar Contraseña'`
            } else if(key == 'nombre'){
              this.mensaje += ` 'Nombres'`
            } else if(key == 'apellido'){
              this.mensaje += ` 'Apellidos'`
            } else {
              this.mensaje += ` '${key}'`
            }
          }
      }
    }
  }

  borrarRegistro(){
    this.nuevoUser.carne = ""
    this.nuevoUser.colegiado = ""
    this.nuevoUser.cui = ""
    this.nuevoUser.nombre = ""
    this.nuevoUser.apellido = ""
    this.nuevoUser.correo = ""
    this.nuevoUser.passwo = ""
    this.nuevoUser.confirmarPasswo = ""
    this.nuevoUser.genero = 0
    this.nuevoUser.direccion = ""
    this.nuevoUser.idMunicipio = 0
    this.nuevoUser.idTipo = 0
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

}
