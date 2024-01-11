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

  @Input() Diplomado: any
  @Input() Boton: any
  @Input() Valor: any
  @Input() Mensaje: any
  public fechasDiplomado: string[] = []

  constructor(private modalCtrl:ModalController, private adminService:AdminService, private userService:UserService) { }

  ngOnInit() {
    console.log(this.Diplomado + "----")
    if(this.Diplomado.idCategoria == 2){
      this.getCalendario()
    }
  }

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
    alert(this.Mensaje)
    location.reload()
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return this.formatoFecha(objc,'dd/mm/yyyy') 
  }

  fb(linkfb: any){
    window.open(linkfb, '_system')
  }

  zoom(linkZoom: any){
    window.open(linkZoom, '_system')
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
