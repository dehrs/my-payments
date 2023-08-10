import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatIconModule, MatButtonModule, MatTooltipModule, DialogModule],
})
export class AppMaterialModule {}
