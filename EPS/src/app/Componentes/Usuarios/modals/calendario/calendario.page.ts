import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/Servicios/user.servicio';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  @Input() Diplomado: any
  @Input() Boton: any
  @Input() Valor: any
  @Input() Mensaje: any
  public fechasDiplomado: string[] = []
  minDate: string;
  constructor(private modalCtrl:ModalController,
   private userService:UserService, public alertController:AlertController) {
    this.minDate = '2023-01-01T00:00:00Z'
   }

  ngOnInit() {
    this.minDate = '2023-01-01T00:00:00Z'
    if(this.Diplomado.idCategoria == 2){
      this.getCalendario()
    }
  }

  public alert: any
  public fechas: any
  async getCalendario(){
    this.fechas = await this.userService.CalendarioDiplomado(this.Diplomado.idCapacitacion)
    for(let fecha of this.fechas){
      const fechadate = new Date(fecha.fecha)
      this.fechasDiplomado.push(fechadate.toISOString().split('T')[0])
    }
  }

  async Inscribir(idCapacitacion: any){
    let res = await this.userService.Inscripcion(this.userService.idG, idCapacitacion, this.Valor)
    this.alert = await this.alertController.create({
      header: 'Listo',
      message: this.Mensaje,
      buttons: ['OK']
    });
    this.alert.onDidDismiss().then(() => {
      location.reload()
    })
    await this.alert.present()
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return this.formatoFecha(objc,'dd/mm/yyyy') 
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

  Regresar(){
    this.modalCtrl.dismiss()
  }
}
