import { Component } from '@angular/core';
import {FamilyModel} from '../../../../shared/models/invitation-model';
import {ApiInvitationsService} from '../../../../shared/services/api-invitations.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-families-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './families-list.component.html',
  styleUrl: './families-list.component.scss'
})
export class FamiliesListComponent {
  families: FamilyModel[] = [];

  constructor(
    private apiService: ApiInvitationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFamilies();
  }

  getFamilies(): void {
    this.apiService.getFamilies().subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.families = response.data;
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Error fetching families', 'Error');
        console.error(err);
      }
    });
  }

  editFamily(id: number|undefined): void {
    // Navigate to the edit page (implement navigation logic)
    console.log('Edit family with ID:', id);
  }

  sendInvitationWhats(id: number|undefined): void {
    this.apiService.sendInvitationWhats(id).subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.toastr.success('Invitation sent successfully', 'Success');
        } else {
          this.toastr.error(response.message, 'Error');
        }
      },
      error: (err) => {
        this.toastr.error('Error sending invitation', 'Error');
        console.error(err);
      }
    });
  }

  deleteFamily(id: number|undefined): void {
    if (confirm('Are you sure you want to delete this family?')) {
      this.apiService.deleteFamily(id).subscribe({
        next: () => {
          this.toastr.success('Family deleted successfully', 'Success');
          this.getFamilies();
        },
        error: (err) => {
          this.toastr.error('Error deleting family', 'Error');
          console.error(err);
        }
      });
    }
  }
}
