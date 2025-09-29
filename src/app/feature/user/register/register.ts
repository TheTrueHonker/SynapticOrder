import {Component, inject, signal} from '@angular/core';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {FirebaseService} from '../../../shared/services/firebase.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {validateEmail} from '../../../shared/helper/credentialsValidator';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './../../../shared/styles/auth.scss'
})
export class Register {
  firebaseService = inject(FirebaseService);
  displayName = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  emailError = signal<string>('');
  passwordError = signal<string>('');
  submitError = signal<string>('');
  isRegisterMode = signal<boolean>(false);

  constructor(private router: Router) {
  }

  submit() {
    if (this.emailError() === '' && this.passwordError() === '')
      this.firebaseService.createUser(this.email(), this.displayName(), this.password())
        .then(() => this.router.navigate(['/']))
        .catch((reason: string) => this.submitError.set(reason))
  }

  validateEmail(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.emailError.set(validateEmail(value));
  }

  validatePassword(event: Event) {
    this.passwordError.set('')
    const value = (event.target as HTMLInputElement).value;

    if (!this.isRegisterMode())
      return;

    if (value === '')
      return;

    if (value.length < 6)
      this.passwordError.set('Password must be at least 6 characters long');
  }
}
