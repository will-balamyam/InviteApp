import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccessListComponent } from './family-access-list.component';

describe('FamilyAccessListComponent', () => {
  let component: FamilyAccessListComponent;
  let fixture: ComponentFixture<FamilyAccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyAccessListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
