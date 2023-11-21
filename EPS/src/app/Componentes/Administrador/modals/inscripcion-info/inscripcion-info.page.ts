import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';

@Component({
  selector: 'app-inscripcion-info',
  templateUrl: './inscripcion-info.page.html',
  styleUrls: ['./inscripcion-info.page.scss'],
})
export class InscripcionInfoPage implements OnInit {

  @Input() Capacitacion: any

  constructor(private modalCtrl:ModalController, private adminService:AdminService, private UserService:UserService) { }

  public datosExtra = {
    idTipo: 0,
    genero: 0,
    idDepartamento: 0,
    idmunicipio: 0,
    presente: 2
  }
  public inscripciones: any
  public tipos: any
  public departamentos: any
  public municipios: any

  ngOnInit() {
    this.GetInscripciones()
    this.tiposUsuarios()
    this.getDepartamentos()
  }

  async getDepartamentos(){
    this.departamentos = await this.UserService.GetDepartamentos();
  }

  async getMunicipios(idDepartamento: any){
    this.municipios = await this.UserService.GetMunicipios(idDepartamento)
  }

  async GetInscripciones(){
    this.inscripciones = await this.adminService.Inscripciones(this.Capacitacion.idCapacitacion)
  }

  async tiposUsuarios(){
    this.tipos = await this.UserService.TiposUsuarios()
  }

  DepartamentoChange(event: any){
    const valorSeleccionado = event.detail.value;
    this.datosExtra.idmunicipio = 0
    this.datosExtra.idDepartamento = valorSeleccionado
    this.getMunicipios(valorSeleccionado)
  }

  async Parametros(){
    if(this.datosExtra.idTipo == 0 && this.datosExtra.genero == 0 && this.datosExtra.idDepartamento == 0 && this.datosExtra.idmunicipio == 0 && this.datosExtra.presente == 2){
      this.inscripciones = await this.adminService.Inscripciones(this.Capacitacion.idCapacitacion)
    } else {
      this.inscripciones = await this.adminService.Inscripciones(this.Capacitacion.idCapacitacion, this.datosExtra)
    }
    console.log(this.datosExtra)
    this.vaciar()
  }

  vaciar(){
    this.datosExtra.idTipo = 0
    this.datosExtra.genero = 0
    this.datosExtra.idDepartamento = 0
    this.datosExtra.idmunicipio = 0
    this.datosExtra.presente = 2
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }

}
