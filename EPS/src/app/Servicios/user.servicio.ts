import { Injectable } from "@angular/core";
import axios from "axios";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    public idG: any
    public idTipo: any
    public datosUser: any
    url:string="http://54.221.141.130:3020/"//ip:3020
    constructor(private httpClient: HttpService) {}

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

    RecuperarContra(datoContra: any){
        const ruta = this.url+"User/RecuperarContra"
        const data = {datoContra}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetUsuario(dato1: any, passw: any){
        const ruta = this.url+"User/GetUsuario"
        const data = {dato1, passw}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetNuevosDatos(idUser: any){
        const ruta = this.url+"User/GetNuevosDatos"
        const data = {idUser}
        return this.httpClient.post(ruta, data).toPromise()
    }

    ModificarUsuario(User: any){
        const ruta = this.url+"User/ModificarUsuario"
        const data = {User}
        return this.httpClient.post(ruta, data).toPromise()
    }

    CambiarPass(newPass: any, idUser: any, correo:any){
        const ruta = this.url+"User/CambiarPass"
        const data = {newPass, idUser, correo}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GetCapacitaciones(idUser: any, Inscrito: any){
        const ruta = this.url+"User/GetCapacitaciones"
        const data = {idUser, Inscrito}
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

    Diplomas(idUser: any, idJornada: any){
        const ruta = this.url+"User/Diplomas"
        const data = {idUser, idJornada}
        return this.httpClient.post(ruta, data).toPromise()
    }

    Diplomados(idUser: any, idJornada: any){
         const ruta = this.url+"User/Diplomados"
         const data = {idUser, idJornada}
         return this.httpClient.post(ruta, data).toPromise()
    }

    GenerarPDF(datos: any, capacitacion: any, fecha:any){
        const ruta = this.url+"User/GenerarPDF"
        const data = {datos, capacitacion, fecha}
        return this.httpClient.post(ruta, data).toPromise()
    }

    GenerarDiplomadoPDF(datos: any, capacitacion: any, fechas: any, diploma:any){
        const ruta = this.url+"User/GenerarDiplomadoPDF"
        const data = {datos, capacitacion, fechas, diploma}
        return this.httpClient.post(ruta, data).toPromise()
    }

    EnviarAyuda(idUsuario: any, Asunto: any, Descripcion: any){
        const ruta = this.url+"User/EnviarAyuda"
        const data = { idUsuario, Asunto, Descripcion }
        return this.httpClient.post(ruta, data).toPromise()
    }

}