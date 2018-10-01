import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { StudentComponent } from './student.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [StudentComponent]
})
export class StudentModule {}