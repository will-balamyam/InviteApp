import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationBautizoPageComponent } from './invitation-bautizo-page.component';

describe('InvitationBautizoPageComponent', () => {
  let component: InvitationBautizoPageComponent;
  let fixture: ComponentFixture<InvitationBautizoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationBautizoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationBautizoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
