import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ApiInvitationsService } from '../../../shared/services/api-invitations.service';
import { AudioService } from '../../../shared/services/audio.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FamilyAccessModel, FamilyModel, InvitationModel } from '../../../shared/models/invitation-model';

@Component({
  selector: 'app-invitation-bautizo-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './invitation-bautizo-page.component.html',
  styleUrl: './invitation-bautizo-page.component.scss'
})
export class InvitationBautizoPageComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundAudio') backgroundAudio!: ElementRef<HTMLAudioElement>;

  familyName: string = '';
  familyId: string = '';
  confirmed: boolean = false;
  isSubmitting: boolean = false;
  isAudioPlaying: boolean = false;
  showAudioControls: boolean = true;

  // Datos del bautizo
  childName = 'Sofía';
  baptismDate = new Date('2026-03-07T12:00:00-05:00');
  ceremonyTime = '12:00 hrs';
  receptionTime = '14:00 hrs';

  // Contador regresivo
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Variables para el formulario
  showSectionConfirmation: boolean = false;
  familyData: FamilyModel | null = null;
  familyAccesses: FamilyAccessModel[] = [];
  invitationData: InvitationModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiInvitationsService,
    private audioService: AudioService,
    private destroyRef: DestroyRef
  ) {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.familyId = params.get('familyId') || '';
      this.getDataFamily();
    });
  }

  ngOnInit() {
    this.startCountdown();
    // Suscribirse al estado del audio
    this.audioService.isPlaying$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isPlaying => {
      this.isAudioPlaying = isPlaying;
    });
  }

  ngAfterViewInit() {
    // Inicializar el servicio de audio después de que la vista esté lista
    if (this.backgroundAudio?.nativeElement) {
      this.audioService.initAudio(this.backgroundAudio.nativeElement);

      // Intentar reproducir música después de un pequeño delay
      setTimeout(() => {
        this.tryPlayBackgroundMusic();
      }, 1000);
    }
  }

  getDataFamily() {
    this.apiService.getFamilyByCode(this.familyId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      if (response && response.code == 200) {
        const eventTime = response.data.invitation?.eventPartyTime
          ? response.data.invitation.eventPartyTime.split(':').slice(0, 2).join(':') + ' hrs'
          : '';
        this.receptionTime = eventTime;

        this.invitationData = response.data.invitation || null;
        this.familyData = response.data;
        this.showSectionConfirmation = response.data.familyAccesses?.some(fa => !fa.confirmed) || false;
        this.familyAccesses = response.data.familyAccesses?.filter(item => !item.confirmed) || [];
        console.log(this.familyAccesses);
      }
    });
  }

  startCountdown() {
    setInterval(() => {
      const now = new Date().getTime();
      const baptismTime = this.baptismDate.getTime();
      const distance = baptismTime - now;

      if (distance > 0) {
        this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      } else {
        // El evento ya pasó
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
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

  async tryPlayBackgroundMusic() {
    await this.audioService.tryPlayAudio();
  }

  async toggleAudio() {
    await this.audioService.toggleAudio();
  }

  onUserInteraction() {
    // Esta función se llamará en el primer click/tap del usuario
    if (!this.audioService.getIsPlaying()) {
      this.tryPlayBackgroundMusic();
    }
  }
}
