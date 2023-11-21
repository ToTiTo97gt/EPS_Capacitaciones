import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    public idG: any
    public idTipo: any
    url:string="http://localhost:3000/"
    constructor(private httpClient: HttpClient) {}

    GetDepartamentos(){
        const ruta = this.url+"User/getDepartamentos"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetMunicipios(idDepartamento: any){
        const ruta = this.url+"User/getMunicipios"
        const data = {idDepartamento}
        return this.httpClient.post(ruta, data).toPromise();
    }

    TiposUsuarios(){
        const ruta = this.url+"User/tiposUsuarios"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise();
    }

    Registrar(nuevoUser: any){
        const ruta = this.url+"User/RegistrarUsuario"
        const data = {nuevoUser}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetUsuario(dato1: any, passw: any){
        const ruta = this.url+"User/GetUsuario"
        const data = {dato1, passw}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetCapacitaciones(idUser: any, Inscrito: any){
        const ruta = this.url+"User/GetCapacitaciones"
        const data = {idUser, Inscrito}
        return this.httpClient.post(ruta, data).toPromise()
    }

    AsignacionAuto(idUser:any){
        const ruta = this.url+"User/AsignacionAuto"
        const data = {idUser}
        return this.httpClient.post(ruta, data).toPromise()
    }

    CalendarioDiplomado(idCapacitacion: any){
        const ruta = this.url+"User/CalendarioDiplomado"
        const data = {idCapacitacion}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Inscripcion(idUser: any, idCapacitacion: any, inscripcion: any){
        const ruta = this.url+"User/Inscripcion"
        const data = {idUser, idCapacitacion, inscripcion}
        return this.httpClient.post(ruta, data).toPromise()
    }

}