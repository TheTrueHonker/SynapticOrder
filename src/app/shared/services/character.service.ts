import {Injectable, signal} from '@angular/core';
import {CharacterData} from '../../core/type/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters = signal<CharacterData[]>([]);

  allCharacters = this.characters.asReadonly();

  addCharacter(name: string, initiative: number) {
    this.characters.update(chars => {
      const character = {id: this.characters().length + 1, name, initiative};
      chars.push(character);
      return chars;
    })
  }

  addBlankCharacter() {
    this.addCharacter('', 0);
  }

  updateCharacter(id: number, name: string, initiative: number) {
    this.characters.update(chars => {
      return chars.map(char => {
        if (char.id === id) {
          char.name = name;
          char.initiative = initiative;
        }
        return char;
      });
    })
  }

  takeTurn(id: number) {
    const character = this.characters().filter(char => char.id === id)[0];
    const newInitiative = character.initiative - 10 < 0 ? 0 : character.initiative - 10;
    this.updateCharacter(id, character.name, newInitiative);
  }

  deleteCharacter(id: number) {
    this.characters.update(chars => {
      return chars.filter(char => char.id !== id);
    });
  }
}
