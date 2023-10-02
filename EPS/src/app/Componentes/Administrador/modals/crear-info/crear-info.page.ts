import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';

@Component({
  selector: 'app-crear-info',
  templateUrl: './crear-info.page.html',
  styleUrls: ['./crear-info.page.scss'],
})
export class CrearInfoPage implements OnInit {

  @Input() idJornada: any
  @Input() ciclo: any
  @Input() fechaInicio: any
  @Input() fechaFinal: any
  @Input() estado: any

  public jornada: any = {
    idJornada: "",
    ciclo: "",
    fechaInicio: "",
    fechaFinal: ""
  }

  fechaActual: any
  Inicio: any
  Final : any

  constructor(private modalCtrl:ModalController, private adminService:AdminService) { }

  ngOnInit() {
    this.fechaActual = new Date()
    this.Inicio = new Date(this.fechaInicio)
    this.Final = new Date(this.fechaFinal)
    this.jornada.idJornada = this.idJornada
    this.jornada.ciclo = this.ciclo
    this.jornada.fechaInicio = this.fechaInicio
    this.jornada.fechaFinal = this.fechaFinal
  }

  async modificar(){
    console.log(this.jornada)
    let respuesta = await this.adminService.modificarJornada(this.jornada)
    try {
      const resp = respuesta as {mensaje?: string}
      if(resp.mensaje !== undefined){
        const mensaje = resp.mensaje
        alert(mensaje)
        location.reload()
      } else {
        console.log(respuesta)
        alert('error al recibir respuesta de la modificacion')
      }
    } catch (error) {
      console.log(error)
      alert('error al registrar la modificar la jornada')
    }
  }

  async eliminarJornada(){
    let respuesta = await this.adminService.eliminarJornada(this.idJornada)
    alert('Registro de jornada eliminado')
    location.reload()
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }

  formatoFecha(fecha: Date, formato: String) {
    const map: {[key: string]: any} = { 
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return objc.toISOString().split('T')[0]
  }

}
