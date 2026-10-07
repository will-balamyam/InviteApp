import { Component } from '@angular/core';
import {ApiInvitationsService} from '../../../../shared/services/api-invitations.service';
import {ToastrService} from 'ngx-toastr';
import {NgForOf} from '@angular/common';
import {FamilyAccessModel} from '../../../../shared/models/invitation-model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-family-access-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './family-access-list.component.html',
  styleUrl: './family-access-list.component.scss'
})
export class FamilyAccessListComponent {
  familyAccessList: FamilyAccessModel[] = [];

  constructor(
    private apiService: ApiInvitationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFamilyAccessList();
  }

  getFamilyAccessList(): void {
    this.apiService.getFamilyAccess().subscribe({
      next: (response) => {
        this.familyAccessList = response.data;
      },
      error: (err) => {
        this.toastr.error('Error fetching family access list', 'Error');
        console.error(err);
      }
    });
  }

  editAccess(id: number | undefined): void {
    // Navigate to the edit page
    console.log('Edit access with ID:', id);
  }

  deleteAccess(id: number | undefined): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.apiService.deleteFamilyAccess(id).subscribe({
        next: () => {
          this.toastr.success('Record deleted successfully', 'Success');
          this.getFamilyAccessList();
        },
        error: (err) => {
          this.toastr.error('Error deleting record', 'Error');
          console.error(err);
        }
      });
    }
  }
}
