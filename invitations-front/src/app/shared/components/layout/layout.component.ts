import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserSessionService} from '../../services/user-session.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public user: any;
  private userSessionService = inject(UserSessionService);
  public isSidebarHidden = false;
  private router = inject(Router);

  ngOnInit(): void {
    this.userSessionService.getSessionObservable().subscribe((session) => {
      this.user = session;
    });
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  logout(): void {
    this.userSessionService.clearSession();
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
