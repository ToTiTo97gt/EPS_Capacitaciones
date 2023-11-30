import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdminService{

    public idG: any;
    url:string="http://localhost:3000/"

    jsonData: any[] = []

    constructor(private httpClient: HttpClient) {}

    Registrar(nuevoUser: any){
        const ruta = this.url+"Admin/RegistrarAdmin"
        const data = nuevoUser
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetAdminUser(email:string, passw:string){
        const ruta = this.url+"Admin/GetAdminUser"
        const data = {email, passw}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetAdminPermiso(idAdmin:string){
        const ruta = this.url+"Admin/GetAdminPermisos"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetAdminLista(id:string){
        const ruta = this.url+"Admin/GetAdminLista"
        const data = {id}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetPermisos(){
        const ruta = this.url+"Admin/permisos"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetAdPermisos(idAdmin: any){
        const ruta = this.url+"Admin/permisosAdmin"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Revocar(idAdmin: any, idPermiso: any){
        const ruta = this.url+"Admin/revocar"
        const data = {idAdmin, idPermiso}
        return this.httpClient.post(ruta, data).toPromise()
    }

    EliminarAdmin(idAdmin: any){
        const ruta = this.url+"Admin/EliminarAdmin"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise()
    }

    AsignarPermiso(idAdmin: any, idPermiso: any){
        const ruta = this.url+"Admin/AsignarPermiso"
        const data = {idAdmin, idPermiso}
        return this.httpClient.post(ruta,data).toPromise()
    }

    //Servicios para la pestaña Crear 

    CrearJornada(jornada: any){
        const ruta = this.url+"Admin/JornadaNueva"
        const data = {jornada}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetJornadas(){
        const ruta = this.url+"Admin/Jornadas"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    JornadasPorAnio(anio: any){
        const ruta = this.url+"Admin/JornadasAnio"
        const data = {anio}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetJornadaEspecifica(agenda: any){
        const ruta = this.url+"Admin/JornadaEspecifica"
        const data = {agenda}
        return this.httpClient.post(ruta, data).toPromise()
    }

    modificarJornada(jornada: any){
        const ruta = this.url+"Admin/modificarJornada"
        const data = {jornada}
        return this.httpClient.post(ruta, data).toPromise() 
    }

    eliminarJornada(idJornada: any){
        const ruta = this.url+"Admin/eliminarJornada"
        const data = {idJornada}
        return this.httpClient.post(ruta, data).toPromise() 
    }

    CrearCapacitacion(capacitacion: any, base64:string){
        const ruta = this.url+"Admin/CrearCapacitacion"
        const data = {capacitacion, base64}
        return this.httpClient.post(ruta, data).toPromise()
    }

    modificarCapacitacion(capacitacion: any, base64:string, oldPoster: any){
        const ruta = this.url+"Admin/modificarCapacitacion"
        const data = {capacitacion, base64, oldPoster}
        return this.httpClient.post(ruta, data).toPromise()
    }

    CapacitacionesPorJornada(idJornada: any, idCategoria: any){
        const ruta = this.url+"Admin/CapacitacionesXJornada"
        const data = {idJornada, idCategoria}
        return this.httpClient.post(ruta, data).toPromise()
    }

    CapacitacionReciente(capacitacion: any){
        const ruta = this.url+"Admin/CapacitacionReciente"
        const data = {capacitacion}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Agendar(agenda: any){
        const ruta = this.url+"Admin/Agendar"
        const data = {agenda}
        return this.httpClient.post(ruta, data).toPromise()
    }

    modificarAgenda(agenda:any, idCapacitacion:any, jornada: any){
        const ruta = this.url+"Admin/modificarAgenda"
        const data = {agenda, idCapacitacion, jornada}
        return this.httpClient.post(ruta, data).toPromise()
    }

    getAgenda(idCapacitacion: any){
        const ruta = this.url+"Admin/getAgenda"
        const data = {idCapacitacion}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Capacitaciones(idCategoria: any){
        const ruta = this.url+"Admin/Capacitaciones"
        const data = {idCategoria}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Inscripciones(idCapacitacion: any, datosExtra?: any){
        const ruta = this.url+"Admin/GetInscripciones"
        const data = {idCapacitacion, datosExtra}
        return this.httpClient.post(ruta, data).toPromise()
    }

    MarcarAsistencias(idCapacitacion:any, datos:any){
        const ruta = this.url+"Admin/Asistencias"
        const data = {idCapacitacion, datos}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Actualizar0(){
        const ruta = this.url+"Admin/Actualizar0"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Actualizar1(){
        const ruta = this.url+"Admin/Actualizar1"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    enviarCsv(datos: any){
        const ruta = this.url+"CSV"
        return this.httpClient.post(ruta, datos).toPromise()
    }
}