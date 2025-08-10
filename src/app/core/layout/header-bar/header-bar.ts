import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-header-bar',
  imports: [
    NgOptimizedImage,
    MatToolbar,
    MatToolbarRow
  ],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.scss'
})
export class HeaderBar {

}
