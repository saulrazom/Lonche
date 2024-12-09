import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitButtonComponent } from '../../components/global/submit-button/submit-button.component';
import { DefaultInputComponent } from '@components/global/default-input/default-input.component';

@NgModule({
  imports: [CommonModule, SubmitButtonComponent, DefaultInputComponent],
  exports: [SubmitButtonComponent, DefaultInputComponent],
})
export class GlobalComponentsModule {}
