import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../Servicios/admin.servicio';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private menuController: MenuController, public route: Router, public parametros:ActivatedRoute,
    private adminService:AdminService) {}
  public nombre: any
  public id:any
  public permis: any
  public boolArray: boolean[] = [false, false, false, false, false, false, false] 
  ngOnInit(){
    this.nombre = this.parametros.snapshot.paramMap.get('nombre')
    this.id = this.parametros.snapshot.paramMap.get('idAdmin')
    this.adminService.idG = this.id
    this.permisos();
  }

  async permisos(){
    this.permis = await this.adminService.GetAdminPermiso(this.id)
    for (let index = 0; index < this.permis.length; index++) {
      const element = this.permis[index];
      if(element.idPermiso == 1){
        const newArr: boolean[] = [true, true, true, true, true, true, true]
        this.boolArray = newArr
        break;
      }
      this.boolArray[element.idPermiso-1] = true
    }
    console.log(this.boolArray)
  }

  onTabChange() {
    this.menuController.enable(true); // Habilita el menú
  }

}
