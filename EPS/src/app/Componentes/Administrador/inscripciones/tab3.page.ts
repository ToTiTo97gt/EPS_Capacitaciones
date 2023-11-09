import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private adminService:AdminService,private modalCtrl:ModalController) {}

  public anio: any
  public jornadas: any
  public capacitaciones: any
  public diplomados: any

  public jornada: any
  public tipo: any

  ngOnInit(): void {
    var anioActual = new Date()
    this.getPorAnio(anioActual.getFullYear())
  }

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any, tipo: any){
    if(tipo == 1){
      this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, 1)
      console.log('capacitaciones')
    } else {
      this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, 2)
      console.log('diplomados')
    }
    console.log(this.capacitaciones)
      
  }

  dateChanged(event: any){
    const newDate = event.detail.value;
    this.anio = newDate.split('-')[0]
    this.getPorAnio(this.anio)
  }

  jornadaChange(event: any){
    const valorSeleccionado = event.detail.value;
    this.jornada = valorSeleccionado
  }

  tipoChange(event: any){
    const valorSeleccionado = event.detail.value
    this.getCapacitacionesPorJornada(this.jornada, valorSeleccionado)
  }

}
