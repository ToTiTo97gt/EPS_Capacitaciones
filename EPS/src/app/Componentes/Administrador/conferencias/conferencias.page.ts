import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.page.html',
  styleUrls: ['./conferencias.page.scss'],
})
export class ConferenciasPage implements OnInit {

  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;  
  
  selectedFile:File | null = null;
  constructor(private adminService:AdminService) { }

  public anio: any
  public jornadas: any
  public capacitaciones: any
  public jornada: any
  public idCapacitacion: any

  ngOnInit() {
    var anioActual = new Date()
    this.getPorAnio(anioActual.getFullYear())
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  public data: any

  async cargarArchivo(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.data = await this.adminService.enviarCsv(formData)
      console.log(this.data)
      
      console.log("Fuera del servicio: "+this.data)
    }
  }

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any){
    this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, 1)
  }

  async MarcarAsistencias(){
    if(this.idCapacitacion === undefined){
      alert('no hay capacitacion seleccionada')
    } else {
      await this.adminService.MarcarAsistencias(this.idCapacitacion, this.data)
    }
    
  }

  dateChanged(event: any){
    const newDate = event.detail.value;
    this.anio = newDate.split('-')[0]
    this.getPorAnio(this.anio)
  }

  jornadaChange(event: any){
    const valorSeleccionado = event.detail.value;
    this.getCapacitacionesPorJornada(valorSeleccionado)
  }

  tipoChange(event: any){
    const valorSeleccionado = event.detail.value
    this.idCapacitacion = valorSeleccionado
  }

}
