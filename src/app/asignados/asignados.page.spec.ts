import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignadosPage } from './asignados.page';

describe('AsignadosPage', () => {
  let component: AsignadosPage;
  let fixture: ComponentFixture<AsignadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsignadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
