import { Component, OnInit } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { Font } from '@pdf-lib/fontkit';
import { AdminService } from '../../../Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.page.html',
  styleUrls: ['./diplomas.page.scss'],
})
export class DiplomasPage implements OnInit {

  constructor(private adminService:AdminService, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    //console.log(this.userService.datosUser)
    this.datos.nombre = this.userService.datosUser.nombre
    this.datos.apellido = this.userService.datosUser.apellido
    this.getDiplomas()
  }

  public datas: any
  public datas1: any

  async getDiplomas(){
    this.datas = await this.userService.Diplomas(this.userService.idG)
    this.datas1 = await this.userService.Diplomados(this.userService.idG)
  }

  datos = {
    nombre: this.userService.datosUser.nombre,
    apellido: this.userService.datosUser.apellido,
    modalidad: "",
    duracion: ""
  }
  public diploma: any
  public diplomado: any
  public generar = 0
  async generarPDF(data: any){
    if(data.dat == 0){
      this.datos.modalidad = data.modalidad
      this.datos.duracion = data.duracion
      data.dat = 1
      data.link = await this.userService.GenerarPDF(this.datos, data.nomCapacitacion, this.convertir(data.fecha))
      //console.log(this.diploma.URL)
    } else if (data.dat == 1){
      data.dat = 0
      if (data.link && data.link.URL) {
        // Utilizar window.location.href para iniciar la descarga del archivo
        window.location.href = data.link.URL;
      } else {
        console.error('Error al obtener el enlace del archivo desde el servidor.');
      }
    }
  }

  fechas = {
    inicio: "",
    fin: ""
  }
  public generar2 = 0;
  async generarDiplomado(data: any){
    if(data.dat == 0){
      this.fechas.inicio = this.convertir2(data.inicio)
      this.fechas.fin = this.convertir3(data.fin)
      this.datos.modalidad = data.modalidad
      this.datos.duracion = data.duracion
      data.dat = 1
      data.link = await this.userService.GenerarDiplomadoPDF(this.datos, data.nomCapacitacion, this.fechas, data.diploma)
    } else if (data.dat == 1){
      data.dat = 0
      if (data.link && data.link.URL) {
        // Utilizar window.location.href para iniciar la descarga del archivo
        window.location.href = data.link.URL;
      } else {
        console.error('Error al obtener el enlace del archivo desde el servidor.');
      }
    }
    //console.log(capacitacion + "/" + this.fechas.inicio + "-" +this.fechas.fin + "/" + diploma)
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    console.log(objc.getDate() + "/" + objc.getMonth()+"/"+objc.getFullYear())
    return this.convertirFechaATexto(objc)
  }

  convertirFechaATexto(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formatoFecha = new Intl.DateTimeFormat('es-ES', opciones);
    
    return formatoFecha.format(fecha);
  }

  convertir2(fecha: string){
    var objc = new Date(fecha)
    return this.FechaSinAño(objc.getDate() + "/" + (objc.getMonth()+1)+"/"+objc.getFullYear())
  }

  FechaSinAño(fecha:string):string{
    const numeros = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta', 'treinta y uno'];

    interface Meses{
      [key: string]:string
    }

    const meses: Meses = {
      '1': 'enero',
      '2': 'febrero',
      '3': 'marzo',
      '4': 'abril',
      '5': 'mayo',
      '6': 'junio',
      '7': 'julio',
      '8': 'agosto',
      '9': 'septiembre',
      '10': 'octubre',
      '11': 'noviembre',
      '12': 'diciembre'
    };
    
    const [dia, mes, anio] = fecha.split('/')
    const DiaEscrito = numeros[parseInt(dia)]
    const mesEscrito = meses[mes]

    const fechaEscrita = `${DiaEscrito} de ${mesEscrito}`
    return fechaEscrita

  }

  convertir3(fecha: string){
    var objc = new Date(fecha)
    return this.FechaEscrita(objc.getDate() + "/" + (objc.getMonth()+1)+"/"+objc.getFullYear())
  }

  FechaEscrita(fecha:string):string{
    const numeros = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve', 'treinta', 'treinta y uno'];

    interface Meses{
      [key: string]:string
    }

    const meses: Meses = {
      '1': 'enero',
      '2': 'febrero',
      '3': 'marzo',
      '4': 'abril',
      '5': 'mayo',
      '6': 'junio',
      '7': 'julio',
      '8': 'agosto',
      '9': 'septiembre',
      '10': 'octubre',
      '11': 'noviembre',
      '12': 'diciembre'
    };
    
    const [dia, mes, anio] = fecha.split('/')
    const DiaEscrito = numeros[parseInt(dia)]
    const mesEscrito = meses[mes]
    const anioEscrito = `del dos mil ${numeros[parseInt(anio.substring(2))]}`

    const fechaEscrita = `${DiaEscrito} de ${mesEscrito} ${anioEscrito}`
    return fechaEscrita

  }

  

  

}
