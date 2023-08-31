import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AdminService{

    public idG: any;
    url:string="http://localhost:3000/"
    constructor(private httpClient: HttpClient) {}

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

    GetAdminLista(){
        const ruta = this.url+"Inicio/GetAdminLista"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise();
    }

    GetPermisos(){
        const ruta = this.url+"Inicio/permisos"
        const data = {}
        return this.httpClient.post(ruta, data).toPromise()
    }
}