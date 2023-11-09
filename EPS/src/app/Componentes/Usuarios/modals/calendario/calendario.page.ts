import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  @Input() idDiplomado: any
  @Input() Diplomado: any
  public fechasDiplomado: string[] = []

  constructor(private modalCtrl:ModalController, private adminService:AdminService, private UserService:UserService) { }

  ngOnInit() {
    this.getCalendario()
  }

  public fechas: any
  async getCalendario(){
    this.fechas = await this.UserService.CalendarioDiplomado(this.idDiplomado)
    for(let fecha of this.fechas){
      const fechadate = new Date(fecha.fecha)
      this.fechasDiplomado.push(fechadate.toISOString().split('T')[0])
    }
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return this.formatoFecha(objc,'dd/mm/yyyy') 
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
