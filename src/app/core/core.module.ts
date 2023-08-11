import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { PaymentService } from './services/payments.service';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  providers: [LoginService, PaymentService],
})
export class CoreModule {}
