import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './app-material/app-material.module';
import { ModalRegisterPaymentComponent } from './components/modal-register-payment/modal-register-payment.component';

@NgModule({
  declarations: [ModalRegisterPaymentComponent],
  imports: [CommonModule, FormsModule, RouterModule, AppMaterialModule],
})
export class SharedModule {}
