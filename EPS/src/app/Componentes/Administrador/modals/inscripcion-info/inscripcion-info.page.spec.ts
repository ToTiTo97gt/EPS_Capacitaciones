import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionInfoPage } from './inscripcion-info.page';

describe('InscripcionInfoPage', () => {
  let component: InscripcionInfoPage;
  let fixture: ComponentFixture<InscripcionInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscripcionInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
