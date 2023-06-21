import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SesionPage } from './sesion.page';

describe('SesionPage', () => {
  let component: SesionPage;
  let fixture: ComponentFixture<SesionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
