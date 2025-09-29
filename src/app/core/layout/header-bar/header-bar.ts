import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {FirebaseService} from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-header-bar',
  imports: [
    NgOptimizedImage,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink
  ],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss'
})
export class HeaderBar {
  firebaseService = inject(FirebaseService);

  logout() {
    this.firebaseService.signOut();
  }
}
