import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionesPage } from './inscripciones.page';

describe('InscripcionesPage', () => {
  let component: InscripcionesPage;
  let fixture: ComponentFixture<InscripcionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscripcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
