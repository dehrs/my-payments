import { PaymentService } from './../../core/services/payments.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { Dialog } from '@angular/cdk/dialog';
import { NewPayment } from 'src/app/core/models/new-payment';
import { ModalRegisterPaymentComponent } from 'src/app/shared/components/modal-register-payment/modal-register-payment.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name!: string;
  isChecked = true;
  payments: NewPayment[] = [];
  pageSlice: NewPayment[] = [];
  searchFilter = '';
  pageSize = 3;

  constructor(
    private loginService: LoginService,
    private dialog: Dialog,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    if (this.loginService.loggedUser.login) {
      this.name = this.loginService.loggedUser.login;
      this.paymentService.getPayments().subscribe(data => {
        (this.payments = data), (this.pageSlice = data.slice(0, 3));
      });
    }
  }

  applyFilter(text: string) {
    console.log(text);
    this.pageSlice = this.payments
      .filter(it => {
        return it.username
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase());
      })
      .slice(0, 3);
    this.pageSize = this.pageSlice.length;
  }

  openAddRegisterPayment(): void {
    const dialogRef = this.dialog.open<NewPayment>(
      ModalRegisterPaymentComponent,
      {
        width: '450px',
        disableClose: true,
      }
    );

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.payments.push(result);
        this.pageSlice = this.payments.slice(0, 3);
      }
    });
  }

  openEditRegisterPayment(payment: NewPayment): void {
    const paymentData = { ...payment };
    const dialogRef = this.dialog.open<NewPayment>(
      ModalRegisterPaymentComponent,
      {
        width: '450px',
        disableClose: true,
        data: paymentData,
      }
    );

    dialogRef.closed.subscribe(result => {
      if (result) {
        const idx = this.payments.findIndex(pay => pay.id == result.id);
        if (idx !== -1) {
          this.payments[idx] = result;
          this.pageSlice = this.payments.slice(0, 3);
        }
      }
    });
  }

  onDelete(payment: NewPayment): void {
    const paymentAux = [...this.payments];
    this.payments = paymentAux.filter(pay => pay.id !== payment.id);
    this.pageSlice = this.payments.slice(0, 3);
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.payments.length) {
      endIndex = this.payments.length;
    }
    this.pageSlice = this.payments.slice(startIndex, endIndex);
  }
}
