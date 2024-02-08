import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { CalendarioPage } from '../modals/calendario/calendario.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.page.html',
  styleUrls: ['./conferencias.page.scss'],
})
export class ConferenciasPage implements OnInit {

  constructor(private userService:UserService,
   private modalCtrl:ModalController, public alertController:AlertController) { }

  public conferencias: any
  public idTipo: any
  public alert: any

  ngOnInit() {
    this.idTipo = this.userService.idTipo
    this.GetConferencias()
  }

  async GetConferencias(){
    this.conferencias = await this.userService.GetCapacitaciones(this.userService.idG, 0)
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
        Boton: 'INSCRIBIRME',
        Valor: 1,
        Mensaje: 'Inscripcion Registrada'
      }
    });
    await modal.present();
  }

  async Inscribir(idCapacitacion: any){
    let res = await this.userService.Inscripcion(this.userService.idG, idCapacitacion, 1)
    this.alert = await this.alertController.create({
      header: 'Listo',
      message: 'Inscripcion registrada',
      buttons: ['OK']
    });
    await this.alert.present()
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
