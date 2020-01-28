import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';

import { UploadService } from 'src/app/services/upload/upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @ViewChild('file', { static: true }) file;
  @Output() uploaded = new EventEmitter<any>();

  fileToUpload: File = null;

  progress;
  primaryButtonText = 'Upload';
  cancelButtonText = 'Cancel';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(private uploadService: UploadService) {
    this.uploadService.uploadComplete$.subscribe(completed => {
      this.uploaded.emit(completed);
    });
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded(files: FileList) {
    this.fileToUpload = files.item(0);
    this.progress = this.uploadService.upload(files.item(0));

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress) {
      if (key) {
        allProgressObservables.push(this.progress[key].progress);
      }
    }

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
