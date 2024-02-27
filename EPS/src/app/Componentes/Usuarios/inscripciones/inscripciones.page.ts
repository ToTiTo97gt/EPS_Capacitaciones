import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/user.servicio';
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { CalendarioPage } from '../modals/calendario/calendario.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

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
    this.alert = await this.alertController.create({
      header: 'Listo',
      message: 'Inscripcion anulada',
      buttons: ['OK']
    });
    await this.alert.present()
    location.reload()
  }

  async fb(linkfb: any){
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    if(linkfb && linkfb.trim() !== '' && urlRegex.test(linkfb)){
      window.open(linkfb, '_system')
    } else {
      this.alert = await this.alertController.create({
        header: 'Lo sentimos',
        message: 'El link no existe o no ha sido cargado',
        buttons: ['OK']
      });
      await this.alert.present()
    }
  }

  async zoom(linkZoom: any){
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    
    if(linkZoom && linkZoom.trim() !== '' && urlRegex.test(linkZoom)){
      window.open(linkZoom, '_system')
    } else {
      this.alert = await this.alertController.create({
        header: 'Lo sentimos',
        message: 'El link no existe o no ha sido cargado',
        buttons: ['OK']
      });
      await this.alert.present()
    }
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
