import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { StagesService } from 'src/app/services/stages/stages.service';
import { Stage } from 'src/app/types';

@Component({
  selector: 'app-manage-stages',
  templateUrl: './manage-stages.component.html',
  styleUrls: ['./manage-stages.component.scss']
})
export class ManageStagesComponent {
  @ViewChild('stageName', { static: true }) stageNameRef: ElementRef;

  stagesList$ = this.stagesService.stagesList$;

  selectedStageSubject = new BehaviorSubject<Stage | undefined>(undefined);
  selectedStage$ = this.selectedStageSubject.asObservable();

  createStageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private stagesService: StagesService
  ) {
    this.createStageForm = this.formBuilder.group({
      name: new FormControl(''),
      image: new FormControl(''),
      type: new FormControl(''),
      roster: new FormControl('')
    });
  }

  create(): void {
    console.log(this.createStageForm.value);
    this.stagesService.create(this.createStageForm.value);
    this.createStageForm.reset();
    this.stageNameRef.nativeElement.focus();
  }

  selectStage(character: Stage): void {
    if (this.selectedStageSubject.value === character) {
      this.selectedStageSubject.next(undefined);
      // this.updateStageForm.reset();
      return;
    }
    this.selectedStageSubject.next(character);
    // this.updateStageForm.patchValue(character);
  }

  delete(stage: Stage): void {
    this.stagesService.delete(stage);
    // this.updateStageForm.reset();
  }
}
