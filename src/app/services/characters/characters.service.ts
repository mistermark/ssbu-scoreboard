import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Character } from 'src/app/types';

import * as characterList from '../../../assets/data/characters.json';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly characterListSubject = new BehaviorSubject<Character[]>([]);
  characterList$ = this.characterListSubject.asObservable();

  constructor() {}

  get(): void {
    this.characterListSubject.next(characterList);
  }

  getCharacter(character: string) {
    return this.characterListSubject.value.find(
      element => element.name === character
    );
  }
}
