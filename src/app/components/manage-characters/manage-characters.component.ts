import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map, filter, switchMap, takeWhile, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { CharactersService } from 'src/app/services/characters/characters.service';
import { Character } from 'src/app/types';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage-characters',
  templateUrl: './manage-characters.component.html',
  styleUrls: ['./manage-characters.component.scss']
})
export class ManageCharactersComponent {
  @ViewChild('characterName', { static: true }) characterNameRef: ElementRef;
  @ViewChild('characterImage', { static: true }) characterImageRef: ElementRef;

  maxRosterSize = 78;

  charactersList$ = this.charactersService.charactersList$;
  selectedCharacterSubject = new BehaviorSubject<Character | undefined>(
    undefined
  );
  selectedCharacter$ = this.selectedCharacterSubject.asObservable();

  createCharacterForm: FormGroup;
  updateCharacterForm: FormGroup;
  createCharacterBulkForm: FormGroup;

  constructor(
    private charactersService: CharactersService,
    private formBuilder: FormBuilder
  ) {
    this.createCharacterForm = this.formBuilder.group({
      name: new FormControl(''),
      image: new FormControl(''),
      roster: new FormControl('')
    });
    this.updateCharacterForm = this.formBuilder.group({
      _id: new FormControl(''),
      name: new FormControl(''),
      image: new FormControl(''),
      roster: new FormControl('')
    });
    this.createCharacterBulkForm = this.formBuilder.group({
      multipleCharacters: new FormControl('')
    });
  }

  create(): void {
    this.charactersService.create(this.createCharacterForm.value);
    this.createCharacterForm.reset();
    this.characterNameRef.nativeElement.focus();
  }

  selectCharacter(character: Character): void {
    if (this.selectedCharacterSubject.value === character) {
      this.selectedCharacterSubject.next(undefined);
      this.updateCharacterForm.reset();
      return;
    }
    this.selectedCharacterSubject.next(character);
    this.updateCharacterForm.patchValue(character);
  }

  update(): void {
    this.charactersService.update(this.updateCharacterForm.value);
  }

  delete(character: Character): void {
    this.charactersService.delete(character);
    this.updateCharacterForm.reset();
  }

  createBulk(): void {
    this.charactersService.createBulk(
      this.createCharacterBulkForm.value.multipleCharacters
    );
  }
}
