import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { TeacherComponent } from './teacher.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [TeacherComponent]
})
export class TeacherModule {}