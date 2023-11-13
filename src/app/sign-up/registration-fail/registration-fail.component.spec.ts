import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFailComponent } from './registration-fail.component';

describe('RegistrationFailComponent', () => {
  let component: RegistrationFailComponent;
  let fixture: ComponentFixture<RegistrationFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationFailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
