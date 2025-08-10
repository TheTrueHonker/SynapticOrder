import {Component, computed, inject, signal} from '@angular/core';
import {InitTrackerCard} from '../init-tracker-card/init-tracker-card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CharacterService} from '../../../shared/services/character.service';

@Component({
  selector: 'app-init-tracker-list',
  imports: [
    InitTrackerCard,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './init-tracker-list.html',
  styleUrl: './init-tracker-list.scss'
})
export class InitTrackerList {
  characterService = inject(CharacterService);
  setupModeButtonText = signal('Switch to Play Mode');
  isCardReadOnly = signal(false);
  isSetupMode = signal(true);

  charactersSortedByInitiative = computed(() => {
    return this.characterService.allCharacters()
      .filter(char => char.initiative > 0)
      .sort((a, b) => b.initiative - a.initiative);
  })

  addCharacter() {
    this.characterService.addBlankCharacter();
  }

  switchSetupMode() {
    this.isSetupMode.update(oldValue => !oldValue);
    if (this.isSetupMode()) {
      this.setupModeButtonText.set('Switch to Play Mode');
      this.isCardReadOnly.set(false);
    } else {
      this.setupModeButtonText.set('Switch to Setup Mode');
      this.isCardReadOnly.set(true);
    }
  }

  takeNextTurn() {
    const topCharacter = this.charactersSortedByInitiative()[0];
    this.characterService.takeTurn(topCharacter.id);

    if (this.charactersSortedByInitiative().length === 0) {
      this.switchSetupMode();
    }
  }
}
