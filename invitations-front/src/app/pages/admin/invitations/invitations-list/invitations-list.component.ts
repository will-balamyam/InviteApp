import {Component, inject, OnInit} from '@angular/core';
import {ApiInvitationsService} from '../../../../shared/services/api-invitations.service';
import {InvitationModel} from '../../../../shared/models/invitation-model';
import {take} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invitations-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './invitations-list.component.html',
  styleUrl: './invitations-list.component.scss'
})
export class InvitationsListComponent implements  OnInit {
  private toastService = inject(ToastrService);
  private apiService = inject(ApiInvitationsService);
  public listInvitations: InvitationModel[] = [];

  ngOnInit() {
    this.getList();
  }

  getList(): void {
    this.listInvitations = [];
    this.apiService.getInvitations().pipe(take(1)).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.listInvitations = response.data;
        } else {
          this.toastService.error(response.message, 'Error');
        }
      },
      error: (error: any) => {
        this.toastService.error('Error fetching invitations', 'Error');
        console.error('Error fetching invitations:', error);
      },
    });
  }

  confirmDelete(id: number): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Esto no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteInvitation(id);
      }
    });
  }

  deleteInvitation(id: number): void {
    this.apiService.deleteInvitation(id).pipe(take(1)).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.toastService.success('Invitation deleted', 'Success');
          this.getList();
        } else {
          this.toastService.error(response.message, 'Error');
        }
      },
      error: (error: any) => {
        this.toastService.error('Error deleting invitation', 'Error');
        console.error('Error deleting invitation:', error);
      },
    });
  }
}
