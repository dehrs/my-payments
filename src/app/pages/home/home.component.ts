import { PaymentService } from './../../core/services/payments.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { Dialog } from '@angular/cdk/dialog';
import { NewPayment } from 'src/app/core/models/new-payment';
import { ModalRegisterPaymentComponent } from 'src/app/shared/components/modal-register-payment/modal-register-payment.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name!: string;
  isChecked = true;
  payments: NewPayment[] = [];
  paymentsFiltered: NewPayment[] = [];
  searchFilter = '';
  pageSize = 3;
  pageLength = 0;
  durationInSeconds = 5;
  paymentsCurrent: NewPayment[] = [];

  constructor(
    private loginService: LoginService,
    private dialog: Dialog,
    private paymentService: PaymentService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.loggedUser.login) {
      this.name = this.loginService.loggedUser.login;
      this.paymentService.getPayments().subscribe(data => {
        (this.payments = data), (this.paymentsFiltered = data.slice(0, 3));
        this.pageLength = this.payments.length;
        this.onPaymentCurrent(this.paymentsFiltered);
      });
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  onPaymentCurrent(payments: NewPayment[]) {
    this.paymentsCurrent = payments;
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
        this.payments.unshift(result);
        this.paymentsFiltered = this.payments.slice(0, 3);
      }
    });
  }

  onFindPayment(payment: NewPayment): number {
    return this.payments.findIndex(pay => pay.id === payment.id);
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
        const idx = this.onFindPayment(paymentData);
        if (idx !== -1) {
          this.payments[idx] = result;
          this.paymentsFiltered = this.payments.slice(0, 3);
          this.openSnackBar('Atualizado com sucesso');
        }
      }
    });
  }

  onDelete(payment: NewPayment): void {
    const paymentAux = [...this.payments];
    this.payments = paymentAux.filter(pay => pay.id !== payment.id);
    if (this.searchFilter !== '') {
      this.paymentsFiltered = this.paymentsCurrent.filter(
        teste => teste.id !== payment.id
      );
      this.openSnackBar('Excluído com sucesso');
      this.pageLength = this.paymentsFiltered.length;
      this.pageSize = this.paymentsFiltered.length;
    } else {
      this.paymentsFiltered = this.payments.slice(0, 3);
      this.openSnackBar('Excluído com sucesso');
    }
  }

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.payments.length) {
      endIndex = this.payments.length;
    }
    this.paymentsFiltered = this.payments.slice(startIndex, endIndex);
  }

  applyFilter(text: string) {
    const filtered = this.payments.filter(it => {
      return it.username.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    });
    this.paymentsFiltered = this.payments
      .filter(it => {
        return it.username
          .toLocaleLowerCase()
          .includes(text.toLocaleLowerCase());
      })
      .slice(0, 3);
    this.pageSize = this.paymentsFiltered.length;
    this.pageLength = filtered.length;
    this.onPaymentCurrent(this.paymentsFiltered);
  }

  onChangePaid(payment: NewPayment, paid: boolean) {
    const idx = this.onFindPayment(payment);
    if (idx !== -1) {
      this.payments[idx].isPaid = paid;
      this.paymentsFiltered = this.payments.slice(0, 3);
      this.openSnackBar('Atualizado com sucesso');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      verticalPosition: 'top',
      duration: 3 * 1000,
    });
  }

  filterEarliestDate() {
    const date = this.payments.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    this.paymentsFiltered = date.slice(0, 3);
  }

  filterMostRecent() {
    const date = this.payments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.paymentsFiltered = date.slice(0, 3);
  }
}
