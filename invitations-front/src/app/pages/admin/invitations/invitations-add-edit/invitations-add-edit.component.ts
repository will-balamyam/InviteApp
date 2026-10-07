import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiInvitationsService } from '../../../../shared/services/api-invitations.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invitations-add-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './invitations-add-edit.component.html',
  styleUrl: './invitations-add-edit.component.scss'
})
export class InvitationsAddEditComponent {
  eventForm: FormGroup;
  isEditMode: boolean = false;
  eventId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiInvitationsService,
    private toastr: ToastrService
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventCode: ['', Validators.required],
      eventHashtag: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDataParents: ['', Validators.required],
      eventDataSponsors: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventPartyTime: ['', Validators.required],
      eventLocationName: ['', Validators.required],
      eventLocationDescription: ['', Validators.required],
      eventLocationLink: ['', Validators.required],
      eventLocationPartyName: ['', Validators.required],
      eventLocationPartyDescription: ['', Validators.required],
      eventLocationPartyLink: ['', Validators.required],
      giftTableNumber: ['', Validators.required],
      giftTableLink: ['', Validators.required],
      eventDressCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.eventId = +id;
        this.loadEventData(this.eventId);
      }
    });
  }

  loadEventData(id: number): void {
    this.apiService.getInvitationById(id).subscribe({
      next: (data) => {
        this.eventForm.patchValue(data.data);
      },
      error: (err) => {
        this.toastr.error('Error loading event data', 'Error');
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) {
      this.toastr.error('Please fill in all required fields', 'Error');
      return;
    }

    const formData = this.eventForm.value;

    if (this.isEditMode && this.eventId) {
      this.apiService.updateInvitation(this.eventId, formData).subscribe({
        next: () => {
          this.toastr.success('Event updated successfully', 'Success');
          this.router.navigate(['/admin/invitations']);
        },
        error: (err) => {
          this.toastr.error('Error updating event', 'Error');
          console.error(err);
        }
      });
    } else {
      this.apiService.createInvitation(formData).subscribe({
        next: () => {
          this.toastr.success('Event created successfully', 'Success');
          this.router.navigate(['/admin/invitations']);
        },
        error: (err) => {
          this.toastr.error('Error creating event', 'Error');
          console.error(err);
        }
      });
    }
  }
}
