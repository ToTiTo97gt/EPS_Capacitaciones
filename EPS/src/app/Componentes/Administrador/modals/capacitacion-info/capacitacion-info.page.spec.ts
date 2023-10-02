import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitacionInfoPage } from './capacitacion-info.page';

describe('CapacitacionInfoPage', () => {
  let component: CapacitacionInfoPage;
  let fixture: ComponentFixture<CapacitacionInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapacitacionInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
