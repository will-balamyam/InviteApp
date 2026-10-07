import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAccessAddEditComponent } from './family-access-add-edit.component';

describe('FamilyAccessAddEditComponent', () => {
  let component: FamilyAccessAddEditComponent;
  let fixture: ComponentFixture<FamilyAccessAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyAccessAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyAccessAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
