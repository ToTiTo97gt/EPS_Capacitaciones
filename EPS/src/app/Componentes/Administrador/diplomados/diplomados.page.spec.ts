import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiplomadosPage } from './diplomados.page';

describe('DiplomadosPage', () => {
  let component: DiplomadosPage;
  let fixture: ComponentFixture<DiplomadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DiplomadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
