import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesAddEditComponent } from './families-add-edit.component';

describe('FamiliesAddEditComponent', () => {
  let component: FamiliesAddEditComponent;
  let fixture: ComponentFixture<FamiliesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamiliesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamiliesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
