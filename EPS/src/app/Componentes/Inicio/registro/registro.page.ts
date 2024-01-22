import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public nuevoUser: any = {
    carne: "",
    cui: "",
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
    public router: Router, public ActRou: ActivatedRoute) { }

  ngOnInit() {
    this.tiposUsuarios()
    this.getDepartamentos()
  }

  public departamentos: any
  public municipios: any
  public usuarios: any

  async getDepartamentos(){
    this.departamentos = await this.UserService.GetDepartamentos();
  }

  async getMunicipios(idDepartamento: any){
    this.municipios = await this.UserService.GetMunicipios(idDepartamento)
    console.log(this.municipios)
  }

  async tiposUsuarios(){
    this.usuarios = await this.UserService.TiposUsuarios()
    console.log(this.usuarios)
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
        console.log(resp)
        if(resp != 'error'){
          alert('Usuario registrado con exito')
          this.borrarRegistro()
          this.router.navigate(['/']);
        } else {
          alert('error al registrar usuario')
        }
      } else {
        alert('Asegurese que su contraseña conicida')
      }
    } else {
      alert(this.mensaje)
      this.completo = true
    }
  }

  verificar(){
    for(const key in this.nuevoUser){
      switch (key){
        case 'genero':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += `\n${key}`
          }
          break;
        case 'idMunicipio':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += `\nMunicipio`
          }
          break;
        case 'idTipo':
          if (this.nuevoUser[key]==0){
            this.completo = false
            this.mensaje += `\nTipo de usuario`
          }
          break;
        case 'carne':
          break;
        default:
          if (this.nuevoUser[key]==""){
            this.completo = false
            this.mensaje += `\n${key}`
          }
      }
    }
  }

  borrarRegistro(){
    this.nuevoUser.carne = ""
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
