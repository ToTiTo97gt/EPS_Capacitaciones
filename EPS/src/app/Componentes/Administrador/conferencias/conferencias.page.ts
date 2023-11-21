import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Servicios/admin.servicio';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.page.html',
  styleUrls: ['./conferencias.page.scss'],
})
export class ConferenciasPage implements OnInit {

  @ViewChild('fileInput',{static:false}) fileInput!: ElementRef;  
  
  selectedFile:File | null = null;
  constructor(private adminService:AdminService) { }

  ngOnInit() {
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  cargarArchivo(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.adminService.enviarCsv(formData)
    }
  }

}
