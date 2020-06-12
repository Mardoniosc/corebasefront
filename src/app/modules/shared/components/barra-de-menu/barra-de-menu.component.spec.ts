import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeMenuComponent } from './barra-de-menu.component';

describe('BarraDeMenuComponent', () => {
  let component: BarraDeMenuComponent;
  let fixture: ComponentFixture<BarraDeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraDeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraDeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
