import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrearInfoPage } from '../../modals/crear-info/crear-info.page';
import { CapacitacionInfoPage } from '../../modals/capacitacion-info/capacitacion-info.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  public menu!: string
  private activatedRoute = inject(ActivatedRoute)
  public jornada: any = {
    ciclo: "",
    FechaInicio: "",
    FechaFinal: ""
  }

  public showDatePicker = false
  public jornadas: any;

  constructor(private adminService:AdminService,private modalCtrl:ModalController) {
    this.menu = "Jornadas"
  }

  ngOnInit() {
    
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string
    this.Actualizar0()
    this.Actualizar1()
    this.GetJornadas()
    this.GetCapacitaciones()
  }

  async Actualizar0(){
    let resp0 = await this.adminService.Actualizar0()
  }

  async Actualizar1(){
    let resp1 = await this.adminService.Actualizar1()
  }

  async mostrarJornada(idJornada: any, ciclo: any, DateInicio: any, DateFinal: any, estado:any){
    const modal = await this.modalCtrl.create({
      component: CrearInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        idJornada: idJornada,
        ciclo: ciclo,
        fechaInicio: DateInicio,
        fechaFinal: DateFinal,
        estado: estado 
      }
    });
    await modal.present();
  }

  async registrarJornada(){
    if(this.validarArray(this.jornada)){
      var fecha1 = this.jornada.FechaInicio
      var fecha2 = this.jornada.FechaFinal
      var obj1 = new Date(fecha1)
      var obj2 = new Date(fecha2)
      this.jornada.FechaInicio = obj1.toISOString().split('T')[0]
      this.jornada.FechaFinal = obj2.toISOString().split('T')[0]
      let respuesta = await this.adminService.CrearJornada(this.jornada)
      try {
        const resp = respuesta as {mensaje?: string}
        if(resp.mensaje !== undefined){
          const mensaje = resp.mensaje
          alert(mensaje)
          this.vaciar()
        } else {
          console.log(respuesta)
          alert('error al recibir respuesta')
        }
      } catch (error) {
        console.log(error)
        alert('error al registrar la nueva jornada')
      }
    } else {
      alert("Informacion insuficiente")
    }

  }

  async GetJornadas(){
    this.jornadas = await this.adminService.GetJornadas()
  }

  vaciar(){
    this.jornada.ciclo = ""
    this.jornada.FechaInicio = ""
    this.jornada.FechaFinal = ""
    this.capacitacion.nomCapacitacion = ""
    this.capacitacion.descripcion = ""
    this.capacitacion.presentador = ""
    this.capacitacion.idJornada = ""
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return objc.toISOString().split('T')[0]
  }

  validarArray(jornada: any) {
    for (const key in jornada) {
      if (jornada.hasOwnProperty(key) && jornada[key] === "") {
        return false; // Al menos un campo está vacío
      }
    }
    return true;
  }

  //Segunda pestaña
  
  fechaYhora = ""
  public capacitaciones: any

  public capacitacion: any = {
    nomCapacitacion: "",
    descripcion: "",
    presentador: "",
    poster: "linkPoster",
    zoomLink: "LinkZoom",
    fbLink: "LinkFaceBook",
    idJornada: "",
    idCategoria: 1
  }

  public agenda: any = {
    fecha: "",
    hora: "",
    idCapacitacion: ""
  }

  async GetCapacitaciones(){
    this.capacitaciones = await this.adminService.Capacitaciones()
  }

  async CrearCapacitacion(){
    const fechaHora = new Date(this.fechaYhora);
    this.agenda.fecha = this.formatoFecha(fechaHora, 'yyyy-mm-dd')
    this.agenda.hora = fechaHora.toLocaleTimeString();
    let respuesta1 = await this.adminService.GetJornadaEspecifica(this.agenda)
    if (Array.isArray(respuesta1) && respuesta1.length > 0) {
      const primerElemento = respuesta1[0];
      if (primerElemento.hasOwnProperty('idJornada')) {
        this.capacitacion.idJornada = primerElemento.idJornada;

        let respuesta2 = await this.adminService.CrearCapacitacion(this.capacitacion)
        try {
          const resp = respuesta2 as {mensaje?: string}
          if(resp.mensaje !== undefined){
            const mensaje = resp.mensaje
            let respuesta3 = await this.adminService.CapacitacionReciente(this.capacitacion)
            if(Array.isArray(respuesta3) && respuesta3.length > 0){
              const Elemento = respuesta3[0];
              if(Elemento.hasOwnProperty('idCapacitacion')){
                this.agenda.idCapacitacion = Elemento.idCapacitacion
                let respuesta4 = await this.adminService.Agendar(this.agenda)
                try {
                  const resp4 = respuesta4 as {mensaje?: string}
                  if(resp.mensaje !== undefined){
                    const mensaje2 = resp4.mensaje
                    alert(mensaje +"||" + mensaje2)
                  } else {
                    console.log('Error al registrar la fecha y hora \n'+ resp4)
                  }
                } catch (error) {
                  console.log(error)
                  alert('error al registrar la hora y fecha')
                }
              } 
            }
            this.vaciar()
          } else {
            console.log(respuesta2)
            alert('error al crear la capacitacion')
          }
        } catch (error) {
          console.log(error)
          alert('error al registrar la nueva jornada')
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

  async mostrarCapacitacion(capacitacion: any){
    const modal = await this.modalCtrl.create({
      component: CapacitacionInfoPage,
      cssClass: 'custom-modal',
      componentProps: {
        idCapacitacion: capacitacion.idCapacitacion,
        nomCapacitacion: capacitacion.nomCapacitacion,
        descripcion: capacitacion.descripcion,
        presentador: capacitacion.presentador,
        poster: capacitacion.poster,
        zoomLink: capacitacion.zoomLink,
        fbLink: capacitacion.fbLink,

      }
    });
    await modal.present();
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

  anio = ""

  async getPorAnio(anio: any){
    this.jornadas = await this.adminService.JornadasPorAnio(anio)
  }

  async getCapacitacionesPorJornada(idJornada: any){
    this.capacitaciones = await this.adminService.CapacitacionesPorJornada(idJornada)
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

  // Tercera Pestaña

  Fechas: any[] = []
  horaYFecha: any = {
    fecha: "",
    hora: ""
  }
  a = 0

  AgregarFecha(fecha: any, hora: any){
    this.horaYFecha.fecha = fecha.split('T')[0]
    if(this.a == 0){
      this.horaYFecha.hora = hora.split('T')[1]
      this.a++
    } else {
      this.horaYFecha.hora = hora
    }

    const nuevo = {
      fecha: this.horaYFecha.fecha,
      hora: this.horaYFecha.hora
    }
 
    if (!this.Fechas.includes(nuevo)) {
      // Evitar agregar fechas duplicadas si es necesario
      this.Fechas.push(nuevo);
      console.log(this.Fechas[0].fecha)
    }
    
  }

}
