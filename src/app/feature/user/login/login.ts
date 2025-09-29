import {Component, inject, signal} from '@angular/core';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {validateEmail} from '../../../shared/helper/credentialsValidator';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatHint,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './../../../shared/styles/auth.scss'
})
export class Login {
  constructor(private router: Router) {
  }

  firebaseService = inject(FirebaseService);

  email = signal<string>('');
  password = signal<string>('');
  emailError = signal<string>('');
  submitError = signal<string>('');

  submit() {
    if (this.emailError() === '')
      this.firebaseService.signInUser(this.email(), this.password())
        .then(() => this.router.navigate(['/']))
        .catch((reason: string) => this.submitError.set(reason))
  }

  validateEmail(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.emailError.set(validateEmail(value));
  }
}
