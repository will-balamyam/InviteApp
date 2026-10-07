import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationBautizoV2PageComponent } from './invitation-bautizo-v2-page.component';

describe('InvitationBautizoV2PageComponent', () => {
  let component: InvitationBautizoV2PageComponent;
  let fixture: ComponentFixture<InvitationBautizoV2PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationBautizoV2PageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationBautizoV2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});