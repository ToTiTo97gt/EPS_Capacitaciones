import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearInfoPage } from './crear-info.page';

describe('CrearInfoPage', () => {
  let component: CrearInfoPage;
  let fixture: ComponentFixture<CrearInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
