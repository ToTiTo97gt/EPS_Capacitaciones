import { Component, OnInit, Input, inject, ElementRef, ViewChild} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { UserService } from 'src/app/Servicios/user.servicio';
import { dateInputsHaveChanged } from '@angular-material-components/datetime-picker/lib/datepicker-input-base';
import { DomSanitizer } from '@angular/platform-browser';
import { EmptyError } from 'rxjs';

@Component({
  selector: 'app-capacitacion-info',
  templateUrl: './capacitacion-info.page.html',
  styleUrls: ['./capacitacion-info.page.scss'],
})
export class CapacitacionInfoPage implements OnInit {

  @Input() idCapacitacion: any
  @Input() nomCapacitacion: any
  @Input() descripcion: any
  @Input() presentador: any
  @Input() poster: any
  @Input() zoomLink: any
  @Input() fbLink: any
  @Input() idCategoria: any

  @Input() estado: any
  @Input() diploma: any
  @Input() duracion: any
  @Input() modalidad: any

  base64: string="Base64...";
  fileSelected?:Blob;
  imageUrl?:string;
  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;
  minDate: string;

  constructor(private sant:DomSanitizer, private modalCtrl:ModalController, private adminService:AdminService, private userService:UserService) {
    this.minDate = '2023-01-01T00:00:00Z'
  }

  public agenda: any
  datosAgenda = {
    fecha: "",
    hora: ""
  }

  public capacitacion: any = {
    idCapacitacion: "",
    nomCapacitacion: "",
    descripcion: "",
    presentador: "",
    poster: "",
    zoomLink: "",
    fbLink: "",
    idJornada: "",
    
    estado: "",
    diploma: "",
    duracion: "",
    modalidad: ""
  }

  public oldPoster: any
  public oldTitle = "" 

  fechaYhora = ""
  datetime: Date = new Date()

  ngOnInit() {
    this.oldTitle = this.nomCapacitacion
    this.base64 = "Base64..."
    this.oldPoster = this.poster
    this.imageUrl = this.poster
    this.getAgenda()
    this.getTipo()
    this.listaTipoActual()
  }

  onSelectNewFile():void{
    this.fileSelected=this.fileInput.nativeElement.files[0];
    if(this.fileSelected){
      var arr = this.poster.split("\\")
      this.poster = arr[arr.length-1]
      this.imageUrl=this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    
    }else{
      alert('error al seleccionar el archivo')
    }
    
  }

  public fech: any
  public hora: any
  async getAgenda(){
    this.agenda = await this.adminService.getAgenda(this.idCapacitacion)
    if(Array.isArray(this.agenda) && this.agenda.length > 0 && this.agenda.length == 1){
      const Elemento = this.agenda[0]
      var obj1 = new Date(Elemento.fecha)
      this.datosAgenda.fecha = obj1.toISOString().split('T')[0]
      this.datosAgenda.hora = Elemento.hora
      this.datetime = new Date(this.datosAgenda.fecha)
      this.fechaYhora = `${this.datetime.toISOString().split('T')[0]}T${this.datosAgenda.hora}`
      this.fech = this.datosAgenda.fecha
      this.hora = this.datosAgenda.hora
    } else if (Array.isArray(this.agenda) && this.agenda.length > 1){
      for(var i = 0; i < this.agenda.length; i++) {
        var Elemento = this.agenda[i]
        this.AgregarFecha(Elemento.fecha, Elemento.hora)
      }
      this.FechasAnteriores = JSON.parse(JSON.stringify(this.Fechas))
    }
    
  }

  FechaYHoraAsignacion(event: any){
    this.fechaYhora = event.detail.value
  }

  fechaAsignacion(event: any){
    this.horaYFecha.fecha = event.detail.value
  }

  horaAsignacion(event: any){
    this.horaYFecha.hora = event.detail.value.split('T')[1]
  }

//Probar la modificacion de datos de una capacitacion
  async modificarCapacitacion(){
    const fechaHora = new Date(this.fechaYhora);
    this.datosAgenda.fecha = this.formatoFecha(fechaHora, 'yyyy-mm-dd')
    this.datosAgenda.hora = fechaHora.toLocaleTimeString();
    this.capacitacion.idCapacitacion = this.idCapacitacion
    this.capacitacion.nomCapacitacion = this.nomCapacitacion
    this.capacitacion.descripcion = this.descripcion
    this.capacitacion.presentador = this.presentador
    this.capacitacion.poster = this.poster
    this.capacitacion.zoomLink = this.zoomLink
    this.capacitacion.fbLink = this.fbLink

    this.capacitacion.estado = this.estado
    this.capacitacion.duracion = this.duracion
    this.capacitacion.modalidad = this.modalidad
    let respuesta1 = await this.adminService.GetJornadaEspecifica(this.datosAgenda)
    if (Array.isArray(respuesta1) && respuesta1.length > 0) {
      const primerElemento = respuesta1[0];
      if (primerElemento.hasOwnProperty('idJornada')) {
        this.capacitacion.idJornada = primerElemento.idJornada;
        if(this.poster == this.oldPoster){
          this.modif()
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(this.fileSelected as Blob);
          
          reader.onloadend= async ()=>{
            this.base64=reader.result as string;
            let arrayAux=this.base64.split(",",2)
            this.base64 = arrayAux[1]
            let auxArr = this.oldPoster.split("https://bucket-jornadas.s3.amazonaws.com/",2)
            this.oldPoster = auxArr[1]
            this.modif()
          } 
        }
        
        //console.log('Valor de idJornada:', this.capacitacion.idJornada);
      } else {
        console.log('El primer elemento no tiene la propiedad "idJornada".');
      }
    } else {
      alert('La fecha ingresada no conicide con ninguna jornada')
      console.log('El arreglo está vacío o no es un arreglo válido.');
    }
  }

  async modif(){
    let respuesta2 = await this.adminService.modificarCapacitacion(this.capacitacion, this.base64, this.oldPoster)
    try {
      const resp = respuesta2 as {mensaje?: string}
      if(resp.mensaje !== undefined){
        const mensaje = resp.mensaje
        let respuesta4 = await this.adminService.modificarAgenda(this.datosAgenda, this.idCapacitacion, 0)
        try {
          const resp4 = respuesta4 as {mensaje?: string}
          if(resp.mensaje !== undefined){
            const mensaje2 = resp4.mensaje
            alert(mensaje +"||" + mensaje2)
            location.reload()
          } else {
            console.log('Error al modificar la fecha y hora \n'+ resp4)
          }
        } catch (error) {
          console.log(error)
          alert('error al modificar la hora y fecha')
        }
      } else {
        console.log(respuesta2)
        alert('error al modificar la capacitacion')
      }
    } catch (error) {
      console.log(error)
      alert('error en la modificacion')
    }
  }
  async getTipo(){
    this.tipos = await this.userService.TiposUsuarios()
  }

  async listaTipoActual(){
    this.actuales = await this.adminService.ListaActual(this.idCapacitacion)
  }

  actuales: any
  tipos: any
  tiposSeleccionados: any = {};
  datos: any
  async guardarSeleccion(){
    this.datos = Object.keys(this.tiposSeleccionados)
    .filter(key => this.tiposSeleccionados[key])
    .map(key => ({ idTipo: key, tipo: this.tiposSeleccionados[key]}));
    if(this.datos.length === 0){
      alert('Seleccione los usuarios para asignar diploma')
    } else {
      let res = await this.adminService.AsingarDiploma(this.idCapacitacion, this.datos)
      location.reload()
    }
  }

  async modificarDiplomado(){
    this.capacitacion.idCapacitacion = this.idCapacitacion
    this.capacitacion.nomCapacitacion = this.nomCapacitacion
    this.capacitacion.descripcion = this.descripcion
    this.capacitacion.presentador = ""
    this.capacitacion.poster = this.poster
    this.capacitacion.zoomLink = this.zoomLink
    this.capacitacion.fbLink = this.fbLink

    this.capacitacion.diploma = this.diploma
    this.capacitacion.estado = this.estado
    this.capacitacion.duracion = this.duracion
    this.capacitacion.modalidad = this.modalidad
    let respuesta1 = await this.adminService.GetJornadaEspecifica(this.Fechas[0])
    if (Array.isArray(respuesta1) && respuesta1.length > 0) {
      const primerElemento = respuesta1[0];
      if (primerElemento.hasOwnProperty('idJornada')) {
        this.capacitacion.idJornada = primerElemento.idJornada;
        if(this.poster == this.oldPoster){
          this.modifDip()
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(this.fileSelected as Blob);
          
          reader.onloadend= async ()=>{
            this.base64=reader.result as string;
            let arrayAux=this.base64.split(",",2)
            this.base64 = arrayAux[1]
            let auxArr = this.oldPoster.split("https://bucket-jornadas.s3.amazonaws.com/",2)
            this.oldPoster = auxArr[1]
            this.modifDip()
          } 
        }
        
        //console.log('Valor de idJornada:', this.capacitacion.idJornada);
      } else {
        console.log('El primer elemento no tiene la propiedad "idJornada".');
      }
    } else {
      alert('La fecha ingresada no conicide con ninguna jornada')
      console.log('El arreglo está vacío o no es un arreglo válido.');
    }
  }

  async modifDip(){
    let respuesta2 = await this.adminService.modificarCapacitacion(this.capacitacion, this.base64, this.oldPoster)
    try {
      const resp = respuesta2 as {mensaje?: string}
      if(resp.mensaje !== undefined){
        const mensaje = resp.mensaje
        if(this.huboCambios(this.Fechas)){
          let respuesta4 = await this.adminService.modificarAgenda(this.Fechas, this.idCapacitacion, 1)
          try {
            const resp4 = respuesta4 as {mensaje?: string}
            if(resp.mensaje !== undefined){
              const mensaje2 = resp4.mensaje
              alert(mensaje +"||" + mensaje2)
              location.reload()
            } else {
              console.log('Error al modificar la fecha y hora \n'+ resp4)
            }
          } catch (error) {
            console.log(error)
            alert('error al modificar la hora y fecha')
          }
        } else {
          alert(mensaje + " no hubo modificacion de agenda")
        }
      } else {
        console.log(respuesta2)
        alert('error al modificar la capacitacion')
      }
    } catch (error) {
      console.log(error)
      alert('error en la modificacion')
    }
  }

  Regresar(){
    this.modalCtrl.dismiss()
  }


  FechasAnteriores: any[] = []
  Fechas: any[] = []
  horaYFecha: any = {
    fecha: "",
    hora: ""
  }

  async modificarEstado(idCapacitacion: any){
    if(this.estado == 1){
      await this.adminService.modificarEstado(idCapacitacion, 0)
      alert('Cancelado')
    } else {
      await this.adminService.modificarEstado(idCapacitacion, 1)
      alert('Rehabilitado')
    }
    location.reload()
  }

  huboCambios(jsonActual: any[]) {
    // Comparar jsonActual con jsonAnterior
    if (JSON.stringify(jsonActual) !== JSON.stringify(this.FechasAnteriores)) {
      return true
    } else {
      return false
    }
  }

  AgregarFecha(fecha: any, hora: any){
    this.horaYFecha.fecha = fecha.split('T')[0]
    
    this.horaYFecha.hora = hora
    const nuevo = {
      fecha: this.horaYFecha.fecha,
      hora: this.horaYFecha.hora
    }

    const existe = this.Fechas.some((item) => item.fecha === nuevo.fecha && item.hora === nuevo.hora);
 
    if (!existe) {
      // Evitar agregar fechas duplicadas si es necesario
      this.Fechas.push(nuevo);
    } else {
      alert('ya existe')
    }
  }

  eliminar(fecha: any, hora: any){
    console.log(fecha + " " + hora)
    const id = this.Fechas.findIndex((dato) => dato.fecha === fecha && dato.hora === hora)
    if(id !== -1){
      console.log(id)
      this.Fechas.splice(id, 1)
    }
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return objc.toISOString().split('T')[0]
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

}
