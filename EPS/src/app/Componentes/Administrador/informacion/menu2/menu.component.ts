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
  constructor() {
    this.menu = "Jornadas"
  }

  ngOnInit() {
    this.menu = this.activatedRoute.snapshot.paramMap.get('id') as string
  }

}
