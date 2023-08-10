import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './app-material/app-material.module';
import { ModalAddComponent } from './components/modal-add/modal-add.component';

@NgModule({
  declarations: [ModalAddComponent],
  imports: [CommonModule, FormsModule, RouterModule, AppMaterialModule],
})
export class SharedModule {}
