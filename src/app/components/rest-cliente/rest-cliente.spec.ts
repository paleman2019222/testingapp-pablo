import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestClienteComponent } from './rest-cliente';

describe('RestCliente', () => {
  let component: RestClienteComponent;
  let fixture: ComponentFixture<RestClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
