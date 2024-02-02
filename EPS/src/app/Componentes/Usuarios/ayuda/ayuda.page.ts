import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/user.servicio';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  constructor(private UserService:UserService, public alertController:AlertController) { }

  ngOnInit() {

  }

  public alert: any
  public Asunto: any
  public Descripcion: any

  async EnviarAyuda(){
    if(this.Asunto == "" || this.Asunto == null){
      this.alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Por Favor Agregue el asunto de su problema',
        buttons: ['OK']
      });
      await this.alert.present()
    } else {
      if(this.Descripcion == "" || this.Descripcion == null){
        this.alert = await this.alertController.create({
          header: 'Aviso',
          message: 'Por favor, indiquenos su situacion',
          buttons: ['OK']
        });
        await this.alert.present()
      } else {
        await this.UserService.EnviarAyuda(this.UserService.idG, this.Asunto, this.Descripcion)
        this.alert = await this.alertController.create({
          header: 'Listo',
          message: 'Su situacion fue enviada a los administradores',
          buttons: ['OK']
        });
        this.alert.onDidDismiss().then(() => {
          location.reload()
        })
        await this.alert.present()
        alert('Su situacion fue enviada a los administradores')
      }
    }
  }

}
