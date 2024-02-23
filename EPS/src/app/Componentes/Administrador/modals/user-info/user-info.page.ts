import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  @Input() Usuario: any;
  constructor(private adminService:AdminService, private UserService:UserService, private modalCtrl:ModalController) { }

  public anio: any
  public jornadas: any
  public capacitaciones: any

  public jornada: any
  public tipo: any
  public estado: any
  public tipoUsuario: any
  public tipos: any

  ngOnInit() {
    this.tipoUsuario = this.Usuario.idTipo
    var anioActual = new Date()
    this.estado = this.Usuario.estado
    this.getPorAnio(anioActual.getFullYear())
    this.tiposUsuarios()
  }

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any, tipo: any){
    if(tipo == 1){
      this.capacitaciones = await this.adminService.DiplomaCapacitaciones(this.Usuario.idUsuario, idJornada)
    } else {
      this.capacitaciones = await this.adminService.DiplomaDiplomados(this.Usuario.idUsuario, idJornada)
    }
  }

  async tiposUsuarios(){
    this.tipos = await this.UserService.TiposUsuarios()
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
    this.tipo = valorSeleccionado
    this.getCapacitacionesPorJornada(this.jornada, valorSeleccionado)
  }

  async userTipoChange(event: any){
    this.tipoUsuario = event.detail.value
    await this.adminService.CambiarTipo(this.Usuario.idUsuario, this.tipoUsuario)
    alert('Se cambio el tipo de usuario')
    location.reload()
  }

  async estadoChange(event: any){
    this.estado = event.detail.value
    await this.adminService.CambiarEstado(this.Usuario.idUsuario, this.estado)
    alert('Se modifico el estado del usuario')
    location.reload()
  }

  async GenerarDiploma(capacitacion: any){
    if(this.tipo == 1){
      if(capacitacion.presente == 1){
        try {
          // Crea un nuevo documento PDF
          var modalidad = ""
          if(capacitacion.modalidad == 1){
              modalidad = "virtuales"
          } else if(capacitacion.modalidad == 2){
              modalidad = "presenciales"
          } else if(capacitacion.modalidad == 3){
              modalidad = "mixtas"
          }
          const duracion = capacitacion.duracion
          const pdfDoc = await PDFDocument.create();
          const jpgUrl = 'https://bucket-jornadas.s3.amazonaws.com/Plantillas/PlantillaDiploma.jpg'
          const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
          const pageWidth = 792; //792 - 600
          const pageHeight = 612; //612 - 400
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
  
          const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
          const scaleFactor = Math.min(pageWidth / jpgImage.width, pageHeight / jpgImage.height)
          const scaledWidth = jpgImage.width * scaleFactor;
          const scaledHeight = jpgImage.height * scaleFactor;
          page.drawImage(jpgImage, {
              x: 0,
              y: 0,
              width: scaledWidth,
              height: scaledHeight
          })
      
          // Incrusta la fuente en el documento
          const customFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
      
          // Usa la fuente personalizada en el texto
          const nombre = this.Usuario.nombre + " " + this.Usuario.apellido;
  
          const fontSize = 24;
          const longitudTexto = customFont.widthOfTextAtSize(nombre, fontSize);
          const PosX = (pageWidth - longitudTexto) / 2;
          
          page.drawText(nombre, { font: customFont, x: (PosX + 5), y: 368, size: fontSize });
          
          const txt1 = "Por su participacion en la conferencia";
          const capaci = `"${capacitacion.nomCapacitacion}"`
          const txt2 = `Con una duracion de ${capacitacion.duracion} horas ${modalidad}`;
          const txt3 = 'Dado en la Ciudad de Guatemala, '+this.convertir(capacitacion.fecha);
          
          const font2 = await pdfDoc.embedFont(StandardFonts.Helvetica)
          const font1 = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
          const tam = 18
          const l1 = font2.widthOfTextAtSize(txt1, tam)
          const l2 = font1.widthOfTextAtSize(capaci, tam)
          const l3 = font2.widthOfTextAtSize(txt2, tam)
          const l4 = font2.widthOfTextAtSize(txt3, tam)
          
          page.drawText(txt1, {
              font: font2,
              x: ((pageWidth - l1) / 2),
              y: 334, size: tam});
          page.drawText(capaci, {
              font: font1,
              x: ((pageWidth - l2) / 2),
              y: 308, size: tam});
          page.drawText(txt2, {
              font: font2,
              x: ((pageWidth - l3) / 2),
              y: 284, size: tam});
          page.drawText(txt3, {
              font: font2,
              x: ((pageWidth - l4) / 2),
              y: 258, size: tam});
          // Guarda el documento
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        } catch (error) {
          alert('Error al generar el PDF: ' + error)
        }
      } else {
        alert('conferencia no se presento')
      }
    } else {
      if(capacitacion.presente == 1 && capacitacion.nota >= 70){
        try {
          // Crea un nuevo documento PDF
          var modalidad = ""
          if(capacitacion.modalidad == 1){
              modalidad = "virtuales"
          } else if(capacitacion.modalidad == 2){
              modalidad = "presenciales"
          } else if(capacitacion.modalidad == 3){
              modalidad = "mixtas"
          }
          const duracion = capacitacion.duracion
          const pdfDoc = await PDFDocument.create(); 
          const jpgUrl = capacitacion.diploma
          const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())
          const pageWidth = 816; //hoja doble oficio
          const pageHeight = 1248; //hoja doble oficio
          const page = pdfDoc.addPage([pageWidth, pageHeight]);
  
          const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
          const scaleFactor = Math.min(pageWidth / jpgImage.width, pageHeight / jpgImage.height)
          const scaledWidth = jpgImage.width * scaleFactor;
          const scaledHeight = jpgImage.height * scaleFactor;
          page.drawImage(jpgImage, {
              x: 0,
              y: 0,
              width: scaledWidth,
              height: scaledHeight
          })
      
          // Incrusta la fuente en el documento
          const customFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
          // Usa la fuente personalizada en el texto
          const nombre = this.Usuario.nombre + " " + this.Usuario.apellido;
  
          const fontSize = 42;
          const longitudTexto = customFont.widthOfTextAtSize(nombre, fontSize);
          const PosX = (pageWidth - longitudTexto) / 2;
          const color = rgb(0, 0, 1)
          
          page.drawText(nombre, { font: customFont, x: (PosX-5), y: 570, size: fontSize});
  
          const capaci = `"${capacitacion.nomCapacitacion}"`
          const txt2 = `Realizado del ${this.convertir2(capacitacion.inicio)} al ${this.convertir3(capacitacion.fin)},`;
          const txt3 = `con una duracion de ${duracion} horas ${modalidad}`;
          const txt4 = `Dado en la Ciudad de Guatemala en la fecha del ${this.convertir3(capacitacion.fin)}`
          
          const font2 = await pdfDoc.embedFont(StandardFonts.Helvetica)
          const font1 = await pdfDoc.embedFont(StandardFonts.TimesRoman)
          const tam = 18, tam2 = 14, tam3 = 38
          const l1 = font1.widthOfTextAtSize(capaci, tam3)
          const l2 = font2.widthOfTextAtSize(txt2, tam2)
          const l3 = font2.widthOfTextAtSize(txt3, tam2)
          const l4 = font2.widthOfTextAtSize(txt4, tam2)
          
          page.drawText(capaci, {
              font: font1,
              x: ((pageWidth - l1) / 2),
              y: 465, size: tam3});
          page.drawText(txt2, {
              font: font2,
              x: ((pageWidth - l2) / 2),
              y: 425, size: tam2});
          page.drawText(txt3, {
              font: font2,
              x: ((pageWidth - l3) / 2),
              y: 400, size: tam2});
          page.drawText(txt4, {
              font: font2,
              x: ((pageWidth - l4) / 2),
              y: 370, size: tam2});
          // Guarda el documento
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
    
      } catch (error) {
        alert('Error al generar el PDF: ' + error)
      }
      } else {
        alert('Diplomado Reprobado: ' + capacitacion.nota)
      }
    }
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

  Regresar(){
    this.modalCtrl.dismiss()
  }

}
