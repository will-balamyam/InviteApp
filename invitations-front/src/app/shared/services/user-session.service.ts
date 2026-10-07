import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private sessionSubject = new BehaviorSubject<any>(null); // Observable para la sesión
  constructor(
    private router: Router
  ) {
    const session = this.getSession();
    this.sessionSubject.next(session); // Inicializa el estado con la sesión actual
  }

  setSession(user: any): void {
    localStorage.setItem('userSession', JSON.stringify(user));
    this.sessionSubject.next(user); // Actualiza el observable
  }

  getSession(): any {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  }

  clearSession(): void {
    localStorage.removeItem('userSession');
    this.sessionSubject.next(null); // Limpia el estado del observable
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const session = this.getSession();
    return session !== null;
  }

  getSessionObservable() {
    return this.sessionSubject.asObservable(); // Retorna el observable para suscribirse
  }
}
