import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewPayment } from '../models/new-payment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  getPayments() {
    return this.httpClient.get<NewPayment[]>('assets/payments.json');
  }
}
