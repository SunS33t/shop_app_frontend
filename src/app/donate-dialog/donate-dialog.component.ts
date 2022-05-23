import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  number: number;
  password: number;
  amount: number;
}

@Component({
  selector: 'app-donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.css']
})
export class DonateDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DonateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

}
