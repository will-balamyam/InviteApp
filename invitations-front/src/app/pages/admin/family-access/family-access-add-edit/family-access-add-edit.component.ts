import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiInvitationsService} from '../../../../shared/services/api-invitations.service';
import {ToastrService} from 'ngx-toastr';
import {FamilyModel} from '../../../../shared/models/invitation-model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-family-access-add-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './family-access-add-edit.component.html',
  styleUrl: './family-access-add-edit.component.scss'
})
export class FamilyAccessAddEditComponent {
  familyAccessForm: FormGroup;
  isEditMode: boolean = false;
  accessId: number | null = null;
  families: FamilyModel[] = []; // Replace 'any' with the actual FamilyModel if available
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiInvitationsService,
    private toastr: ToastrService
  ) {
    this.loadFamilies();
    this.familyAccessForm = this.fb.group({
      memberName: ['', Validators.required],
      confirmed: [false, Validators.required],
      family: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.accessId = +id;
        this.loadAccessData(this.accessId);
      }
    });
  }

  loadFamilies(): void {
    this.apiService.getFamilies().subscribe({
      next: (response) => {
        this.families = response.data;
      },
      error: (err) => {
        this.toastr.error('Error fetching families', 'Error');
        console.error(err);
      }
    });
  }

  loadAccessData(id: number): void {
    this.apiService.getFamilyAccessById(id).subscribe({
      next: (data) => {
        this.familyAccessForm.patchValue(data.data);
        this.familyAccessForm.get('family')?.setValue(data.data.family?.id);
      },
      error: (err) => {
        this.toastr.error('Error loading data', 'Error');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.familyAccessForm.invalid) {
      this.toastr.error('Please fill in all required fields', 'Error');
      return;
    }

    const formData = this.familyAccessForm.value;

    if (this.isEditMode && this.accessId) {
      this.apiService.updateFamilyAccess(this.accessId, formData).subscribe({
        next: () => {
          this.toastr.success('Record updated successfully', 'Success');
          this.router.navigate(['/admin/access']);
        },
        error: (err) => {
          this.toastr.error('Error updating record', 'Error');
          console.error(err);
        }
      });
    } else {
      this.apiService.createFamilyAccess(formData).subscribe({
        next: () => {
          this.toastr.success('Record created successfully', 'Success');
          this.router.navigate(['/admin/access']);
        },
        error: (err) => {
          this.toastr.error('Error creating record', 'Error');
          console.error(err);
        }
      });
    }
  }
}
