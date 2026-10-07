import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsAddEditComponent } from './invitations-add-edit.component';

describe('InvitationsAddEditComponent', () => {
  let component: InvitationsAddEditComponent;
  let fixture: ComponentFixture<InvitationsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
