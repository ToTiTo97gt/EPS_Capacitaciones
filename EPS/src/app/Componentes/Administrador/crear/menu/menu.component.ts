import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrearInfoPage } from '../../modals/crear-info/crear-info.page';

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
    if(this.validarJornada(this.jornada)){
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
    this.jornadas = await this.adminService.GetJornadaActual()
  }

  vaciar(){
    this.jornada.ciclo = ""
    this.jornada.FechaInicio = ""
    this.jornada.FechaFinal = ""
  }

  convertir(fecha: string){
    var objc = new Date(fecha)
    return objc.toISOString().split('T')[0]
  }

  validarJornada(jornada: any) {
    for (const key in jornada) {
      if (jornada.hasOwnProperty(key) && jornada[key] === "") {
        return false; // Al menos un campo está vacío
      }
    }
    return true;
  }

}
