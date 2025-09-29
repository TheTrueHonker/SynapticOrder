import {computed, Injectable, signal} from '@angular/core';
import {initializeApp, FirebaseError} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential
} from "firebase/auth";
import {firebaseOptions} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseOptions);
  private analytics = getAnalytics(this.app);
  private auth = getAuth(this.app);
  readonly currentUser = signal<User | null>(null);
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  createUser(userEmail: string, displayName: string, password: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, userEmail, password)
      .then((value: UserCredential) => {
        this.updateProfile(value.user, displayName);
        this.sendEmailVerification(value.user);
        this.signOut();
        return Promise.resolve('Please verify your e-mail');
      })
      .catch((err: FirebaseError) => {
        return Promise.reject(this.formatError(err.code));
      })
  }

  signInUser(userEmail: string, password: string): Promise<string> {
    return signInWithEmailAndPassword(this.auth, userEmail, password)
      .then((value: UserCredential) => {
        if (!value.user.emailVerified) {
          this.signOut();
          return Promise.reject('E-Mail not verified');
        }
        this.currentUser.set(value.user);
        return Promise.resolve(`User signed in successfully`);
      })
      .catch((reason: FirebaseError) => {
        return Promise.reject(this.formatError(reason.code));
      })
  }

  signOut(): Promise<string> {
    return signOut(this.auth)
      .then(() => {
        this.currentUser.set(null);
        return Promise.resolve('User signed out successfully');
      })
      .catch((err: FirebaseError) => Promise.reject(`Failed to sign out user: ${err.code}`));
  }

  updateProfile(user: User, displayName: string): Promise<string> {
    return updateProfile(user, {displayName: displayName})
      .then(() => Promise.resolve('User updated successfully'))
      .catch((err: FirebaseError) => Promise.reject(`Failed to update user: ${err.code}`))
  }

  sendEmailVerification(user: User) {
    sendEmailVerification(user)
      .then(() => Promise.resolve('E-Mail verification sent'))
      .catch((err: FirebaseError) => Promise.reject(`Failed to send E-Mail verification: ${err.code}`));
  }

  private formatError(code: string): string{
    switch(code){
      case 'auth/invalid-credential':
        return 'Invalid credentials'
      case 'auth/email-already-in-use':
        return 'E-Mail already in use'
      case 'auth/weak-password':
        return 'Password must be at least 8 characters long'
      case 'auth/too-many-requests':
        return 'Too many attempts! Try again later'
    }
    return `Unknown Error: ${code}`
  }
}
