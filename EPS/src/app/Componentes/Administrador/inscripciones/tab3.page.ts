import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { InscripcionInfoPage } from '../modals/inscripcion-info/inscripcion-info.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(private adminService:AdminService,private modalCtrl:ModalController) {
    this.cargarAnios()
  }

  public anio: any
  public jornadas: any
  public capacitaciones: any

  public jornada: any
  public tipo: any

  ngOnInit(): void {
    const año = new Date().getFullYear()
    this.anio = año.toString()
    var anioActual = new Date()
    this.getPorAnio(anioActual.getFullYear())
  }

  years: number[] = []
  cargarAnios() {
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let i = currentYear; i >= 2023; i--) {
      this.years.push(i);
    }
  }

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any, tipo: any){
    if(tipo == 1){
      this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, 1)
    } else {
      this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, 2)
    }
      
  }

  async mostrarInscripciones(capacitacion: any){
    const modal = await this.modalCtrl.create({
      component: InscripcionInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        Capacitacion: capacitacion
        /* idCapacitacion: capacitacion.idCapacitacion,
        nomCapacitacion: capacitacion.nomCapacitacion,
        descripcion: capacitacion.descripcion,
        presentador: capacitacion.presentador,
        poster: capacitacion.poster,
        zoomLink: capacitacion.zoomLink,
        fbLink: capacitacion.fbLink,
        idJornada: capacitacion.jornada,
        idCategoria: capacitacion.idCategoria */
      }
    });
    await modal.present();
  }

  dateChanged(){
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
