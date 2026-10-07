import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ApiInvitationsService } from '../../../shared/services/api-invitations.service';
import { AudioService } from '../../../shared/services/audio.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FamilyAccessModel, FamilyModel, InvitationModel } from '../../../shared/models/invitation-model';

@Component({
  selector: 'app-invitation-bautizo-v2-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './invitation-bautizo-v2-page.component.html',
  styleUrl: './invitation-bautizo-v2-page.component.scss'
})
export class InvitationBautizoV2PageComponent implements OnInit, AfterViewInit {
  @ViewChild('envelopeContainer') envelopeContainer!: ElementRef;
  @ViewChild('backgroundAudio') backgroundAudio!: ElementRef<HTMLAudioElement>;

  familyName: string = '';
  familyId: string = '';
  confirmed: boolean = false;
  isSubmitting: boolean = false;
  isEnvelopeOpen: boolean = false;
  isAudioPlaying: boolean = false;
  showAudioControls: boolean = true;

  // Datos del bautizo
  childName = 'Sofía';
  baptismDate = new Date('2026-03-07T13:00:00-05:00'); // 14/03/2026 04:43 am según las imágenes
  ceremonyTime = '13:00 hrs';
  receptionTime = '16:00 hrs';

  // Variables adicionales para los datos dinámicos
  ceremonyLocation = 'Ciudad de México, México';
  ceremonyVenue = 'Parroquia de Ejemplo';
  ceremonyAddress = 'Av. Principal 123, Centro, 06000 Ciudad de México, CDMX';
  ceremonyMapLink = 'https://maps.google.com/?q=Z%C3%B3calo+CDMX'; 

  // Frases de los padres
  motherQuote = '"Con amor y fe, celebramos el primer paso espiritual de nuestra pequeña Sofía. ¡Acompáñanos en este día tan especial!"';
  fatherQuote = '"Con orgullo y alegría, invitamos a nuestros seres queridos a compartir el bautizo de nuestra hija Sofía, un día lleno de bendiciones y amor."';

  // Contador regresivo
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Variables para el formulario
  showSectionConfirmation: boolean = false;
  showMessageConfirmation: boolean = false;
  familyData: FamilyModel | null = null;
  familyAccesses: FamilyAccessModel[] = [];
  invitationData: InvitationModel | null = null;

  parents = [
    {
      name: 'Ana Torres y Luis Pérez',
      role: 'Padrinos',
      photo: 'assets/images/padrinos.JPG'
    },
    {
      name: '',
      role: '',
      photo: 'assets/images/segundo.jpg'
    }
  ];

  // Datos de los padrinos
  godparents = [
    {
      name: '',
      role: '',
      photo: 'assets/images/tercero.jpg'
    }
  ];

  // Variables para fotos arrastrables
  photoTransforms = {
    photo1: 'translate(0px, 0px) rotate(-5deg) scale(1)',
    photo2: 'translate(-20px, 15px) rotate(3deg) scale(0.95)',
    photo3: 'translate(10px, -10px) rotate(-2deg) scale(0.9)',
    photo4: 'translate(5px, -10px) rotate(-4deg) scale(0.9)',
    photo5: 'translate(0px, -5px) rotate(-6deg) scale(0.9)'
  };

  isDragging = false;
  dragStartX = 0;
  dragStartY = 0;
  currentPhoto = '';
  initialTransform = '';

  // Posiciones iniciales de las fotos - ajustadas para mejor centrado
  photoInitialPositions = {
    photo1: { x: 0, y: 0, rotation: -5, scale: 1, zIndex: 5 },
    photo2: { x: -20, y: 15, rotation: 3, scale: 0.95, zIndex: 4 },
    photo3: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 3 },
    photo4: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 2 },
    photo5: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 1 }
  };

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

  getDataFamily(isFromConfirm: boolean = false) {
    this.apiService.getFamilyByCode(this.familyId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      if (response && response.code == 200) {
        const eventTime = response.data.invitation?.eventPartyTime
          ? response.data.invitation.eventPartyTime.split(':').slice(0, 2).join(':') + ' hrs'
          : '';
        //this.receptionTime = eventTime;

        this.invitationData = response.data.invitation || null;
        this.familyData = response.data;
        this.showSectionConfirmation = response.data.familyAccesses?.some(fa => fa.confirmed == null) || false;
        this.familyAccesses = response.data.familyAccesses?.filter(item => item.confirmed == null) || [];
        console.log(this.familyAccesses);
        console.log('showSectionConfirmation:', this.showSectionConfirmation);
        if (!this.showSectionConfirmation) {
          this.showMessageConfirmation = response.data.familyAccesses?.some(fa => fa.confirmed == true) || false;
        }
        if (isFromConfirm && !this.showSectionConfirmation) {
          // Si la actualización viene de la confirmación y ya no hay accesos pendientes, mostrar una alerta o mensaje de agradecimiento
          this.apiService.sendConfirmationWhats(this.familyId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {

          });
        }
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
        this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    }, 1000);
  }

  openEnvelope() {
    this.isEnvelopeOpen = true;
    setTimeout(() => {
      this.scrollToContent();
    }, 800);
  }

  scrollToContent() {
    const contentElement = document.getElementById('main-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  confirmAttendance() {
    this.isSubmitting = true;
    for (let access of this.familyAccesses) {
      this.apiService.updateFamilyAccess(access.id!, access).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
        this.isSubmitting = false;
        if (response && response.code == 200) {
          this.getDataFamily(true);
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

  // Métodos para compartir en redes sociales
  shareOnWhatsApp() {
    const message = encodeURIComponent(`¡Estás invitado al bautizo de ${this.childName}! 📿✨ Fecha: 14 de marzo 2026, ${this.ceremonyTime}. ${window.location.href}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }

  shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  copyInvitationLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Podrías agregar aquí una notificación de éxito
      console.log('Enlace copiado al portapapeles');
    });
  }

  // Métodos para arrastrar fotos
  startDrag(event: any, photoId: string) {
    event.preventDefault();
    this.isDragging = true;
    this.currentPhoto = photoId;

    // Obtener coordenadas del evento (mouse o touch)
    const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    const clientY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;

    this.dragStartX = clientX;
    this.dragStartY = clientY;
    this.initialTransform = this.photoTransforms[photoId as keyof typeof this.photoTransforms];

    // Agregar listeners de movimiento y fin de arrastre
    const moveHandler = (e: any) => this.onDrag(e);
    const endHandler = () => this.endDrag(moveHandler, endHandler);

    if (event.type.includes('mouse')) {
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', endHandler);
    } else {
      document.addEventListener('touchmove', moveHandler, { passive: false });
      document.addEventListener('touchend', endHandler);
    }

    // Cambiar z-index de la foto que se está arrastrando
    this.bringToFront(photoId);
  }

  onDrag(event: any) {
    if (!this.isDragging || !this.currentPhoto) return;

    // Obtener coordenadas del evento
    const clientX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    const clientY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;

    const deltaX = clientX - this.dragStartX;
    const deltaY = clientY - this.dragStartY;

    // Obtener posición inicial de la foto
    const initialPos = this.photoInitialPositions[this.currentPhoto as keyof typeof this.photoInitialPositions];

    const newX = initialPos.x + deltaX;
    const newY = initialPos.y + deltaY;

    // Actualizar transform con nueva posición
    this.photoTransforms[this.currentPhoto as keyof typeof this.photoTransforms] =
      `translate(${newX}px, ${newY}px) rotate(${initialPos.rotation}deg) scale(${initialPos.scale})`;
  }

  endDrag(moveHandler: any, endHandler: any) {
    this.isDragging = false;

    // Remover listeners
    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('mouseup', endHandler);
    document.removeEventListener('touchmove', moveHandler);
    document.removeEventListener('touchend', endHandler);

    // Actualizar posición inicial con la nueva posición
    if (this.currentPhoto) {
      const transform = this.photoTransforms[this.currentPhoto as keyof typeof this.photoTransforms];
      const matches = transform.match(/translate\(([^)]+)\)/);
      if (matches) {
        const coords = matches[1].split(',');
        const x = parseInt(coords[0].replace('px', '').trim());
        const y = parseInt(coords[1].replace('px', '').trim());

        (this.photoInitialPositions as any)[this.currentPhoto].x = x;
        (this.photoInitialPositions as any)[this.currentPhoto].y = y;
      }
    }

    this.currentPhoto = '';
  }

  bringToFront(photoId: string) {
    // Cambiar z-index para traer la foto al frente
    const photoElement = document.querySelector(`.${photoId}`) as HTMLElement;
    if (photoElement) {
      photoElement.style.zIndex = '10';
      // Resetear z-index de otras fotos después de un momento
      setTimeout(() => {
        Object.keys(this.photoInitialPositions).forEach((id, index) => {
          const element = document.querySelector(`.${id}`) as HTMLElement;
          if (element) {
            element.style.zIndex = (3 - index).toString();
          }
        });
      }, 100);
    }
  }

  resetPhotos() {
    // Restablecer posiciones iniciales
    this.photoTransforms = {
      photo1: 'translate(0px, 0px) rotate(-5deg) scale(1)',
      photo2: 'translate(-20px, 15px) rotate(3deg) scale(0.95)',
      photo3: 'translate(10px, -10px) rotate(-2deg) scale(0.9)',
      photo4: 'translate(10px, -10px) rotate(-2deg) scale(0.9)',
      photo5: 'translate(10px, -10px) rotate(-2deg) scale(0.9)'
    };

    this.photoInitialPositions = {
      photo1: { x: 0, y: 0, rotation: -5, scale: 1, zIndex: 5 },
      photo2: { x: -20, y: 15, rotation: 3, scale: 0.95, zIndex: 4 },
      photo3: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 3 },
      photo4: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 2 },
      photo5: { x: 10, y: -10, rotation: -2, scale: 0.9, zIndex: 1 }
    };
  }
}
