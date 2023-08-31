import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  public menu!: string
  private activatedRoute = inject(ActivatedRoute)
  public selectedDate: string = ""
  public showDatePicker = false
  constructor() {
    this.menu = "Jornadas"
  }

  toggleDatePicker(){
    this.showDatePicker = !this.showDatePicker
  }

  ngOnInit() {
    
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string
  }

}
