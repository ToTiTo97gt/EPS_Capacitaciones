import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.page.html',
  styleUrls: ['./datos-usuario.page.scss'],
})
export class DatosUsuarioPage implements OnInit {

  @Input() Datos: any
  public mostrar1: boolean = false
  public mostrar2: boolean = false
  public departamentos: any
  public municipios: any
  public usuarios: any

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
    estado: 0,
    departamento: 0
  }
  public oldPass = ""

  constructor(private modalCtrl:ModalController, private adminService:AdminService, private UserService:UserService,
              private router:Router) { }

  ngOnInit() {
    this.DatosUsuario()
    this.getDepartamentos()
    this.tiposUsuarios()
  }

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
    this.getMunicipios(valorSeleccionado)
  }

  async DatosUsuario(){
    this.nuevoUser.idUsuario = this.Datos.idUsuario
    this.nuevoUser.carne = this.Datos.carne
    this.nuevoUser.cui = this.Datos.cui
    this.nuevoUser.nombre = this.Datos.nombre
    this.nuevoUser.apellido = this.Datos.apellido
    this.nuevoUser.correo = this.Datos.correo
    this.nuevoUser.genero = this.Datos.genero.toString()
    this.nuevoUser.direccion = this.Datos.direccion
    this.nuevoUser.idDepartamento = this.Datos.idDepartamento
    this.getMunicipios(this.nuevoUser.idDepartamento)
    this.nuevoUser.idmunicipio = this.Datos.idmunicipio
    this.nuevoUser.idTipo = this.Datos.idTipo
    this.nuevoUser.estado = this.Datos.estado
  }

  async ModificarDatos(){
    await this.UserService.ModificarUsuario(this.nuevoUser)
  }

  async CambiarContra(){
    if(this.nuevoUser.passwo == this.nuevoUser.confirmarPasswo){
      if (this.oldPass == this.Datos.passwo){
        await this.UserService.CambiarPass(this.nuevoUser.passwo, this.nuevoUser.idUsuario)
      } else {
        alert('Por favor, verifique qué este bien su contraseña actual')
      }
    } else {
      alert('Asegurese que la contraseña y su confirmacion coincidan')
    }
  }

  togglePassVisibility(){
    this.mostrar1 = !this.mostrar1
  }

  togglePassVisibility1(){
    this.mostrar2 = !this.mostrar2
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }

}
