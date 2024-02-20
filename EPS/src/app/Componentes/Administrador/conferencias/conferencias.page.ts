import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.page.html',
  styleUrls: ['./conferencias.page.scss'],
})
export class ConferenciasPage implements OnInit {

  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;  
  
  selectedFile:File | null = null;
  constructor(private adminService:AdminService, public alertController:AlertController) { }

  public anio: any
  public jornadas: any
  public capacitaciones: any
  public categoria = 1
  public jornada: any
  public idCapacitacion: any
  public alert: any

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
      console.log(formData)

      this.data = await this.adminService.enviarCsv(formData)
      console.log(this.data)
      
      console.log("Fuera del servicio: "+this.data)
    }
  }

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any, categoria: any){
    this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada, categoria)
  }

  async MarcarAsistencias(){
    if(this.idCapacitacion === undefined){
      this.alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Seleccione una capacitacion para registrar a sistencias',
        buttons: ['OK']
      });
      await this.alert.present()
    } else {
      await this.adminService.MarcarAsistencias(this.idCapacitacion, this.data, 1)
      await this.adminService.MarcarAsistencias(this.idCapacitacion, this.data, 2)
      this.alert = await this.alertController.create({
        header: 'Listo',
        message: 'Asistencias Registradas',
        buttons: ['OK']
      });
      await this.alert.present()
    }
  }

  async SubirNotas(){
    if(this.idCapacitacion === undefined){
      this.alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Seleccionar un Diplomado para cargar notas',
        buttons: ['OK']
      });
      this.alert.onDidDismiss().then(() => {
        location.reload()
      })
      await this.alert.present()
    } else {
      await this.adminService.MarcarAsistencias(this.idCapacitacion, this.data, 2)
      this.alert = await this.alertController.create({
        header: 'Listo',
        message: 'Notas Cargadas',
        buttons: ['OK']
      });
      this.alert.onDidDismiss().then(() => {
        location.reload()
      })
      await this.alert.present()
    }
    //console.log(this.data)
  }

  nota: number = 0
  async validar(nota: any){
    if (nota < 0) {
      this.alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Valor no valido solo se puede ingresar entre 0 y 100',
        buttons: ['OK']
      });
      await this.alert.present()
      nota += 1
    } else if (nota > 100) {
      this.alert = await this.alertController.create({
        header: 'Listo',
        message: 'Valor no valido solo se puede ingresar entre 0 y 100',
        buttons: ['OK']
      });
      await this.alert.present()
      nota -= 1
    }
  }

  dateChanged(event: any){
    const newDate = event.detail.value;
    this.anio = newDate.split('-')[0]
    this.getPorAnio(this.anio)
  }

  jornadaChange(event: any){
    const valorSeleccionado = event.detail.value;
    this.jornada = valorSeleccionado
    this.getCapacitacionesPorJornada(valorSeleccionado, this.categoria)
  }

  categoriaChange(event: any){
    const valorSeleccionado = event.detail.value
    this.categoria = valorSeleccionado
    this.getCapacitacionesPorJornada(this.jornada, valorSeleccionado)
  }

  tipoChange(event: any){
    const valorSeleccionado = event.detail.value
    this.idCapacitacion = valorSeleccionado
  }

}
