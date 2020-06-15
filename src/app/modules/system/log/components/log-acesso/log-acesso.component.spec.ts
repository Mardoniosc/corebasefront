import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAcessoComponent } from './log-acesso.component';

describe('LogAcessoComponent', () => {
  let component: LogAcessoComponent;
  let fixture: ComponentFixture<LogAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
