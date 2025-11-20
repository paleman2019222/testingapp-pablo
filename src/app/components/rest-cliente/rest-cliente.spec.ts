import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestCliente } from './rest-cliente';

describe('RestCliente', () => {
  let component: RestCliente;
  let fixture: ComponentFixture<RestCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
