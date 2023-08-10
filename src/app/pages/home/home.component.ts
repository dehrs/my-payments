import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { Dialog } from '@angular/cdk/dialog';
import { NewPayment } from 'src/app/core/models/new-payment';
import { ModalAddComponent } from 'src/app/shared/components/modal-add/modal-add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name!: string;
  isChecked = true;
  //payment: NewPayment = { username: '', title: '', date: new Date(), value: 0 };
  payments: NewPayment[] = [];

  constructor(
    private loginService: LoginService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    if (this.loginService.loggedUser.login) {
      this.name = this.loginService.loggedUser.login;
    }
  }

  openAddRegisterPayment(): void {
    const dialogRef = this.dialog.open<NewPayment>(ModalAddComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.closed.subscribe(result => {
      if (result) this.payments.push(result);
    });
  }

  openEditRegisterPayment(payment: NewPayment): void {
    const paymentData = { ...payment };
    const dialogRef = this.dialog.open<NewPayment>(ModalAddComponent, {
      width: '450px',
      disableClose: true,
      data: paymentData,
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        const idx = this.payments.findIndex(pay => pay.id == result.id);
        if (idx !== -1) {
          this.payments[idx] = result;
        }
      }
    });
  }

  onDelete(payment: NewPayment): void {
    const paymentAux = [...this.payments];
    this.payments = paymentAux.filter(pay => pay.id !== payment.id);
  }
}
