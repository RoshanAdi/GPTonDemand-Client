import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialsIconComponent } from './initials-icon.component';

describe('InitialsIconComponent', () => {
  let component: InitialsIconComponent;
  let fixture: ComponentFixture<InitialsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialsIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
