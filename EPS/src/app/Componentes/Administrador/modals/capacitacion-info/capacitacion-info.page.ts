import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { dateInputsHaveChanged } from '@angular-material-components/datetime-picker/lib/datepicker-input-base';

@Component({
  selector: 'app-capacitacion-info',
  templateUrl: './capacitacion-info.page.html',
  styleUrls: ['./capacitacion-info.page.scss'],
})
export class CapacitacionInfoPage implements OnInit {

  @Input() idCapacitacion: any
  @Input() nomCapacitacion: any
  @Input() descripcion: any
  @Input() presentador: any
  @Input() poster: any
  @Input() zoomLink: any
  @Input() fbLink: any

  constructor(private modalCtrl:ModalController, private adminService:AdminService) { }

  public agenda: any
  datosAgenda = {
    fecha: "",
    hora: ""
  }

  fechaYhora = ""
  datetime: Date = new Date()

  ngOnInit() {
    this.getAgenda()
  }

  async getAgenda(){
    this.agenda = await this.adminService.getAgenda(this.idCapacitacion)
    if(Array.isArray(this.agenda) && this.agenda.length > 0){
      const Elemento = this.agenda[0]
      var obj1 = new Date(Elemento.fecha)
      this.datosAgenda.fecha = obj1.toISOString().split('T')[0]
      this.datosAgenda.hora = Elemento.hora
      this.datetime = new Date(this.datosAgenda.fecha)
      this.fechaYhora = `${this.datetime.toISOString().split('T')[0]}T${this.datosAgenda.hora}`
    }
    
  }

  async modificarCapacitacion(){
    alert(this.poster)
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }

}
