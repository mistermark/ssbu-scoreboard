import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  message = 'Are you sure you want to delete?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data) {
      this.message = data.message || this.message;
    }
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
