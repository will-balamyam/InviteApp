import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioElement: HTMLAudioElement | null = null;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  public isPlaying$ = this.isPlayingSubject.asObservable();

  constructor() {}

  initAudio(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;

    // Configurar eventos de audio
    if (this.audioElement) {
      this.audioElement.addEventListener('play', () => {
        this.isPlayingSubject.next(true);
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlayingSubject.next(false);
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlayingSubject.next(false);
      });

      this.audioElement.volume = 0.3; // Volumen por defecto al 30%
    }
  }

  async tryPlayAudio(): Promise<boolean> {
    if (!this.audioElement) return false;

    try {
      await this.audioElement.play();
      return true;
    } catch (error) {
      console.log('No se pudo reproducir automáticamente, se requiere interacción del usuario:', error);
      return false;
    }
  }

  pauseAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  async toggleAudio(): Promise<boolean> {
    if (!this.audioElement) return false;

    if (this.isPlayingSubject.value) {
      this.pauseAudio();
      return false;
    } else {
      return await this.tryPlayAudio();
    }
  }

  setVolume(volume: number) {
    if (this.audioElement) {
      this.audioElement.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getIsPlaying(): boolean {
    return this.isPlayingSubject.value;
  }
}
