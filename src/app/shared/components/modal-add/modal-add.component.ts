import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { NewPayment } from 'src/app/core/models/new-payment';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  @ViewChild('formPayment') formPayment!: NgForm;
  registerPayment: NewPayment = {
    id: '',
    username: '',
    title: '',
    date: undefined,
    valuePayment: undefined,
  };

  constructor(
    private dialogRef: DialogRef<NewPayment>,
    @Inject(DIALOG_DATA) private data: NewPayment
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.registerPayment = this.data;
    }
  }

  onClose() {
    if (!this.registerPayment.id) {
      this.registerPayment.id = uuidv4();
    }
    this.data = {
      ...this.registerPayment,
    };
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
