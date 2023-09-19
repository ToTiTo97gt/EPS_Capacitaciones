import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AdminService{

    public idG: any;
    url:string="http://localhost:3000/"
    constructor(private httpClient: HttpClient) {}

    Registrar(nuevoUser: any){
        const ruta = this.url+"Inicio/RegistrarAdmin"
        const data = nuevoUser
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetAdminUser(email:string, passw:string){
        const ruta = this.url+"Inicio/GetAdminUser"
        const data = {email, passw}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetAdminPermiso(idAdmin:string){
        const ruta = this.url+"Inicio/GetAdminPermisos"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetAdminLista(id:string){
        const ruta = this.url+"Inicio/GetAdminLista"
        const data = {id}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetPermisos(){
        const ruta = this.url+"Inicio/permisos"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetAdPermisos(idAdmin: any){
        const ruta = this.url+"Inicio/permisosAdmin"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Revocar(idAdmin: any, idPermiso: any){
        const ruta = this.url+"Inicio/revocar"
        const data = {idAdmin, idPermiso}
        return this.httpClient.post(ruta, data).toPromise()
    }

    EliminarAdmin(idAdmin: any){
        const ruta = this.url+"Inicio/EliminarAdmin"
        const data = {idAdmin}
        return this.httpClient.post(ruta, data).toPromise()
    }

    AsignarPermiso(idAdmin: any, idPermiso: any){
        const ruta = this.url+"Inicio/AsignarPermiso"
        const data = {idAdmin, idPermiso}
        return this.httpClient.post(ruta,data).toPromise()
    }

    //Servicios para la pestaña Crear 

    CrearJornada(jornada: any){
        const ruta = this.url+"Inicio/JornadaNueva"
        const data = {jornada}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetJornadaActual(){
        const ruta = this.url+"Inicio/JornadaActual"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Actualizar0(){
        const ruta = this.url+"Inicio/Actualizar0"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Actualizar1(){
        const ruta = this.url+"Inicio/Actualizar1"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }
}