import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {Router } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  imports: [MatIcon],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialog {
  constructor(
      private dialogRef: MatDialogRef<DeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string },
      private router: Router
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  redirect() {
      this.dialogRef.close();
      this.router.navigate(['/login']);
  }
}