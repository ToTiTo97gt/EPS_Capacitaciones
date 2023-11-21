import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { CalendarioPage } from '../modals/calendario/calendario.page';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  constructor(private adminService: AdminService, private userService:UserService, private modalCtrl:ModalController) { }

  public conferencias: any
  public idTipo: any

  ngOnInit() {
    this.idTipo = this.userService.idTipo
    this.GetConferencias()
  }

  async GetConferencias(){
    this.conferencias = await this.userService.GetCapacitaciones(this.userService.idG, 1)
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return this.formatoFecha(objc,'dd/mm/yyyy') 
  }

  async MostrarCalendarioDiplomado(Diplomado: any){
    const modal = await this.modalCtrl.create({
      component: CalendarioPage,
      cssClass: 'custom-modal',
      componentProps: {
        Diplomado: Diplomado,
        Boton: 'ANULAR INSCRIPCION',
        Valor: 0,
        Mensaje: 'Inscripcion Anulada'
      }
    });
    await modal.present();
  }

  async Inscribir(idCapacitacion: any){
    let res = await this.userService.Inscripcion(this.userService.idG, idCapacitacion, 0)
    alert('Inscripcion anulada')
    console.log(res)
    location.reload()
  }

  formatoFecha(fecha: Date, formato: string) {
    const map: { [key: string]: any } = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear(),
    };
  
    return formato.replace(/dd|mm|yyyy/gi, (matched) => map[matched]);
  }

}
