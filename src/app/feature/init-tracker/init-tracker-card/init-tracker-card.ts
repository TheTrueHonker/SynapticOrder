import {Component, inject, input, signal} from '@angular/core';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CharacterData} from '../../../core/type/Character';
import {CharacterService} from '../../../shared/services/character.service';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-init-tracker-card',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatIconButton,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatHint,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './init-tracker-card.html',
  styleUrl: './init-tracker-card.scss'
})
export class InitTrackerCard {
  characterService = inject(CharacterService);


  characterData = input.required<CharacterData>();
  showDeleteButton = input<boolean>(true);
  isReadOnly = input<boolean>(false);
  initiativeError = signal<string>('');

  updateCharacterName(event: Event) {
    const newName = (event.target as HTMLInputElement).value;
    this.characterService.updateCharacter(this.characterData().id, newName, this.characterData().initiative);
  }

  updateInitiative(event: Event) {
    this.initiativeError.set('');

    const newInitiativeString = (event.target as HTMLInputElement).value;
    const newInitiativeValue = Number(newInitiativeString);

    if (Number.isNaN(newInitiativeValue)) {
      this.initiativeError.set('Must be a whole number!')
      return;
    }

    if (newInitiativeValue < 0) {
      this.initiativeError.set('Cannot be lower than 0!');
      return;
    }

    this.characterService.updateCharacter(this.characterData().id, this.characterData().name, newInitiativeValue);
  }

  deleteCharacter() {
    this.characterService.deleteCharacter(this.characterData().id)
  }
}
