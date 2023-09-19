import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/Servicios/admin.servicio';

@Component({
  selector: 'app-crear-info',
  templateUrl: './crear-info.page.html',
  styleUrls: ['./crear-info.page.scss'],
})
export class CrearInfoPage implements OnInit {

  @Input() idJornada: any
  @Input() ciclo: any
  @Input() fechaInico: any
  @Input() fechaFinal: any
  @Input() estado: any
  constructor(private modalCtrl:ModalController, private adminService:AdminService) { }

  ngOnInit() {
  }

}
