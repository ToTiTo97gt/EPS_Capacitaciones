import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiplomasPage } from './diplomas.page';

describe('DiplomasPage', () => {
  let component: DiplomasPage;
  let fixture: ComponentFixture<DiplomasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DiplomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
