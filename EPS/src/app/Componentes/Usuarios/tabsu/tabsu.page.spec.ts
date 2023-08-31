import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsuPage } from './tabsu.page';

describe('TabsuPage', () => {
  let component: TabsuPage;
  let fixture: ComponentFixture<TabsuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabsuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
