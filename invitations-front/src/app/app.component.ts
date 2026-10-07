import {AfterViewInit, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxLoadingModule} from '@dchtools/ngx-loading-v18';
import {getLoadingState} from './shared/interceptors/loading.interceptor';
import {AsyncPipe} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxLoadingModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  title = 'Invitations';
  public isLoading: Observable<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.isLoading = getLoadingState();
  }
}
