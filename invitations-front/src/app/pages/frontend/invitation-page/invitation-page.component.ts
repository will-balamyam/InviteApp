import { CommonModule } from '@angular/common';
import {AfterViewInit, COMPILER_OPTIONS, Component, DestroyRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ApiInvitationsService} from '../../../shared/services/api-invitations.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FamilyAccessModel, FamilyModel, InvitationModel} from '../../../shared/models/invitation-model';


@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './invitation-page.component.html',
  styleUrl: './invitation-page.component.scss'
})
export class InvitationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  familyName: string = '';
  familyId: string = '';
  confirmed: boolean = false;
  isSubmitting: boolean = false;

  // Datos de la boda
  coupleNames = 'Ana & Luis';
  weddingDate = new Date('2025-12-13T19:00:00-05:00');
  ceremonyTime = '20:00 h';
  receptionTime = '20:00 h';

  // Contador regresivo
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Formulario RSVP
  rsvpForm = {
    name: '',
    attending: '',
    numberOfGuests: '1',
    message: ''
  };
  showSectionConfirmation: boolean = false;
  familyData: FamilyModel | null = null;
  familyAccesses: FamilyAccessModel[] = [];
  invitationData: InvitationModel | null = null;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiInvitationsService,
    private destroyRef: DestroyRef
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.familyId = params.get('familyId') || '';
      this.getDataFamily();
    });
  }

  ngOnInit() {
    // Iniciar contador regresivo
    //this.startCountdown();
  }

  ngAfterViewInit() {
    // Reproducir el video automáticamente cuando la vista se haya inicializado
    if (this.heroVideo && this.heroVideo.nativeElement) {
      this.heroVideo.nativeElement.muted = true; // Ensure the video is muted
      this.heroVideo.nativeElement.play().catch(error => {
        console.error('Error al reproducir el video:', error);
      });
    }
  }

  getDataFamily() {
    this.apiService.getFamilyByCode(this.familyId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      if (response && response.code == 200) {
        const eventTime = response.data.invitation?.eventPartyTime
            ? response.data.invitation.eventPartyTime.split(':').slice(0, 2).join(':') + ' hrs' // Toma solo horas y minutos
            : '';
        this.receptionTime = eventTime;
        //this.weddingDate = new Date(response.data.invitation?.eventDate || this.weddingDate);
        this.invitationData = response.data.invitation || null;
        this.familyData = response.data;
        this.showSectionConfirmation = response.data.familyAccesses?.some(fa => !fa.confirmed) || false;
        this.familyAccesses = response.data.familyAccesses?.filter(item => !item.confirmed) || [];
        console.log(this.familyAccesses);
        this.startCountdown();
      }
    });
  }

  startCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      const weddingTime = this.weddingDate.getTime();
      const distance = weddingTime - now;

      if (distance > 0) {
        this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  confirmAttendance() {
    this.isSubmitting = true;
    for (let access of this.familyAccesses) {
      this.apiService.updateFamilyAccess(access.id!, access).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
        this.isSubmitting = false;
        if (response && response.code == 200) {
          this.getDataFamily();
        }
      });
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
